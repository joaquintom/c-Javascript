
const productos = [
    { id: 1, instrumento: "Bateria", marca: "ludwig", valor: 4000 },
    { id: 2, instrumento: "Bateria", marca: "pearl", valor: 3000 },
    { id: 3, instrumento: "Bateria", marca: "yamaha", valor: 2000 },
    { id: 4, instrumento: "Bateria", marca: "mapex", valor: 1000 },
    { id: 5, instrumento: "Guitarra", marca: "fender", valor: 3500 },
    { id: 6, instrumento: "Guitarra", marca: "gibson", valor: 3000 },
    { id: 7, instrumento: "Guitarra", marca: "ibanez", valor: 3500 },
    { id: 8, instrumento: "Guitarra", marca: "squire", valor: 2500 },
    { id: 9, instrumento: "Bajo", marca: "fender", valor: 2500 },
    { id: 10, instrumento: "Bajo", marca: "ibanez", valor: 1500 },
    { id: 11, instrumento: "Bajo", marca: "squier", valor: 1000 },
    { id: 12, instrumento: "Bajo", marca: "xs", valor: 500 },
    { id: 13, instrumento: "Teclado", marca: "roland", valor: 2000 },
    { id: 14, instrumento: "Teclado", marca: "yamaha", valor: 1800 },
    { id: 15, instrumento: "Teclado", marca: "m-audio", valor: 1500 },
    { id: 16, instrumento: "Teclado", marca: "casio", valor: 1000 },
  ];
  
  let carrito = [];
  
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
  } else {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  //Dom
  let titulo1 = document.getElementById("titulo1");
  let divTitulo = document.getElementById("divTitulo");
  
  const buscador = document.querySelector("#inputBuscador");
  const botonB = document.querySelector("#botonBuscar");
  const items = document.querySelector("#divProductos");
  
  
  // modificaciones de  texto
  titulo1.innerText = "Instrumentos";
  //nullis
  console.log(productos.material ?? "propiedad no encontrada");
  // desestructuracion
  let { material } = productos;
  console.log(material ?? "propiedad no encontrada");
  
  //buscador
  const filtrar = () => {
    items.innerHTML = "";
    const texto = buscador.value.toLowerCase();
    for (let producto of productos) {
      let instrumento = producto.instrumento.toLowerCase();
      if (instrumento.indexOf(texto) !== -1) {
        items.innerHTML += ` 
              <div class="card" id="producto${producto.id}"style="width: 18rem;">
                  <div class="card-body">
                  <h3 class="card-title">${producto.instrumento}</h3>
                      <h5 class="card-title">${producto.marca}</h5>
                      <p class="card-text">$${producto.valor}</p>
                      
                      <button id="botonCarrito${producto.id}" class="btn btn-dark"> Agregar al carrito</button>
                  </div>
              </div>
              
              `;
      }
    }
  
    if (items.innerHTML === "") {
      items.innerHTML += `
          <p> Producto no encontrado</p>
          `;
    }
  };
  
  buscador.addEventListener("input", filtrar);
  botonB.addEventListener("click", filtrar);
  items.addEventListener("keyup", filtrar);
  
  filtrar();
    
  //carrito
  productos.forEach((producto) => {
    document
      .getElementById(`botonCarrito${producto.id}`)
      .addEventListener("click", () => {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
      });
  });
  
  //offcanva
  const chango = document.getElementById("offCanvaCarrito");
  productos.forEach((producto) => {
    document
      .getElementById(`botonCarrito${producto.id}`)
      .addEventListener("click", () => {
          chango.innerHTML += `
                          <div class="card" id="producto${producto.id}"style="width: 18rem;">
                          <div class="card-body">
                          <h3 class="card-title">${producto.instrumento}</h3>
                              <h5 class="card-title">${producto.marca}</h5>
                              <p class="card-text">$${producto.valor}</p>                        
                          </div>
                      </div>
                      `;
      });
  });
 
  // Productos offcanva localstorage
  document.getElementById("botonMostrar")
  let carritoStorage = JSON.parse(localStorage.getItem("carrito"))
  carritoStorage.forEach(producto => {
      chango.innerHTML += ` 
      <div class="card" id="producto ${producto.id}"style="width: 18rem;">
      <div class="card-body">
      <h3 class="card-title">${producto.instrumento}</h3>
          <h5 class="card-title">Marca: ${producto.marca}</h5>
          <p class="card-text">Precio: $${producto.valor}</p>
                  </div>
          </div>
      `;
  })

      

