

// boton menu

let botonMenu = document.querySelector('.icon-button');
let containerListMenu = document.querySelector('.container-list-menu');
let bgOpacity = document.querySelector('.bg-opacity-menu')

botonMenu.addEventListener('click', e => {
    botonMenu.firstElementChild.classList.toggle('none');
    botonMenu.lastElementChild.classList.toggle('none');

    containerListMenu.classList.toggle('show');
    bgOpacity.classList.toggle('show');
})


bgOpacity.addEventListener('click', e => {
    console.log(e.target)
    if(e.target.matches(".container-list-menu")) return console.log(e.target.matches(".container-list-menu"));
    botonMenu.firstElementChild.classList.remove('none');
    botonMenu.lastElementChild.classList.add('none');

    containerListMenu.classList.remove('show');
    bgOpacity.classList.remove('show');
})


// boton carrito

let buttonCart = document.querySelector('.button-cart');
let windowsOrder = document.querySelector('.order-cart');
let bgOpacityCart = document.querySelector('.bg-opacity-cart')

buttonCart.addEventListener('click', e => {
    windowsOrder.classList.toggle('show');
    bgOpacityCart.classList.toggle('show');
})



// Productos 

// base de datos de los productos

const product = [
    {
        id: 1,
        title: 'B. Adidas',
        image: 'assets/img/producto-1.webp',
        price: 12,
        stock: 10,
        uni: 1
    },
    {
        id: 2,
        title: 'C. Liverpool 1',
        image: 'assets/img/liverpool-1.jpg',
        price: 24,
        stock: 10,
        uni: 1
    },
    {
        id: 3,
        title: 'C. Junior 1',
        image: 'assets/img/junior-1.webp',
        price: 36,
        stock: 10,
        uni: 1
    },
    {
        id: 4,
        title: 'B. Nike 2',
        image: 'assets/img/balon2.webp',
        price: 48,
        stock: 10,
        uni: 1
    },
    {
        id: 5,
        title: 'B. Nike 1',
        image: 'assets/img/balon-1.webp',
        price: 48,
        stock: 10,
        uni: 1
    },
    {
        id: 6,
        title: 'C. Atletico M.',
        image: 'assets/img/atletico-1.jpg',
        price: 48,
        stock: 10,
        uni: 1
    }

]
 

// renderizar los productos en la página
const db = {
    items: product,
    methods: {
        find: function (id){
            return db.items.find( i => {
                return (i.id === id);
            })
        },

        render: function (){
            let html = '';
            html += db.items.map( i => {
                return `<article class="card-product" ">
                <div class="container-image-product">
                        <img src=${i.image} alt="producto">
                    </div>
        
                    <div class="container-info-cart">
        
                        <h4>${i.title}</h4>
            
                        <div class="container-option-cart">
                            <p><b>Precio: $</b>${i.price}</p>
                            
                            <div class="container-button-cart">
                                <button ">
                                    <img src="assets/icons/add-cart.png" class="button-add-cart" data-id="${i.id}" width="15px"    height="15px" alt="add-cart">
                                </button>
                                <button class="like">
                                    <img src="assets/icons/heart.png" width="15px" height="15px" alt="like">
                                    <img src="assets/icons/heart-red.png" width="15px" height="15px" alt="like" class="none">
                                </button>
                            </div>
                        </div>
                    </div>
                </article>`
            }).join('');
            return html;
        }
    }
}


const cart = {
    items: [], //los productos que se van a ir agregando 
    methods: {

        add: function (id) {    
            if (this.already(id)) {
                // alert ('El producto ya se encuentra en carrito')
                let producto = cart.items.find( obj => {return obj.id === id});
                producto.uni++
            }else{
                cart.items.push(db.methods.find(id));
            }
        },
        
        already: function (id){
            return (cart.items.find( e => {
                return e.id === id
            }))
        },
        
        remove: function (id){
            cart.items.forEach( obj => {
                if( obj.id === id){
                    if (obj.uni ===1 ){
                        cart.items = cart.items.filter(f => {return f.id !== id});
                    }else{
                        obj.uni = obj.uni - 1;
                    }
                }
            })
        },
        
        render: function (){
            let html = "";
            html += '<aside>';
            
            html += cart.items.map( e => {
                return  `  <div  class= "container-info-cart-buy">
                <div class="container-image-cart-buy">
                    <img src= ${e.image}  alt="foto-producto">
                </div>
                <b>${e.title}</b>
                <b> ${e.price}</b>
                <button class="btn-add" data-id=${e.id}> + </button>
                <p>${e.uni}</p>
                <button class="btn-remove" data-id=${e.id}> - </button>
            </div> `
            }).join('');
            
            html += '</aside>'
            
            return html;
        },

        length: function(){
            return cart.items.length;
        },

        renderLength: function(){
            
            return ` <p class="number-product-select"> ${cart.methods.length()} </p>`
        }



    }
}

function controlImageCart(){
   
}

const selectProductCart = document.querySelector('.select-product-cart');
const containerProducts = document.querySelector('.container-products');
const containerEvent = document.getElementById('container-products');

const imageCartBuy = document.querySelector('.image-cart-buy-container');


containerProducts.innerHTML = db.methods.render();
const numberProduct = document.querySelector('.container-ingreso');

containerEvent.addEventListener('click', e => {
    if (e.target.matches('.button-add-cart')){    
        const id = e.target.dataset.id;
        cart.methods.add(+id);
    }

    if(cart.items.length !== 0){
        imageCartBuy.firstElementChild.classList.add('none')
        imageCartBuy.lastElementChild.classList.remove('none');
    } else{
        imageCartBuy.firstElementChild.classList.remove('none')
        imageCartBuy.lastElementChild.classList.add('none');
    }

    // selectProductCart.innerHTML = cart.methods.render();
    selectProductCart.innerHTML = cart.methods.render();

    if(cart.methods.length()){
        numberProduct.innerHTML = cart.methods.renderLength();
    }else{
        numberProduct.innerHTML = ""
    }
})

const selectProduct = document.getElementById('select-product');


selectProduct.addEventListener('click', e => {
    if( e.target.matches('.btn-remove')){
        let id = e.target.dataset.id;
        cart.methods.remove(+id);
    }

    if(e.target.matches('.btn-add')){
        let id = e.target.dataset.id;
        cart.methods.add(+id);
    }
    if(cart.items.length !== 0){
        imageCartBuy.firstElementChild.classList.add('none')
        imageCartBuy.lastElementChild.classList.remove('none');
    } else{
        imageCartBuy.firstElementChild.classList.remove('none')
        imageCartBuy.lastElementChild.classList.add('none');
    }

    selectProductCart.innerHTML = cart.methods.render();
    if(cart.methods.length()){
        numberProduct.innerHTML = cart.methods.renderLength();
    }else{
        numberProduct.innerHTML = ""
    }

})

const like = document.querySelector('.like')

like.addEventListener('click', e => {
    like.firstElementChild.classList.toggle('none');
    like.lastElementChild.classList.toggle('none');
})

bgOpacityCart.addEventListener('click', e => {
    if(e.target.matches(".order-cart div")  || e.target.matches(".container-info-cart-buy") ||
                        e.target.matches(".btn-add") || e.target.matches(".btn-remove")){
        return console.log("sí");
    }
    else{
        console.log(e.target)
    
        windowsOrder.classList.remove('show');
        bgOpacityCart.classList.remove('show');
    }
})


const containerTrasition = document.querySelector('.transition-card');

let i = true;
setInterval(() => {
    containerTrasition.firstElementChild.classList.toggle('none');
    containerTrasition.lastElementChild.classList.toggle('none');

}, 2000);

