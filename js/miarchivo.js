
const productos = [

  { id: 1, instrumento: "Bateria", marca: "Ludwig", valor: 4000, imagen: "./img/baterias/bateria-ludwig.jpg"},
  { id: 2, instrumento: "Bateria", marca: "Pearl", valor: 3000, imagen: "./img/baterias/bateria-pearl-tienda.jpg" },
  { id: 3, instrumento: "Bateria", marca: "Yamaha", valor: 2000, imagen: "./img/baterias/bateria-yamaha-tienda.jpg" },
  { id: 4, instrumento: "Bateria", marca: "Mapex", valor: 1000, imagen: "./img/baterias/bateria-mapex-tienda.jpg" },
  { id: 5, instrumento: "Guitarra", marca: "Fender", valor: 3500, imagen: "./img/guitarras/guitarra-fender.jpg"  },
  { id: 6, instrumento: "Guitarra", marca: "Gibson", valor: 3000, imagen: "./img/guitarras/guitarra-gibson.jpg" },
  { id: 7, instrumento: "Guitarra", marca: "Ibanez", valor: 3500, imagen: "./img/guitarras/guitarra-ibanez.jpg" },
  { id: 8, instrumento: "Guitarra", marca: "Squire", valor: 2500, imagen: "./img/guitarras/guitarra-squire.jpg" },
  { id: 9, instrumento: "Bajo", marca: "Fender", valor: 2500, imagen: "./img/bajos/bajo-fender.jpg" },
  { id: 10, instrumento: "Bajo", marca: "Ibanez", valor: 1500, imagen: "./img/bajos/bajo-ibanez.jpg" },
  { id: 11, instrumento: "Bajo", marca: "Squier", valor: 1000, imagen: "./img/bajos/bajo-squier.jpg" },
  { id: 12, instrumento: "Bajo", marca: "Xs", valor: 500, imagen: "./img/bajos/bajo-xs.jpg" },
  { id: 13, instrumento: "Teclado", marca: "Roland", valor: 2000, imagen: "./img/teclados/teclado-roland.jpg" },
  { id: 14, instrumento: "Teclado", marca: "Yamaha", valor: 1800, imagen: "./img/teclados/teclado-yamaha.jpg" },
  { id: 15, instrumento: "Teclado", marca: "M-audio", valor: 1500, imagen: "./img/teclados/teclado-m-audio.jpg" },
  { id: 16, instrumento: "Teclado", marca: "Casio", valor: 1000, imagen: "./img/teclados/teclado-casio.jpg" },

];



//Dom
let titulo1 = document.getElementById("titulo1");
let divTitulo = document.getElementById("divTitulo");

const buscador = document.querySelector("#inputBuscador");
const botonB = document.querySelector("#botonBuscar");
const items = document.querySelector("#divProductos");

// Btn Finalizar Compra
const avisoCarrito = document.querySelector(".agregarProductos")
const btnFinCompra = document.getElementById("btnFinalizarCompra")

// Api canciones 
const letrasCanciones = document.getElementById("letraCancion")
const container = document.getElementById("containerApi")

const artista = document.getElementById("artistaEleccion")
const cancion = document.getElementById("cancionEleccion")
const btnbuscar = document.getElementById("buscarTemas")
const errorMensaje = document.getElementById("mensajeError")


let carrito = [];


//localStorage
(localStorage.getItem("carrito")) ? carrito = JSON.parse(localStorage.getItem("carrito")) : localStorage.setItem("carrito", JSON.stringify(carrito));
// operador ternario


titulo1.innerText = "Tienda de instrumentos";
// modificaciones de  texto


//Buscador
const filtrar = () => {
  items.innerHTML = "";
    const texto = buscador.value.toLowerCase();
       for (let producto of productos) {
          let instrumento = producto.instrumento.toLowerCase();
              if (instrumento.indexOf(texto) !== -1) {
                 items.innerHTML += ` 
                    <div class="card" id="producto${producto.id}"style="width: 18rem;">
                    <img src="${producto.imagen}" class="card-img-top" alt="...">
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


// Agregar Al Carrito
productos.forEach((producto) => {
    document
      .getElementById(`botonCarrito${producto.id}`)
      .addEventListener("click", () => {
        //Libreria
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
        //console.log(productoExistente)

           if (productoExistente) {
                carrito = carrito.map(productoCarrito => {
           if (productoCarrito.id === productoExistente.id) {
                const nuevoProducto = { ...productoCarrito, cantidad: productoCarrito.cantidad + 1 }
                   return nuevoProducto;
              }
                   return productoCarrito
       
         })} else {
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


  // Carrito
  const abrirCarrito = () => {
      chango.innerHTML = '';
        carrito.forEach(producto => {
          chango.innerHTML += ` 
              <div class="card" id="producto ${producto.id}"style="width: 18rem;">
                  <div class="card-body">
                    <img src="${producto.imagen}" class="card-img-top" alt="...">
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


// Actualizar valor carrito
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


// Btn Vaciar Carrito
  const btnVaciarChango = document.getElementById("btnVaciarCarrito")
      btnVaciarChango.addEventListener("click", () =>{
       
        if(carrito == 0){
          
          avisoCarrito.innerHTML = "";
       
        } else {
        
        Swal.fire({
          icon: 'warning',
          title: 'Se vacio el carrito',
          
        })
        
        carrito = []
        localStorage.setItem("carrito", JSON.stringify(carrito));
        
     abrirCarrito()
  }
})


// Btn Finalizar Compra
     btnFinCompra.addEventListener("click", () => {
     
        
        if(carrito == 0){
         
          avisoCarrito.innerHTML = "";

        } else { 
    // Si hay productos en el carrito finaliza la compra.
        Swal.fire({
        icon: 'sucess',
        title: '¡Gracias por su compra! ',
            
      })

      chango.innerHTML = `
      <p><strong>¡Gracias por su compra!</strong> Estamos armando su pedido :)</P>
    `;  
  
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));

  }    
    
})



// Api canciones 

// Ingresar un artista
btnbuscar.addEventListener("click", (e) =>{
    e.preventDefault();
      console.log(artista.value);
      console.log(cancion.value);

  errorMensaje.innerHTML =""

      if (artista.value === "" || cancion.value === "") {
          errorMensaje.innerHTML += `
        <p>Por favor, llene los campos solicitados.</p>
      `;
    }
        llamarApi();
})



function llamarApi(){
  //https://api.lyrics.ovh/v1/artist/title (asi figura la api pero no me lo toma, asi que le puse como artista coldplay y una canción) https://lyricsovh.docs.apiary.io/#reference/0/lyrics-of-a-song/search
  fetch('https://api.lyrics.ovh/v1/Coldplay/Adventure%20of%20a%20Lifetime') 
  .then(response => response.json())
    .then(data =>{
        console.log(data)

     if(data.lyrics){
        const {lyrics} = data;
        mostrarCancion(lyrics);
    }else{
  
    errorMensaje.innerHTML += `
       <p>La canción no aparece.</p>
      `;
    }

})
   .catch(error => console.log(error))
}


// Mostrar la canción 
function mostrarCancion(lyrics){
  const letraMostrar = document.getElementById("letra")
      letraMostrar.innerHTML ="";

          letraMostrar.innerText = lyrics;
            letrasCanciones.appendChild(letraMostrar)
  }


