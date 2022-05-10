const productos = [
    {nombre: "Proteina", precio: 4500},
    {nombre: "Creatina", precio: 3500},
    {nombre: "Vitaminas", precio: 2500},
];

for(const producto of productos){
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `<img src="images/creatina.png"></img>
                            <h2>PRODUCTO: ${producto.nombre}</h2>
                            <p>PRECIO: ${producto.precio}</p>
                            <button>Agregar al carrito</button>`;
    document.body.append(contenedor);
}

