const {FileContainer} = require ('../../containers/FileContainer');

class ChatsDAOFile extends FileContainer {
    constructor() {
        super('./src/data/chat.json');
        
    }

   
}

module.exports = {ChatsDAOFile} 