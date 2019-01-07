
let getUsuarioById = (id, callback) => {

    let usuario = {
        nombre: "Brayan",
        id
    }

    if(id === 20){
        callback(`El usuario con el id ${id}, no existe`, "No existe en la bd");
    }else{
        callback(null,usuario); 
    }
}

getUsuarioById(10, (err,usuario)=>{

    if( err ){
        return console.log(err);
    }
    console.log("Usuario de base de datos", usuario);
} )

