const contactsOperation = require("./contacts.js");



const invokeAction = async({ action, id, name, email, phone }) =>{
  switch (action) {
      case 'list':
          const contacts = await contactsOperation.listContacts();
          console.log(contacts);
          break;

      case 'get':
          const contact = await contactsOperation.getContactById(id);
          if (!contact) {
              throw new Error(`Contact with id=${id} not found`);
          };
          console.log(contact);
          break;

      case 'add':
          const newContact = await contactsOperation.addContact(name, email, phone);
          console.log(newContact);
          break;

    case 'remove':
      const removeContact = await contactsOperation.removeContact(id);
            console.log(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

const yargs = require("yargs");
const {hideBin} = require("yargs/helpers");
const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);

