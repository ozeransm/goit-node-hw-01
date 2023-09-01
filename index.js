const toolForDB = require('./contacts');
const {Command} = require('commander');
const prog = new Command;

function invokeAction(options){
    const { action, id, name, email, phone } = options;
    console.log(action);
    switch (action){
        case 'list':
            (async ()=>console.log(await toolForDB.listContacts()))();
            break;
        case 'get':
            (async ()=>console.log(await toolForDB.getContactById(id)))();
            break;
        case 'remove':
            (async ()=>console.log(await toolForDB.removeContact(id)))();
            break;
        case 'add':
            (async ()=>console.log(await toolForDB.addContact(name, email, phone)))();
            break;
        default: break;
    }
}
prog
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <id>, get contact by id number;')
    .option('-n, --name <name>, add contacts name to DB;')
    .option('-e, --email <email>, add contacts email to DB')
    .option('-p, --phone <phone>, add contacts phone to DB');
        
  prog.parse(process.argv);
  const options = prog.opts() ;

invokeAction(options);