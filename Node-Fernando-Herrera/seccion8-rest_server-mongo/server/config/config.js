
/**
 * PUERTO
 */
process.env.PORT = process.env.PORT || 3000;


/** 
 * ENTORNO 
 * */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
let urlDB = 'mongodb://localhost:27017/cafe';
if(process.env.NODE_ENV != 'dev'){
    urlDB = process.env.MONGO_URI;
}

/**
 * CADUCIDAD DEL TOKEN
 * 60 segundos
 * 60 minutos
 * 24 horas
 * 30 dias
*/
process.env.CADUCIDAD = 60 * 60 * 24 * 30;

/**
 * SEED O SEMILLA
 */
process.env.SEED = process.env.SEED || 'seed-desarrollo';

 //Creo una variable de entorno para almacenar la conexion a la bd
process.env.URLDB = urlDB;


