const fs = require('fs');
const colors = require('colors');
let listadoPorHacer = [];

const crear = (descripcion) =>{
    cargarDb();
    let porHacer = {
        descripcion,
        completado: false,
    }

    listadoPorHacer.push(porHacer);
    guardarDb();
    return porHacer;
}

const guardarDb = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, ( err =>{
        if (err) 
            throw new Error('No se guardo la informacion en la base de datos');
    } ))
}

const cargarDb = () => {
   try{
    listadoPorHacer = require('../db/data.json');
    //console.log(listadoPorHacer);
   }catch(err){
    listadoPorHacer = [];
   }
}
const listar = ( filtro='all') => {
    cargarDb();
    let resultado = [];
    
    if(filtro == 'all'){
        return listadoPorHacer;
    }else if(filtro == 'c'){
        resultado = listadoPorHacer.filter( tarea => {
           return tarea.completado == true
        });
        //console.log("c",resultado);
        return resultado;
    }else if(filtro == 'p'){
        resultado = listadoPorHacer.filter( tarea => {
           return tarea.completado != true
        });
        //console.log("p",resultado);
        return resultado;
    }
}

const actualizar = ( descripcion, completado = true ) => {
    cargarDb();
    let index = listadoPorHacer.findIndex( tarea => {
        return tarea.descripcion === descripcion;
    } ) 

    if( index >= 0 ){
        listadoPorHacer[index].completado = completado;
        guardarDb();
        return true;
    }
    else{
        console.log("Actualizacion: La tarea a actualizar no existe")
        return false;
    }

}

const eliminar = ( descripcion ) => {
    cargarDb();
    let index = listadoPorHacer.findIndex( tarea => {
        return tarea.descripcion === descripcion;
    } )
    if( index >= 0 ){
        listadoPorHacer.splice(index, 1);
        guardarDb();
        return true;
    }
    else{
        console.log("Eliminacion: La tarea a eliminar no existe")
        return false;
    }
}

module.exports = {
    crear,
    listar,
    actualizar,
    eliminar
}