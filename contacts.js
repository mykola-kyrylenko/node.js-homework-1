const fs = require("fs/promises");
const path = require("path");
const {v4} = require("uuid");


const contactsPath = path.join(__dirname, "./db/contacts.json");


const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
};

const getContactById = async (id) => {
    const contacts = await listContacts();
    const result = contacts.find(contact => Number(contact.id) === id);
    if (!result) {
        return null;
    };
    return result;

};

const updateContacts = async (contacts) => {
     await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const removeContact = async (id) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => Number(contact.id) === id);
    if (idx === -1) {
        return null;
    };
    const newContacts = contacts.filter((_, index) => index !== idx);
    await updateContacts(newContacts);
    return contacts[idx];
};

const addContact = async ( name, email, phone ) => {
    const contacts = await listContacts();
    const newContact = { id: v4(), name, email, phone};
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
};


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,

};

