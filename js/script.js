


class instrumento {
    constructor(marca, origen, precio, stock) {
    this.marca = marca;
    this.origen = origen;
    this.precio = precio;
    this.stock = stock;
   
    }
}

//objetos
const instrumento1 = new instrumento ("Roland", "Estados unidos", 2400, 5)
const instrumento2 = new instrumento ("Yamaha", "Estados unidos" , 1200, 10)
const instrumento3 = new instrumento ("Mapex", "inglaterra", 2000, 0)

//Objetos guardados en un array
let instrumentos = [instrumento1, instrumento2, instrumento3] 

instrumentos.forEach((instrumentosEnArray, indice) => {
    console.log(instrumentosEnArray)
    console.log(indice)
})

 console.log(instrumentos.map(instrumento => instrumento.stock))

//array cuotas
const cuotas = [3, 6, 9, 12]

//variables
let eleccion;
let articulos ;
let estado = 1;
let stock;


while(estado ==1){


    let eleccion = seleccionArticulo();
    // alert (eleccion+"ESTO ES FUERA DE LA FUNC");
    let cuotasSeleccionadas = SeleccionCuotas();
    // alert(cuotasSeleccionadas);
    let resultado = calcularCuotas(eleccion,cuotasSeleccionadas);
    alert(`El total de cada cuota será $${resultado} `);
    let salir = prompt("¿Desea elegir otro producto?\n Si  /  No");
    if(salir == "Si"||salir == (("Si").toLowerCase()) || salir == "S" ||salir == (("S").toLowerCase())){
        alert(salir);
        estado=1;
    }else{
        console.log("Abandonando...");
        alert("Hasta luego!")
        estado=0;
    }
    
}


//funciones

function seleccionArticulo(){
    let articulos = prompt(" Por favor seleccione el artículo deseado\n Lista de artículos :\n Bateria Roland(1)\n Bateria Yamaha(2)\n Bateria Mapex(3)" );
    if(articulos == "1"|| articulos == "Bateria Roland"){
        articulos = "Bateria Roland";
        alert(`has seleccionado ${articulos}`);
        alert(`El valor total de ${articulos} es $${instrumento1.precio}`);
        if(instrumento1.stock >= 1){
            alert("Hay stock")
        }else{
            alert("No hay stock")
            
            return seleccionArticulo();
        }
       
    }else if( articulos == "2"|| articulos == "Bateria Yamaha"){
        articulos = "Bateria Yamaha";
        alert(`has seleccionado ${articulos}`);
        alert(`El valor total de ${articulos} es $${instrumento2.precio}`);
        if(instrumento2.stock >= 1){
            alert("Hay stock")
        }else{
            alert("No hay stock")
            
            return seleccionArticulo();
        }
    }else if(articulos =="3" || articulos == "Bateria Mapex"){
        articulos= "Bateria Mapex";
        alert(`has seleccionado ${articulos}`);
        alert(`El valor total de ${articulos} es $${instrumento3.precio}`);
        if(instrumento3.stock >= 1){
            alert("Hay stock")
        }else{
            alert("No hay stock")
            return seleccionArticulo();
        }
        
    } else {
        alert("No contamos con ese artículo :( selecciona uno del listado.")
        return seleccionArticulo();
    }
    
    return articulos;
}

function SeleccionCuotas(){
   
    let cuotas =  parseInt(prompt("Selecciona el número de cuotas\n (Cuotas disponibles: 3, 6, 9, 12)"));
    if (cuotas != 3 && cuotas != 6 && cuotas != 9 && cuotas !=12){
        alert("ERROR !!! CUOTA NO VÁLIDA.\n Seleccione una cuota valida (3, 6, 9 o 12)")
        return SeleccionCuotas();
    }
    alert(`Se seleccionaron ${cuotas} cuotas`)
    return cuotas;
    
}


function calcularCuotas(eleccion,cuotasSeleccionadas){
    
    
    
    if (eleccion == "Bateria Roland" || eleccion == "1"){
        
        
        
        if (cuotasSeleccionadas == 3){
           return instrumento1.precio/3;
        }else if (cuotasSeleccionadas == 6){
            return instrumento1.precio/6;
        }else if (cuotasSeleccionadas == 9){
            return instrumento1.precio/9;
        }else if (cuotasSeleccionadas == 12){
            return instrumento1.precio/12;
        }
        

    }

    if (eleccion == "Bateria Yamaha" || eleccion == "2"){
        
        
        
        if (cuotasSeleccionadas == 3){
           return instrumento2.precio/3;
        }else if (cuotasSeleccionadas == 6){
            return instrumento2.precio/6;
        }else if (cuotasSeleccionadas == 9){
            return instrumento2.precio/9;
        }else if (cuotasSeleccionadas == 12){
            return instrumento2.precio/12;
        }
        

    }

    if (eleccion == "Bateria Mapex" || eleccion == "3"){
        
        
    
        if (cuotasSeleccionadas == 3){
           return instrumento3.precio/3;
        }else if (cuotasSeleccionadas == 6){
            return instrumento3.precio/6;
        }else if (cuotasSeleccionadas == 9){
            return instrumento3.precio/9;
        }else if (cuotasSeleccionadas == 12){
            return instrumento3.precio/12;
        }
        

    }


}

