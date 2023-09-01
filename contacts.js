const fs = require("fs/promises");
const path = require("path");
const nanoid = require('nanoid');
const contactsPath = path.join(__dirname, '/db/contacts.json');

async function listContacts() {
    try{
        const list =await fs.readFile(contactsPath, 'utf8');
        return list
    }catch(e){
        console.log(e.message);
    }
    
  }
  
  async function getContactById(contactId) {
    const item = JSON.parse(await listContacts()).find(({id})=>id===contactId)
    return item || null;
    
  }
  
  async function removeContact(contactId) {
    const newList = JSON.parse(await listContacts()).filter(({id})=>id !== contactId);
    const removeItem =await getContactById(contactId);
    fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
    return removeItem;
  }
  
  async function addContact(name, email, phone) {
    const list = JSON.parse(await listContacts());
    const newItem = {id: nanoid.nanoid(), name, email, phone};
    const newList = [...list, newItem];
    fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
    return newItem;
    }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}