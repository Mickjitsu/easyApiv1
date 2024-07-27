const apiUrls = {
    "channels": [
        { WA_plain_text: "https://api.example.com/channels/get", text: "Send Plain text WA message to channel" },
        { WA_plain_template: "https://api.example.com/channels/create", text: "Send plain text WA template to channel" },
        { WA_with_buttons: "https://api.example.com/channels/delete", text: "Send plain WA message with buttons" },
        { WA_template_variable: "https://api.example.com/channels/delete", text: "Send WA image with variable" },
        { WA_template_media: "https://api.example.com/channels/delete", text: "Send WA media templateo channel" },
        { SMS_image_text: "https://api.example.com/channels/delete", text: "Send SMS message with image and text" },
        { SMS_file: "https://api.example.com/channels/delete", text: "Send SMS message with a file" },
        { SMS_template: "https://api.example.com/channels/delete", text: "Send an SMS message with a template" }
    ],
    "contacts": [
        { list_contacts: "https://api.example.com/contacts/get", text: "List contacts" },
        { create_contact: "https://api.example.com/contacts/add", text: "Create contact" },
        { get_contact: "https://api.example.com/contacts/add", text: "Get Contact" },
        { delete_contact: "https://api.example.com/contacts/add", text: "Delete contact" },
        { update_contact: "https://api.example.com/contacts/remove", text: "Create or update contact" }
    ],
    "webhooks": [
        { create_webhook: "https://api.example.com/numbers/list", text: "Create a webhook" },
        { list_webhooks: "https://api.example.com/numbers/allocate", text: "List webhook events" },
        { delete_webhook: "https://api.example.com/numbers/release", text: "Delete a webhook subscription" }
    ]
};

const apiSelect = document.getElementById('api');
const requestSelect = document.getElementById('request');
const api_key_input = document.getElementById('api_key_enter');
const workspace_id_input = document.getElementById("workspace_enter");
const channel_id_input = document.getElementById("channel_enter");
const organization_id_input = document.getElementById("organization_enter");
const dynamicInputsContainer = document.getElementById('dynamic-inputs-container');
const addInputsBtn = document.getElementById('add-inputs-btn');
const inputBoxesContainer = document.getElementById('input-boxes-container');
let inputGroupCount = 1;

apiSelect.addEventListener('change', function(){
    const selectedApi = this.value;
    requestSelector(selectedApi)
});

function requestSelector(selectedApi){
    if (selectedApi === 'channels'){
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
        <option value="SMS_template">Send SMS template</option>`

    } else if (selectedApi === 'contacts'){
        requestSelect.innerHTML = `
        <option value="list_contacts">List contacts</option>
        <option value="create_contact">Create Contact</option>
        <option value="get_contact">Get contact</option>
        <option value="delete_contact">Delete Contact</option>
        <option value="update_contact">Create or Update contact by identifier</option>`
    } else if(selectedApi === 'webhooks'){
        requestSelect.innerHTML = `
        <option value="create_webhook">Create Subscription</option>
        <option value="list_webhooks">List webhook events</option>
        <option value="delete_webhook">Delete Subscription</option>`
    }else{
        requestSelect.innerHTML = `
        <option value="" disabled selected>Functionality coming soon</option>`
    }
}

requestSelect.addEventListener('change', function(){
    const chosenRequest = this.value;

    if (chosenRequest === 'WA_template_variable'){
        dynamicInputsContainer.classList.remove('hidden');
        document.getElementById("extra-selections").innerText = 'Variables'
        document.getElementById("input-group-1").innerHTML = `
        <input type="text" class="form-control" placeholder="Variable name" id="input-name">
        <input type="text" class="form-control" placeholder="Variable value" id="input-value">`
    } else {
        dynamicInputsContainer.classList.add('hidden');
    }
})

function testFunction(){
    
}