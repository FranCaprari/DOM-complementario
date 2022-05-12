const contenedor = document.getElementById("productos");
const Productos = [
    { id: 1,
      nombre: "Creatina 150g",  
      precio: 3500,
      imagen: "images/creatina150g.png",
    },
    { id: 2,
        nombre: "Whey protein NITRO",  
        precio: 5500,
        imagen: "images/wheynitrov.png",
      },
      { id: 3,
        nombre: "Whey protein",  
        precio: 4500,
        imagen: "images/whey2lbv.png",
      },
      { id: 4,
        nombre: "Multivitaminico",  
        precio: 2500,
        imagen: "images/vitaminas.png",
      },
      { id: 5,
        nombre: "Whey protein Avena",  
        precio: 4500,
        imagen: "images/wheyavena.png",
      },
      { id: 6,
        nombre: "Whey protein WOMAN",  
        precio: 4500,
        imagen: "images/wheywoman.png",
      },

];


const construirCarta = (item) => {
    return(
        `<div class="card" style="width: 15rem;">
        <img src="${item.imagen}" alt="${item.nombre}" class="card-img-top ">
        <div class="card-body">
          <h3 class="card-text">${item.nombre}</h3>
          <p class="card-text">Descripcion.....</p>
          <p class="card-text">Precio: $${item.precio}</p>
          <a href="#" onclick=avisoCarrito() class="btn btn-primary productos__precio">Agregar al carrito</a>
        </div>
      </div>`
    );
}

const cargarProductos = (info, nodo) =>{
    let acumulador = "";
    info.forEach((elem) =>{
        acumulador += construirCarta(elem);
    })
    nodo.innerHTML = acumulador; 
}

const avisoCarrito = ()=>{
    alert("Agregaste el producto al carrito");
}
cargarProductos(Productos, contenedor);