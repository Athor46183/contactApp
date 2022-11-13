document.addEventListener("deviceready",loadContacts,false);
function loadContacts(){
    console.log(navigator.contacts);
    let options =new ContactFindOptions();
    options.filter = "";
    options.multiple = true;

    let fields =["*"];

    navigator.contacts.find(fields,showContacts, onError,options);

}


function showContacts(contacts){
    let contactsHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        contactsHTML +=`
        <li>
            <a href="#showpage" onclick="showContact(${contacts[i].displayName})">
                
                <h2>${contacts[i].name.formatted}</h2>
               
                
            </a>
            <a href=# onclick="suppContact(${contacts[i]})" data-role="button" data-icon="minus"> supprimer</a>
        <li/>
        `;
    }
    contactsList.innerHTML = contactsHTML;
    $(contactsList).listview('refresh');
}

function showContact(contacts){
    
        show +="<li>"+contacts+"<li/>";
        detailContact.innerHTML = show;

}

function suppContact(contact){
    contact.remove(contactRemoveSuccess, contactRemoveError);

    function contactRemoveSuccess(contact) {
       alert("Contact Deleted");
    }

    function contactRemoveError(message) {
       alert('Failed because: ' + message);
    }
    $(contactsList).listview('refresh');
}

function createContact(){
    function onSuccess(contact) {
        alert("Save Success");
    };
    
    function onError(contactError) {
        alert("Error = " + contactError.code);
    };
    
    // create a new contact object
    var contact = navigator.contacts.create();
    contact.displayName = dName.value;
    contact.nickname = Name.value;            
    
    // save to device
    contact.save(onSuccess,onError);
}

function onError(error){
    console.log(error);
}