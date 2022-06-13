const contenedor = document.getElementById("productos");
const tablaCarrito = document.getElementById("tablaCarrito");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const subtotal = document.getElementById("subtotal");
let Productos = [];


// ----- TRAER PRODUCTOS Y ARMAR CARTAS
const traerProductos = async () => {
  let response = await fetch("productos.json")
  let data = await response.json();
  Productos = data;
  cargarProductos(Productos, contenedor, false);
  
}
const construirCarta = (item) => {
  return (
    `
        <div class="">
        <div class="card producto${item.id}">
        <img src="${item.imagen}" alt="${item.nombre}" class="card-img-top">
        <div class="card-body">
          <h3 class="card-text">${item.nombre}</h3>
          <p class="card-text">Descripcion.....</p>
          <p class="card-text">Stock: ${item.stock}</p>
          <p class="card-text">Precio: $${item.precio}</p>
          <button onclick=avisoCarrito(${item.id}) class="btn btn-primary productos__precio">Agregar al carrito</button>
        </div>
      </div>
      </div>`
  );
}

const cargarProductos = (info, nodo, tabla) => {
  let acumulador = "";
  info.forEach((elem) => {
    acumulador += tabla ? crearTabla(elem) : construirCarta(elem);
  })
  nodo.innerHTML = acumulador;
}
// AGREGAR PRODUCTOS AL CARRITO

const avisoCarrito = (id) => {
  const elegido = Productos.find(item => item.id === id);
  const sumador = carrito.findIndex(elem => elem.id === id);
  if (sumador === -1) {
    carrito.push({
      id: elegido.id,
      nombre: elegido.nombre,
      precio: elegido.precio,
      cantidad: 1,
      imagen: elegido.imagen,
    }), Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto agregado!',
      showConfirmButton: false,
      timer: 700
    })
  } else {
    carrito[sumador].cantidad = carrito[sumador].cantidad + 1;
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto agregado!',
      showConfirmButton: false,
      timer: 700
    });
  }
  cargarProductos(carrito, tablaCarrito, true);
}
const getCarrito = (item) => {

  let acum = "";
  item.forEach((el) =>
    acum +=
    `
      <tr>
      <th scope="row">${el.id}</th>
      <td>${el.nombre}</td>
      <td>${el.cantidad}</td>
      <td>$${el.precio}</td>
      <td>$${el.precio *el.cantidad}</td>
      <td><img src="${el.imagen}" class="imagenCarrito"></td>
      </tr>
      `
  )
  console.log(acum);
  tablaCarrito.innerHTML = acum;
  carritoStorage();
  calcularTotal();
}
// CALCULAR PRECIO TOTAL EN EL CARRITO

function calcularTotal() {
  let precioTotal = 0;
  carrito.forEach((item) => {
    precioTotal += item.precio * item.cantidad;
  });
  subtotal.innerHTML = `Subtotal: $${precioTotal}`
}

// VACIAR CARRITO

const vaciarCarrito = () => {
  localStorage.clear();
  carrito = [];

}

let btnVaciar = document.getElementById('btnVaciar');
btnVaciar.addEventListener("click", () => {
  Swal.fire({
    title: '¿Estas seguro?',
    text: "No podras revertir esto.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, vaciar.'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Carrito vaciado!',
        'Todos los productos han sido eliminados.',
        'success'
      )
      vaciarCarrito();
    }
  })
});


function actualizarCarrito() {
  calcularTotal();
}

function carritoStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

let btnCarrito = document.getElementById('btnVerCarrito');
btnCarrito.addEventListener("click", () => getCarrito(carrito));

let botonPagar = document.getElementById('botonPagar');
botonPagar.addEventListener('click', () =>{
  if(carrito.length>0){
//   Swal.fire(
//     'Muchas gracias!',
//     'Su pago se ha realizado con exito.',
//     'success'
// )
// vaciarCarrito()
    pagar();
}else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Parece que tu carrito esta vacio.'
  })
}}
);

const pagar = async () => {

  const productosToMap = carrito.map(Element => {
      let nuevoElemento = 
      {
          title: Element.nombre,
          description: Element.descripcionn,
          picture_url: Element.img,
          category_id: Element.id,
          quantity: Element.cantidad,
          currency_id: "ARS",
          unit_price: Element.precio
      }
      return nuevoElemento
  })
  let response = await fetch("https://api.mercadopago.com/checkout/preferences", {

      method: "POST",
      headers: {
          Authorization: "Bearer TEST-5075273876105105-061215-77efb2ad36435a95ab02bc9370080d4e-280315213"
      },
      body: JSON.stringify({
          items: productosToMap
      })
  })
  let data = await response.json()
  console.log(data)
  window.open(data.init_point, "_blank")
}

traerProductos();
actualizarCarrito();