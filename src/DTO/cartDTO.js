function cartDTO (cart, id){

    if(!id){
        return cart
    }else{
        let cart = {
            ...cart,
            id: id
        }
        return cart
    }
}

module.exports = cartDTO;