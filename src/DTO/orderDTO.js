function orderDTO (order, id){

    if(!id){
        return order
    }else{
        let order = {
            ...order,
            id: id
        }
        return cart
    }
}

module.exports = orderDTO;