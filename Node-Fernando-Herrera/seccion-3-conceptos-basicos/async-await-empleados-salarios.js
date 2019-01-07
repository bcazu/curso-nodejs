let empleados = [
    {
        id: 1,
        nombre: "Brayan"
    },
    {
        id: 2,
        nombre: "Melisa"
    },
    {
        id:3,
        nombre: "Juan"
    }
]

let salarios = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 3000
    }
]

let getEmpleado = async (id) => {
  
        let empleadoDB = empleados.find( empleado => empleado.id === id );

        if( !empleadoDB ){
            //Si hay una excepcion o error, lo retorno en el reject
            throw new Error(`No existe el empleado con id ${id}`);
        }else{
            //Si todo va bien, retorno el resolve
            return empleadoDB;
        }
}

let getSalario = async (empleado) => {
    let salarioDB = salarios.find( salario => salario.id === empleado.id );

    if( !salarioDB )throw new Error(` No se encontró un salario para el usuario ${empleado.nombre}`)
    else return( {
        nombre: empleado.nombre,
        salario: salarioDB.salario
    });
}

let contarEmpleados = async ( arr )=>{
        if(arr) return ( arr.length )
        else return ('No existe el array')
}


//Ejecuto la primer funcion y con el then obtengo el resolve y con err obtengo el error. Es necesario manejar tanto el then como el catch
/* getEmpleado(2).then( empleado =>{
    return getSalario( empleado );
})
.then( resp => {
    console.log(`El salario de ${resp.nombre} es de ${resp.salario}`);
    contarEmpleados(null).then( resp => {
        console.log("El tamaño del array es de",resp.length);
    }).catch( err => {
        console.log(err);
    })
})
.catch( err => {
    console.log(err);
})
 */
let getInformacion = async (id) => {
    let empleado = await getEmpleado(id);
    let resp = await getSalario(empleado);
    return `${resp.nombre} tiene un salario de ${ resp.salario}`;
} 

getInformacion(2).then( async mensaje => {
    console.log(mensaje)
    let conteo = await contarEmpleados(empleados);
    console.log(conteo)
}).catch( e =>{
    console.log(e) 
})