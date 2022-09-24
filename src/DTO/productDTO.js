function productDTO (prod, id){

    if(!id){
        return prod
    }else{
        let prod = {
            ...prod,
            id: id
        }
        return prod
    }
}

module.exports = productDTO;