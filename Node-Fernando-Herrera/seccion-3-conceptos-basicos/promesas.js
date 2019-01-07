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
//Ejecuto la primer funcion y con el then obtengo el resolve y con err obtengo el error. Es necesario manejar tanto el then como el catch
getEmpleado(3).then( empleado =>{
    console.log(`Empleado de dB `, empleado);
    getSalario(empleado).then( salario => {
        console.log("El salario es ", salario)
    }, ( err )=>{
        console.log("no hay salario")
    })
}, (err) =>{
    console.log(err)
} )