
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



//Dom
let titulo1 = document.getElementById("titulo1");
let divTitulo = document.getElementById("divTitulo");

const buscador = document.querySelector("#inputBuscador");
const botonB = document.querySelector("#botonBuscar");
const items = document.querySelector("#divProductos");


const sideLetters = document.querySelector(".side-right");
const sideLeft = document.querySelector(".side-left");
const searchLetters = document.querySelector(".search-letters");

const artista = document.querySelector(".artist");
const cancion = document.querySelector(".song");

let carrito = [];

// operador ternario:
(localStorage.getItem("carrito")) ? carrito = JSON.parse(localStorage.getItem("carrito")) : localStorage.setItem("carrito", JSON.stringify(carrito));


// modificaciones de  texto
titulo1.innerText = "Instrumentos";


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
          <p class="noEncontrado"> <strong>Producto no encontrado</strong>, podés seguir buscando :)</p>
          `;
          
  }

};

buscador.addEventListener("input", filtrar);
botonB.addEventListener("click", filtrar);
items.addEventListener("keyup", filtrar);

filtrar();


 
//agregarAlCarrito
productos.forEach((producto) => {
  document
    .getElementById(`botonCarrito${producto.id}`)
    .addEventListener("click", () => {
      //libreria
      Toastify({
        text: "Producto Agregado!",
        duration: 800,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "blue",
        },
        onClick: function(){} 
      }).showToast();
 

      // Ver si en el carrito el producto ya existe
      const productoExistente = carrito.find(productoCarrito => productoCarrito.id === producto.id)
      console.log(productoExistente)

      if (productoExistente) {
        carrito = carrito.map(productoCarrito => {
          if (productoCarrito.id === productoExistente.id) {
            const nuevoProducto = { ...productoCarrito, cantidad: productoCarrito.cantidad + 1 }
            return nuevoProducto;
          }
          return productoCarrito
        })
      } else {
        // Si no exite, agregamos el producto al carrito Y le agregamos la key cantidad con el valor 1
        const nuevoProducto = { ...producto, cantidad: 1 }
        carrito.push(nuevoProducto);
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
    
});


//Eliminar Producto Carrito
const chango = document.getElementById("offCanvaCarrito");
function borrarProducto(idAEliminar) {
  carrito = carrito.filter(producto => {
    if (producto.id !== idAEliminar) {
      return producto
    }
  })
  localStorage.setItem("carrito", JSON.stringify(carrito));
  abrirCarrito();
 
}


const abrirCarrito = () => {
  chango.innerHTML = '';
  carrito.forEach(producto => {
    chango.innerHTML += ` 
        <div class="card" id="producto ${producto.id}"style="width: 18rem;">
        <div class="card-body">
        <h3 class="card-title">${producto.instrumento}</h3>
            <h5 class="card-title">Marca: ${producto.marca}</h5>
            <p class="card-text">Precio: $${producto.valor}</p>
            <p class="card-text">Cantidad: ${producto.cantidad}</p>
            <button id="btnVaciarCarrito${producto.id}" class="btn btn-dark"> Eliminar</button> 
            </div>
            </div>
        `;
  })

  carrito.forEach(producto => {
    const botonEliminar = document.getElementById(`btnVaciarCarrito${producto.id}`)
    botonEliminar.addEventListener('click', () =>
      borrarProducto(producto.id)
    )
  })

  actualizarCarrito()
  
}

// Cada vez que se abre el carrito ejecutar funcion abrirCarrito
let btnCarrito = document.getElementById("botonMostrar")
btnCarrito.addEventListener('click', abrirCarrito)


//Actualizar carrito
const compraTotal = document.getElementById("precioTotal")
function actualizarCarrito(){
const nCantidad = carrito.reduce((nIngreso, {cantidad}) => nIngreso + cantidad, 0)
const nValor = carrito.reduce((nIngreso, {cantidad, valor}) => nIngreso + cantidad * valor, 0)
//console.log(nValor)
    if(nValor){
      
      compraTotal.innerHTML = `
        <p><strong>precio total:</strong> $${nValor}</P>
      `;
    }
    
    if (nValor == 0){
      compraTotal.innerHTML = `
      <p><strong>precio total:</strong> $0</P>
    `;
  }
  
  }

  //Vaciar Carrito
    const btnVaciarChango = document.getElementById("btnVaciarCarrito")
    btnVaciarChango.addEventListener("click", () =>{
      carrito = []
      localStorage.setItem("carrito", JSON.stringify(carrito));
      abrirCarrito()
    })



searchLetters.addEventListener("click", (e) => {
    e.preventDefault();
    //console.log(artista.value);
    //console.log(cancion.value);
    if (artista.value === "" || cancion.value === "") {
        mostrarError("Ambos campos son obligatorios...");
        return;
    }

    callApiSong(artista.value, cancion.value);
})

function callApiSong(artista, cancion){
    fetch('https://api.lyrics.ovh/v1/${artista}/${cancion}')
        .then(respuesta => respuesta.json())
        .then(resultado => {
            //console.log(resultado);
            if (resultado.lyrics) {
                const {lyrics} = resultado;
                mostrarLetra(lyrics);
            } else {
                mostrarError("La cancion no existe...");
            }
        })
        .catch(error => console.log(error));
}

function mostrarLetra(lyrics){
    sideLetters.innerHTML = "";
    const title = document.createElement("h3");
    title.innerText = `${cancion.value} de: ${artista.value}`;
    sideLetters.appendChild(title);

    const letra = document.createElement("p");
    letra.innerText = lyrics;
    sideLetters.appendChild(letra);
}

function mostrarError(mensaje){
    const error = document.createElement("p");
    error.classList.add("error-mensaje");
    error.innerText = mensaje;

    sideLeft.appendChild(error);
    setTimeout(() => {
        error.remove();
    }, 2000);
}





