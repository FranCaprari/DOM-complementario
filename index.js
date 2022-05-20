const contenedor = document.getElementById("productos");
const tablaCarrito = document.getElementById("tablaCarrito");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const subtotal = document.getElementById("subtotal");


const construirCarta = (item) => {
    return(
        `
        <div class="col-12 mb-2 col-md-4">
        <div class="card" style="width: 15rem;">
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
const crearTabla = (item) => {
  return( `
      <tr>
      <th scope="row" >${item.id}</th>
      <td>${item.nombre}</td>
      <td>${item.precio}</td>
      <td>${item.cantidad}</td>
      <td><img src="${item.imagen}" class="imagenCarrito"></td>
      <td><button onclick="eliminarCarrito(${item.id})">Eliminar</button></td>
      </tr>
  `)
}

const cargarProductos = (info, nodo, tabla) =>{
    let acumulador = "";
    info.forEach((elem) =>{
        acumulador += tabla ? crearTabla(elem) : construirCarta(elem);
    })
    nodo.innerHTML = acumulador; 
  }

const avisoCarrito = (id)=>{
    const elegido = Productos.find(item=>item.id === id);
    const sumador = carrito.findIndex(elem => elem.id === id);
    if(sumador === -1){
    carrito.push({
      id: elegido.id,
      nombre: elegido.nombre,
      precio: elegido.precio,
      cantidad: 1,
      imagen: elegido.imagen,
    })
  }else{
    carrito[sumador].cantidad = carrito[sumador].cantidad +1;
  }
    cargarProductos(carrito, tablaCarrito, true);  
}
const getCarrito = (item) => {
  
  let acum = "";
  item.forEach((el)=>
  acum +=
      `
      <tr>
      <th scope="row">${el.id}</th>
      <td>${el.nombre}</td>
      <td>${el.cantidad}</td>
      <td>$${el.precio}</td>
      <td>$${el.precio *el.cantidad}</td>
      </tr>
      `
  )
  console.log(acum);
  tablaCarrito.innerHTML = acum;
  carritoStorage();
  calcularTotal();
}   
function calcularTotal(){
  let precioTotal = 0;
  carrito.forEach((item) => {
   precioTotal += item.precio * item.cantidad; 
  });
  subtotal.innerHTML = `Subtotal: $${precioTotal}`
}

const vaciarCarrito = () => {
  localStorage.clear();
  carrito = [];
 
}

let btnVaciar = document.getElementById('btnVaciar');
btnVaciar.addEventListener("click", () => vaciarCarrito());


function actualizarCarrito(){
calcularTotal();
}
function carritoStorage(){
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

let btnCarrito = document.getElementById('btnVerCarrito');
btnCarrito.addEventListener("click", () => getCarrito(carrito));



cargarProductos(Productos, contenedor, false);
actualizarCarrito();
