const chatService  = require ("../services/chatService")

//recupera las chats generadas
const getChats = async (req,res) => {
    try {
        let chats = await chatService.getChats();
        chats
            ? res.status(200).json(chats)
            : res.status(404).json({"error": "cbats/s not found/s"})
        
    }
    catch (err) {
        res.status(400).json({
            msj:"failed to get orders",
            error: err.message
        })
    }

}

const getChatByEmail = async (req,res) => {
    try {
        let chats = await chatService.getChatByEmail(req.params.email);
        chats
            ? res.status(200).json(chats)
            : res.status(404).json({"error": "cbats/s not found/s"})
        
    }
    catch (err) {
        res.status(400).json({
            msj:"failed to get orders",
            error: err.message
        })
    }

}

module.exports = {getChats, getChatByEmail}