
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
 //Creo una variable de entorno para almacenar la conexion a la bd
process.env.URLDB = urlDB;


