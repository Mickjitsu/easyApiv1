document.addEventListener('DOMContentLoaded', function () {
    const apiSelect = document.getElementById('api');
    const requestSelect = document.getElementById('request');
    const api_key_input = document.getElementById('api_key_enter');
    const workspace_id_input = document.getElementById('workspace_enter');
    const channel_id_input = document.getElementById('channel_enter');
    const organization_id_input = document.getElementById('organization_enter');
    const dynamicInputsContainer = document.getElementById('dynamic-inputs-container');
    const dynamicProjectsContainer = document.getElementById('dynamic-projects-container');
    const addInputsBtn = document.getElementById('add-inputs-btn');
    const inputBoxesContainer = document.getElementById('input-boxes-container');
    let inputGroupCount = 1;
    const identifierType = document.getElementById('identifier-group')
    const identifierInput = document.getElementById('identifier_enter')
    const messageDiv = document.getElementById('plain-text')
    const messageInput = document.getElementById('message_enter')
    const locale = document.getElementById('locale');
    const localeInput = document.getElementById('locale_enter');

    apiSelect.addEventListener('change', function () {
        console.log('API Selection updated to:', this.value);
        requestSelector(this.value);
    });

    function requestSelector(selectedApi) {
        if (selectedApi === 'channels') {
            identifierType.classList.remove('hidden');
            requestSelect.innerHTML = `
            <option value="WA_plain_text">Send WA plain text template</option>
            <option value="WA_plain_template">Send WA plain template to channel</option>
            <option value="WA_with_buttons">Send WA message with buttons</option>
            <option value="WA_template_variable">Send WA plain template with variable</option>
            <option value="WA_template_media">Send WA message with image</option>
            <option value="WA_location">Send WA Location</option>
            <option value="SMS">Send SMS</option>
            <option value="SMS_image">Send SMS image</option>
            <option value="SMS_image_text">Send SMS with image and text</option>
            <option value="SMS_file">Send SMS with file</option>
            <option value="SMS_template">Send SMS template</option>`;
        } else if (selectedApi === 'contacts') {
            requestSelect.innerHTML = `
            <option value="list_contacts">List contacts</option>
            <option value="create_contact">Create Contact</option>
            <option value="get_contact">Get contact</option>
            <option value="delete_contact">Delete Contact</option>
            <option value="update_contact">Create or Update contact by identifier</option>`;
        } else if (selectedApi === 'webhooks') {
            requestSelect.innerHTML = `
            <option value="create_webhook">Create Subscription</option>
            <option value="list_webhooks">List webhook events</option>
            <option value="delete_webhook">Delete Subscription</option>`;
        } else {
            requestSelect.innerHTML = `
            <option value="" disabled selected>Functionality coming soon</option>`;
        }
    }

    requestSelect.addEventListener('change', function () {
        const chosenRequest = this.value;
        if (chosenRequest === 'WA_template_variable' || chosenRequest === 'SMS_template') {
            let input_name = '';
            let input_value = '';
            dynamicInputsContainer.classList.remove('hidden');
            dynamicProjectsContainer.classList.remove('hidden');
            locale.classList.remove('hidden')
            document.getElementById("extra-selections").innerText = 'Variables';
            document.getElementById("input-group-1").innerHTML = `
            <input type="text" class="form-control" placeholder="Variable name" id="input-name">
            <input type="text" class="form-control" placeholder="Variable value" id="input-value">`;
            input_name = 'Variable Name';
            input_value = 'Variable Value';
            inputButtonAddition(input_name, input_value);
        }
        else if(chosenRequest === 'WA_plain_text' || chosenRequest === 'SMS'){
            messageDiv.classList.remove('hidden')
        } 
        else {
            dynamicInputsContainer.classList.add('hidden');
            dynamicProjectsContainer.classList.add('hidden');
        }
    });

    function inputButtonAddition(input_name, input_value) {
        addInputsBtn.addEventListener('click', function () {
            inputGroupCount++;

            const newInputGroup = document.createElement('div');
            newInputGroup.className = 'input-group mb-2';
            newInputGroup.id = `input-group-${inputGroupCount}`;

            const input1 = document.createElement('input');
            input1.type = 'text';
            input1.className = 'form-control';
            input1.placeholder = `${input_name}`;
            const input2 = document.createElement('input');
            input2.type = 'text';
            input2.className = 'form-control';
            input2.placeholder = `${input_value}`;

            newInputGroup.appendChild(input1);
            newInputGroup.appendChild(input2);

            inputBoxesContainer.appendChild(newInputGroup);
        });
    }

    function record_values() {
        const apiKey = api_key_input.value.trim();
        const workspaceId = workspace_id_input.value.trim();
        const channelId = channel_id_input.value.trim();
        const organizationId = organization_id_input.value.trim();
        const identifierValue = identifierInput.value.trim();
        const apiType = apiSelect.value.trim();
        const requestType = requestSelect.value.trim();
        const messageContents = messageInput.value.trim();
        const localeValue = localeInput.value.trim();

        const dynamicInputs = document.querySelectorAll('#input-boxes-container .input-group');
        const inputValues = [];

        dynamicInputs.forEach(group => {
            const inputs = group.querySelectorAll('input');
            const values = {
                input1: inputs[0].value.trim(),
                input2: inputs[1].value.trim()
            };
            inputValues.push(values);
        });

        const dynamicProjects = document.querySelectorAll('#project-boxes-container .project-group');
        const projectValues = [];

        dynamicProjects.forEach(project => {
            const projectInputs = project.querySelectorAll('input');
            if (projectInputs.length >= 2) {
                const projectValue = {
                    projectID: projectInputs[0].value.trim(),
                    versionID: projectInputs[1].value.trim()
                };
                projectValues.push(projectValue);
            }
        });

        const formDetails = {
            apiKey,
            workspaceId,
            channelId,
            organizationId,
            identifierValue,
            apiType,
            requestType,
            messageContents,
            localeValue,
            inputs: inputValues,
            projects: projectValues,
        };
        return formDetails;
    };

    async function postForm() {
        const formDetails = record_values();
    
        console.log('Form Details:', formDetails);
    
        if (formDetails.apiType === 'channels' && formDetails.requestType != 'WA_template_variable' && formDetails.requestType != 'SMS_template') {
            try {
                const response = await fetch(`https://api.bird.com/workspaces/${formDetails.workspaceId}/channels/${formDetails.channelId}/messages`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${formDetails.apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "receiver": {
                            "contacts": [
                                {
                                    "identifierValue": `${formDetails.identifierValue}`
                                }
                            ]
                        },
                        "body": {
                            "type": "text",
                            "text": {
                                "text": `${formDetails.messageContents}`
                            }
                        }
                    })
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                console.log('Success:', data);
            } catch (error) {
                console.error('Error:', error);
            }
        } else if (
            formDetails.apiType === 'channels' &&
            (formDetails.requestType === 'WA_template_variable' || formDetails.requestType === 'SMS_template')
        ) {
            if (formDetails.projects.length > 0) {
                try {
                    for (const project of formDetails.projects) {
                        const response = await fetch(`https://api.bird.com/workspaces/${formDetails.workspaceId}/channels/${formDetails.channelId}/messages`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${formDetails.apiKey}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "receiver": {
                                    "contacts": [
                                        {
                                            "identifierValue": `${formDetails.identifierValue}`
                                        }
                                    ]
                                },
                                "template": {
                                    "projectId": `${project.projectID}`, 
                                    "version": `${project.versionID}`,   
                                    "locale": `${formDetails.localeValue}`,
                                    "parameters": [
                                        {
                                            "type": "string",
                                            "key": `${formDetails.inputs[0].input1}`, 
                                            "value": `${formDetails.inputs[0].input2}` 
                                        }
                                    ]
                                }
                            })
                        });
    
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                            
                        }
    
                        const data = await response.json();
                        console.log('Success:', data);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                console.log('No project values provided.');
            }
        } else {
            console.log('Awaiting API updates');
        }
    }
    
    document.getElementById('submit').addEventListener('click', postForm);
})