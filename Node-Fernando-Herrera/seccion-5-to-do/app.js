const argv = require('./config/yarg').argv;
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');
//console.log(argv);
let command = argv._[0]
switch(command){
    case 'crear':
       let tarea = porHacer.crear(argv.descripcion)
       console.log(tarea);
    break;
    case 'eliminar':
        let borrado = porHacer.eliminar( argv.descripcion);
        console.log(borrado);
    break;
    case 'actualizar':
        let actualizado = porHacer.actualizar( argv.descripcion, argv.completado );
        console.log(actualizado);
    break;
    case 'listar':
      
        let listado = porHacer.listar( argv.filtro );
        for(let value of listado){
            if(value.completado){
                console.log("============Hecha================".green);
            }else{
                console.log("============Pendinete============".magenta);
            }
           
            console.log("Descripcion: ", value.descripcion);
            console.log("Estado: ", value.completado);

            if(value.completado){
                console.log("=================================".green);
            }else{
                console.log("=================================".magenta);
            }
            
            
        }
    break;
    default:
        console.log("Comando no reconocido".red)
    break;
}

