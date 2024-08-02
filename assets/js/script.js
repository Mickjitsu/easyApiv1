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
    const contInputsBtn = document.getElementById('contacts-add-inputs-btn')
    const inputBoxesContainer = document.getElementById('input-boxes-container');
    let inputGroupCount = 1;
    const identifierType = document.getElementById('identifier-group')
    const identifierInput = document.getElementById('identifier_enter')
    const messageDiv = document.getElementById('plain-text')
    const messageInput = document.getElementById('message_enter')
    const locale = document.getElementById('locale');
    const localeInput = document.getElementById('locale_enter');
    const contactDiv = document.getElementById('contact-div');
    const contactInput = document.getElementById('contact-enter');
    const webhookDiv = document.getElementById('webhook-div');
    const webhookInput = document.getElementById('webhook-enter');
    const webhookAtrDiv = document.getElementById('webhook-atr-div');
    const webhookSignInput = document.getElementById('webhook-signing-enter');
    const webhookEventInput = document.getElementById('webhook-event-enter');
    const webhookServiceInput = document.getElementById('webhook-service-enter');
    const webhookFilterKey = document.getElementById('webhook-event-filter-key');
    const webhookFilterValue = document.getElementById('webhook-event-filter-value');
    const webhookUrl = document.getElementById('webhook-url-enter');
    const contactIdentDiv = document.getElementById('contact-attr-div');
    const contactIdentKey = document.getElementById('contact-key-enter');
    const contactIdentValue = document.getElementById('contact-value-enter');
    const dynamicContAttDiv = document.getElementById('contact-input-boxes-container');
    const contactAttKeyInput= document.getElementById('contact-input-name');
    const contAttValInput = document.getElementById('contact-input-value');
    const waMediaDiv = document.getElementById("media-div");
    const waMediaInput = document.getElementById('media_enter');
    const mediaType = document.getElementById('media-type');

    apiSelect.addEventListener('change', function () {
        console.log('API Selection updated to:', this.value);
        requestSelector(this.value);
    });

    function requestSelector(selectedApi) {
        if (selectedApi === 'channels') {
            identifierType.classList.remove('hidden');
            requestSelect.innerHTML = `
            <option value="" disabled selected>Choose Channels API request</option>
            <option value="WA_plain_text">Send WA plain text message</option>
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
            <option value="" disabled selected>Choose Contact API Request</option>
            <option value="list_contacts">List contacts</option>
            <option value="create_contact">Create Contact</option>
            <option value="get_contact">Get contact</option>
            <option value="delete_contact">Delete Contact</option>
            <option value="update_contact">Create or Update contact by identifier</option>`;
        } else if (selectedApi === 'webhooks') {
            requestSelect.innerHTML = `
            <option value="" disabled selected>Choose webhook subscription request</option>
            <option value="create_webhook">Create Subscription</option>
            <option value="list_webhooks">List webhook events</option>
            <option value="delete_webhook">Delete Subscription</option>
            <option value="get_webhook">Get webhook Subscription</option>
            <option value="update_webhook">Update webhook Subscription</option>`;
        } else {
            requestSelect.innerHTML = `
            <option value="" disabled selected>Functionality coming soon</option>`;
        }
    }

    requestSelect.addEventListener('change', function () {
        const chosenRequest = this.value;
        let input_value = ''
        let input_name = ''
        if (chosenRequest === 'WA_template_variable' || chosenRequest === 'SMS_template') {
            dynamicInputsContainer.classList.remove('hidden');
            dynamicProjectsContainer.classList.remove('hidden');
            locale.classList.remove('hidden')
            document.getElementById("extra-selections").innerText = 'Variables';
            document.getElementById("input-group-1").innerHTML = `
            <input type="text" class="form-control" placeholder="Variable name" id="input-name">
            <input type="text" class="form-control" placeholder="Variable value" id="input-value">`;
            input_name = 'Variable Name';
            input_value = 'Variable Value';
        }
        else if(chosenRequest === 'WA_plain_text' || chosenRequest === 'SMS'){
            messageDiv.classList.remove('hidden')
        } 
        else if(chosenRequest === 'WA_plain_template' && chosenRequest != 'Wa_plain_text'){
            dynamicProjectsContainer.classList.remove('hidden');
            locale.classList.remove('hidden');
        }
        else if(chosenRequest === "get_contact" || chosenRequest === "delete_contact"){
            contactDiv.classList.remove('hidden');
            contactIdentDiv.classList.add('hidden');
        }
        else if(chosenRequest === "create_contact"){
            let attribute_key = '';
            let attribute_value = '';
            contactIdentDiv.classList.remove('hidden');
            document.getElementById("contact-extra-selections").innerText = 'Attributes';
            document.getElementById("input-group-1-contacts").innerHTML = `
            <input type="text" class="form-control" placeholder="Attribute key" id="attribute-name">
            <input type="text" class="form-control" placeholder="Attribute value" id="attribute-value">`;
            input_name = 'Attribute Key';
            input_value = 'Attribute Value';
        
        }
        else if(chosenRequest === 'WA_template_media'){
            waMediaDiv.classList.remove('hidden');
            dynamicProjectsContainer.classList.remove('hidden');
            locale.classList.remove('hidden');
        }
        else if(chosenRequest === "update_contact"){
            contactIdentDiv.classList.remove('hidden');
            contactDiv.classList.remove('hidden');
            let attribute_key = '';
            let attribute_value = '';
            contactIdentDiv.classList.remove('hidden');
            document.getElementById("extra-selections").innerText = 'Attributes';
            document.getElementById("input-group-1").innerHTML = `
            <input type="text" class="form-control" placeholder="Attribute key" id="attribute-name">
            <input type="text" class="form-control" placeholder="Attribute value" id="attribute-value">`;
            attribute_key = 'Attribute Key';
            attribute_value = 'Attribute Value';
            input_name = attribute_key;
            input_value = attribute_value;
        }
        else if(chosenRequest === "get_webhook" || chosenRequest === "delete_webhook"){
            webhookDiv.classList.remove('hidden')
            webhookAtrDiv.classList.add('hidden')
        }
        else if(chosenRequest === "update_webhook" || chosenRequest === "create_webhook"){
            webhookDiv.classList.remove('hidden')
            webhookAtrDiv.classList.remove('hidden')
        }
        else {
            dynamicInputsContainer.classList.add('hidden');
            dynamicProjectsContainer.classList.add('hidden');
            contactDiv.classList.add('hidden');
            webhookDiv.classList.add('hidden');
            webhookAtrDiv.classList.add('hidden')
        }
    });

    // Correctly attach event listeners to buttons for adding input groups
    addInputsBtn.addEventListener('click', function() {
        addNewButton('Variable Name', 'Variable Value');
    });

    contInputsBtn.addEventListener('click', function() {
        addNewButton('Attribute Key', 'Attribute Value', true);
    });

    function addNewButton(input_name, input_value, isContact = false) {
        inputGroupCount++;
        const newInputGroup = document.createElement('div');
        newInputGroup.className = 'input-group mb-2';

        if (isContact) {
            newInputGroup.id = `input-group-${inputGroupCount}-contacts`;
        } else {
            newInputGroup.id = `input-group-${inputGroupCount}`;
        }

        const input1 = document.createElement('input');
        input1.type = 'text';
        input1.className = 'form-control';
        input1.placeholder = input_name;

        const input2 = document.createElement('input');
        input2.type = 'text';
        input2.className = 'form-control';
        input2.placeholder = input_value;

        newInputGroup.appendChild(input1);
        newInputGroup.appendChild(input2);

        if (isContact) {
            dynamicContAttDiv.appendChild(newInputGroup);
        } else {
            inputBoxesContainer.appendChild(newInputGroup);
        }
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
        const contactId = contactInput.value.trim();
        const contactIdentifierKey = contactIdentKey.value.trim();
        const contactIdentifierValue = contactIdentValue.value.trim();
        const waMediaUrl = waMediaInput.value.trim();
        const mediaTypeSelection = mediaType.value.trim()

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

        const dynamicContacts = document.querySelectorAll('#contact-input-boxes-container .input-group');
        const contactAttValues = [];
        dynamicContacts.forEach(group => {
            const contactInputs = group.querySelectorAll('input');
            if (contactInputs.length >= 2){
            const attValues = {
                attributeKey: contactInputs[0].value.trim(),
                attributeValue: contactInputs[1].value.trim()
            }
            contactAttValues.push(attValues)
        }
        })
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
            contactId,
            contactIdentifierKey,
            contactIdentifierValue,
            waMediaInput,
            mediaTypeSelection,
            inputs: inputValues,
            projects: projectValues,
            contacts: contactAttValues
        };
        return formDetails;
    };
    document.getElementById('submit').addEventListener('click', postForm);
    async function postForm(event) {
        event.preventDefault();
        const formDetails = record_values();
        let requestBody = {}
    
        console.log('Form Details:', formDetails);
    
        if (formDetails.apiType === 'channels' && (formDetails.requestType === 'WA_plain_text' || formDetails.requestType === 'SMS')) {
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
        }
        /*----------------------------------------------*/
        else if (
            formDetails.apiType === 'channels' &&
            formDetails.requestType === 'WA_plain_template'
        ) {
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
                                    "locale": `${formDetails.localeValue}`
                                }}
                            )});
    
                        if (!response.ok) {
                            /*throw new Error('Network response was not ok');*/
                            console.log(formDetails.workspaceId, formDetails.channelId, requestBody)
                            
                        }
    
                        const data = await response.json();
                        console.log('Success:', data);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        /*-----------------------------------------------*/
        else if (
            formDetails.apiType === 'channels' &&
            formDetails.requestType === 'WA_template_variable'
        ) { 

            if (formDetails.projects.length > 0) {
                formDetails.inputs.forEach(input => {
                    if (input.input1 && input.input2) {
                        requestBody[input.input1] = input.input2;
                    }
                });
                console.log('Dynamic Request Body:', requestBody)
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
                                    "parameters": Object.entries(requestBody).map(([key, value]) => ({
                                    "type": "string",
                                    "key": key,
                                    "value": value
                                }))
                                }
                            })
                        });
    
                        if (!response.ok) {
                            /*throw new Error('Network response was not ok');*/
                            console.log(formDetails.workspaceId, formDetails.channelId, requestBody)
                            
                        }
    
                        const data = await response.json();
                        console.log('Success:', data);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
            /*---------------------------------------------*/
            else if (
                formDetails.apiType === 'channels' &&
                formDetails.requestType === 'WA_template_media'
            ) {
                if (formDetails.projects.length > 0) {
                    formDetails.inputs.forEach(input => {
                        if (input.input1 && input.input2) {
                            requestBody[input.input1] = input.input2;
                        }
                    });
                    console.log('Dynamic Request Body:', requestBody)
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
                                        "parameters": Object.entries(requestBody).map(([key, value]) => ({
                                        "type": `${formDetails.mediaTypeSelection}`,
                                        "key": key,
                                        "value": value
                                    }))
                                    }
                                })
                            });
                            /*PICK UP HERE*/
        
                            if (!response.ok) {
                                /*throw new Error('Network response was not ok');*/
                                console.log(formDetails.workspaceId, formDetails.channelId, requestBody)
                                
                            }
        
                            const data = await response.json();
                            console.log('Success:', data);
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }
                };
            /*---------------------------------------------*/
            }
            else if(formDetails.requestType === "create_contact") {
                formDetails.contacts.forEach(contact => {
                    if (contact.attributeKey && contact.attributeValue){
                        requestBody[contact.attributeKey] = contact.attributeValue;
                    }
                });
                const identifiers = [
                    {
                        "key": formDetails.contactIdentifierKey,
                        "value": formDetails.contactIdentifierValue
                    }
                ];
                requestBody.identifiers = identifiers;

                try{
                    const response = await fetch(`https://api.bird.com/workspaces/${formDetails.workspaceId}/contacts`,{
                        method: 'POST',
                        headers:{
                            'Authorization': `Bearer ${formDetails.apiKey}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                };
                const data = await response.json();
                console.log('Success:', data);
            } catch (error) {
                console.error('Error:', error);
            }
        } else{
            console.log('Unsuccessful')
        }
    }
}})
