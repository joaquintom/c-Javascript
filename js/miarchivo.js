

class instrumento{
    constructor(marca, origen, precio) {
    this.marca = marca;
    this.origen = origen;
    this.precio = precio
    }
}

const instrumento1 = new instrumento("rmv", "brasil", 500)
const instrumento2 = new instrumento ("pearl", "Estados unidos" , 2000)
const instrumento3 = new instrumento ("ludwig", "inglaterra", 4000)

let instrumentos = [instrumento1, instrumento2, instrumento3]

console.log(instrumentos)

for(let bateria of instrumentos)
    for(let propiedad in bateria){
    console.log(bateria[propiedad])
}


/* 
let instrumento = ["bateria", "guitarra", "piano"]

let instrumentoAEliminar = prompt(" Elegir un instrumento a eliminar :\n bateria \n guitarra \n piano")

let indice = instrumento.indexOf(instrumentoAEliminar)

if(indice != -1){
    instrumento.splice(indice,1)
} else{
    alert("no se encontro el instrumento a eliminar")
}
console.log(instrumento)
*/
