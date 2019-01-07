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

let getEmpleado = (id) => {
    //creo una nueva promesa con js puro gracais a ES6. esta promesa recibe dos callbacks, resolve y reject
    return new Promise( (resolve, reject) =>{
        let empleadoDB = empleados.find( empleado => empleado.id === id );

        if( !empleadoDB ){
            //Si hay una excepcion o error, lo retorno en el reject
            reject(`No existe el empleado con id ${id}`);
        }else{
            //Si todo va bien, retorno el resolve
            resolve( empleadoDB );
        }
    })
}

let getSalario = (empleado) => {
    return new Promise( (resolve, reject) => {
        let salarioDB = salarios.find( salario => salario.id === empleado.id );

        if( !salarioDB ) reject(` No se encontró un salario para el usuario ${empleado.nombre}`)
        else resolve( {
            nombre: empleado.nombre,
            salario: salarioDB.salario
        });
    } )
}

let contarEmpleados = ( arr )=>{
    return new Promise( (resolve , reject) =>{
        if(arr) resolve( arr )
        else reject ('No existe el array')
    } )
}


//Ejecuto la primer funcion y con el then obtengo el resolve y con err obtengo el error. Es necesario manejar tanto el then como el catch
getEmpleado(2).then( empleado =>{
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