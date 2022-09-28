function chatDTO (chat, id){

    if(!id){
        return chat
    }else{
        let chat = {
            ...chat,
            id: id
        }
        return chat
    }
}

module.exports = chatDTO;