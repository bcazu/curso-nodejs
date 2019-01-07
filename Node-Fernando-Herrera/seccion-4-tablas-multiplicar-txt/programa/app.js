/** 
 * Esta es otra forma de requerir archivos. En este
 * caso estoy requiriendo a multiplicar.js que esta en la carpeta
 * multiplicar. 
 * 
 * Para indicar que quiero crear una variable que contenga una función
 * que es exportada por el archivo muliplicar.js, uso destructuración
 * que consite en extraer propiedades de un objeto
 * { nombrePropiedad } 
*/
const { crearArchivo, listar } = require('./multiplicar/multiplicar');
//yarg es una biblioteca que ayuda a manejar instrucciones de comando
const argv = require('./config/yarg').argv;

/**
 * process es una variable de entono de node,
 * y argv es una propiedad que es un array y que almacena
 * parámetros que enviamos por consola.
 * ej-> node app --base=5
 */
//let argv2 = process.argv;
//en esta propiedad se guardan las referencias que hacemos por consola.
console.log(argv)
let command = argv._[0];

switch( command ){
    case 'crear':
        crearArchivo(argv.base, argv.limite)
        .then( archivo => console.log(`Archivo creado: ${ archivo }`))
        .catch( err => {
            console.log(err)
        })
    break;
    case 'listar':
        listar( argv.base, argv.limite );
    break;
    default:
        console.log('Comando no reconocido');
    break;
}


/* let parametro = argv[2];
let base = parametro.split("=")[1] */
//console.log(argv.limite)    

