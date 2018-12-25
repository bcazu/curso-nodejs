let  descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
}
let completado = {
    demand: true,
    default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'
}
const argv = require('yargs')
.command('crear','Inserta una nueva tarea',{
    descripcion
})
.command('actualizar','Actualiza el estado completado de una tarea',{
    descripcion,
    completado
})
.command('listar','Lista las tareas creadas',{
    filtro:{
        alias: 'f',
        desc: 'Lista las tareas de acuerdo al filtro: all, c (completadas), p (pendientes)'
    }
    
})
.command('eliminar','Elimina una tarea',{
    descripcion
})
.help()
.argv;

module.exports = {
    argv
}
