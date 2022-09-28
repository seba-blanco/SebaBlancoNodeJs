const socket = io.connect();

function preventDef(){
    return false;
}

socket.on('welcome', data => {
    renderProductos(data.products);
    renderChat(data.chat);

});

socket.emit('showData');

function renderProductos(data) {
    
    const html = data.map((elem, index) => {
        return(`<tr>
            <td>${elem.name}</td>
            <td>${elem.description}</td>
            <td>${elem.price}</td>
            <td>${elem.price}</td>
            <td><img width=100px height=100px src='${elem.photo}'></img></td>
            <td><input type="submit" id=${elem.id} value="addToCart" onclick="addToCart(this.id)"></td>
        </tr>`)
    }).join(" ");
    document.getElementById('tableProd').getElementsByTagName('tbody')[0].innerHTML = html;
    
    
}
function finalizarCarrito(id) {
    alert(id);
  }


function addToCart(id){
    const Data = {
        id: id
    }
    fetch('/api/carrito/productos/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(Data)
    })
        .then(res => alert('producto agregado') )
        .catch(err => console.log(res) )
    
  }

 
function renderChat(data) {
    if (data.length> 0) { 
    const html = data.map((elem, index) => {
        return(`<div>
            <strong style='color:blue;'>${elem.email}</strong>:
            <span style='color:black;'>[${elem.tipo}]</span>
            <span style='color:brown;'>[${elem.datetime}]</span>
            <i style='color:green;'>${elem.message}</i>
        </div>`)
    }).join(" ");

   document.getElementById('lstMsgs').innerHTML = html;
    }
}

function addProduct(e) {
    
    const data = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        stock: document.getElementById('stock').value,
        photo: document.getElementById('photo').value
    };
    
    socket.emit('newProduct',data);
    
    return false;
}

function addChatMessage(e) {
   
    const chatMsg = {
            email: document.getElementById('email').value,
            tipo: document.getElementById('tipo').value,
            message: document.getElementById('message').value
        
    };
   
    socket.emit('newMessage', chatMsg);
   
    return false;
}


socket.on('products', data => {
   
    renderProductos(data);
});

socket.on('chatMessages', data => {
    renderChat(data.chat);
});

