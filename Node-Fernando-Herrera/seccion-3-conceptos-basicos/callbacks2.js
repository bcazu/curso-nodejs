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

let getEmpleado = (id, callback) => {
    let empleadoDB = empleados.find( empleado => empleado.id === id );

    if( !empleadoDB ){
        callback(`No existe el empleado con id ${id}`);
    }else{
        callback( null, empleadoDB );
    }
}


let getSalario = (empleado, callback) =>{
    let salarioDB = salarios.find( salario => salario.id === empleado.id );

    if( !salarioDB ) callback(` No se encontró un salario para el usuario ${empleado.nombre}`)
    else callback(null, {
        nombre: empleado.nombre,
        salario: salarioDB.salario
    });
}


getEmpleado(3, (err, empleado) => {
    if( err ){
        return console.log(err)
    }
    getSalario(empleado, (err, res) =>{
        if( err ) console.log(err);
        else console.log(`El salario de ${res.nombre} es de $${res.salario}`);
    })
});

