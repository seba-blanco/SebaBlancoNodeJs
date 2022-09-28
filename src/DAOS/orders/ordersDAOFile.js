const {FileContainer} = require ('../../containers/FileContainer');

class OrdersDAOFile extends FileContainer {
    constructor() {
        super('./src/data/orders.json');
        
    }

    getById =async (id) => {
        
        let datos = await this.readFile().then (order=> {return order});

        return datos.filter(x=> x.id == id)[0];
    }
}

module.exports = {OrdersDAOFile} 