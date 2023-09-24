// Productos
let productos = []


fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


//Cosas que llamo del DOM
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal")
let botonesAgregar = document.querySelectorAll(".producto-agregar")
const numerito = document.querySelector("#numerito")

//Funcion para cargar todos los productos de mi array en la pagina
function cargarProductos(productosElegidos) {

    //vacio el contenedor de productos para evitar que se dupliquen
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(productos => {

        //creo el html para los productos
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${productos.imagen}" alt="${productos.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${productos.titulo}</h3>
                <p class="producto-precio">$${productos.precio}</p>
                <button class="producto-agregar" id="${productos.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);


//Mostrar solo la categoria de productos elegida
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        //quito y agrego la clase active para que se vea bien el css
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");


        if (e.currentTarget.id != "todos") {

            //cambio el titulo principal y filtro los productos segun la categoria elegida
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);

        }
        else {

            tituloPrincipal.innerText = "Todos los Productos";
            cargarProductos(productos);

        }
    })
});


//Actualizamos los botones de "agregar" y que estos ejecuten la funcion de agregar al carrito
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}



let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}
else {
    productosEnCarrito = [];
}



//Creo la funcion que agrega los productos al carrito
function agregarAlCarrito(e) {


    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    //si el producto ya esta en el carrito, sumamos la cantidad
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }
    //si no esta lo agregamos
    else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

};



//Funcion para actualizar el numero de productos en el carrito
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}