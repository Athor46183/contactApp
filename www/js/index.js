document.addEventListener("deviceready",loadContacts,false);
//loadContacts permet de charger la base de donnée des contact de l'appareil
 function loadContacts(){
    
    let options =new ContactFindOptions();
    options.filter = "";
    options.multiple = true;
    options.hasPhoneNumber = true;
    let fields =["*"];

    navigator.contacts.find(fields,showContacts, onError,options);
    

}

//showContacts permet de lister les contacts
function showContacts(contacts){
    let contactsHTML = '';
    let name;
    let id;
    let num=[];
    for (let i = 0; i < contacts.length; i++) {
        name = contacts[i].displayName;
        id = contacts[i].id;
            //console.log(contacts[i]);
           for (let k = 0; k < contacts[i].phoneNumbers.length;k++){
            num[k] = contacts[i].phoneNumbers[k].value; }
        contactsHTML +=`
        <li>
            <a href=#showpage onclick="showContact('${name}','${num}','${id}')">
                
                <h2>${contacts[i].name.formatted}</h2>`;
               for (let j = 0; j < contacts[i].phoneNumbers.length;j++){
                contactsHTML += `<p>${contacts[i].phoneNumbers[j].value}</p>`;
               }
                
            contactsHTML+='</a>';
           contactsHTML+=
           `<a href=# onclick="suppContact(${id})" data-role="button" data-icon="minus" data-iconpos="notext"></a>
           
        <li/>`
        ;
    }
    contactsList.innerHTML = contactsHTML;
    $(contactsList).listview('refresh');
}
//showContact recupere et afficher le nom , id et la numero  d'un contact
function showContact(name,num,id){
    //loadContacts();
    let detail =` <li>
    <a href=#editpage onclick="editContact(${id})" data-role="button" data-icon="edit" >editer</a>
        <p>id :${id}</p>
        <p>name :${name} </p>
        <p>numéros :${num}</p>
    </li>`;
        detailContact.innerHTML=detail;
        
        
}
// suppContact permet de supprimer un contacter que l'on recupere grace à son id que en utilisant navigator.contact.find 
function suppContact(id){

    function onSuccess(contacts) {
        alert('Found ' + contacts.length + ' contacts.');
        let contact = contacts[0];
        contact.remove(contactRemoveSuccess, contactRemoveError);

        function contactRemoveSuccess(contact) {
           alert("Contact Deleted");
           loadContacts();
        }
    
        function contactRemoveError(message) {
           alert('Failed because: ' + message);
        }
        $(contactsList).listview('refresh');
    };
    
    function onError(contactError) {
        alert('onError!');
    };
    
    // find all contacts with 'id' in any name field
    var options      = new ContactFindOptions();
    options.filter   = id;
    options.hasPhoneNumber = true;
    var fields       = ["id"];
    navigator.contacts.find(fields, onSuccess, onError, options);

   
}
//createCotact permet de creer un nouveau contact qui aura comme champs un nom afficher , un nom et un numero de tel en plus de son id
function createContact(){
    function onSuccess(contact) {
        alert("Save Success"+pNumber.value);
        loadContacts();
        $(contactsList).listview('refresh');

    };
    
    function onError(contactError) {
        alert("Error = " + contactError);
    };
    
    // create a new contact object
    let contact = navigator.contacts.create();
    contact.displayName = dName.value;
    contact.nickname = Name.value;  
    let phoneNumber=[];
    phoneNumber[0]=pNumber.value;   phoneNumber[0] = new ContactField('mobile', pNumber.value, true);
    contact.phoneNumbers =  phoneNumber;     
    
    // save to device
    contact.save(onSuccess,onError);
}
//editContact permet d'editer modifier le nouveau et le numero d'un contact existant
function editContact(id){

    function Success(contact) {
       
        function onSuccess(contact) {
            alert("Save Success"+contact[0]);
            loadContacts();
            $(contactsList).listview('refresh');
    
        };
        
        function onError(contactError) {
            alert("Error = " + contactError);
        };
        
        // create a new contact object
        cont = navigator.contacts.create();
        cont.displayName = eName.value;  
        let phoneNumber=[];
        phoneNumber[0]=eNumber.value;   phoneNumber[0] = new ContactField('mobile', eNumber.value, true);
        cont.phoneNumbers =  phoneNumber;     
        
        // save to device
        cont.save(onSuccess,onError);
        
    };
    
    function onErro(contactError) {
        alert('onError!');
    };
    
    // find all contacts with 'id' in any name field
    var options      = new ContactFindOptions();
    options.filter   = id;
    options.hasPhoneNumber = true;
    var fields       = ["id"];
    navigator.contacts.find(fields, Success, onErro, options);

   
}

function onError(error){
    console.log(error);
}