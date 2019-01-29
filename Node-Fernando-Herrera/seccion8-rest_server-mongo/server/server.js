require("./config/config.js");

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
//Body parse se usa para poder manipular de mejor 
//forma los parámetros de las peticiones
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//habilitar carpeta public
app.use( express.static( path.resolve(__dirname , '../public' ) ) );   

//Importar configuracion global de rutas y usarlas
app.use( require('./routes/index') );

//urlDB es una variable de entorno que creo en el config.js
mongoose.connect(process.env.URLDB ,{ useNewUrlParser: true }, ( e, res ) => {
    if(e) throw new Error(" Opps! :(");
    console.log("Conexion: On line :)");
});
//Escucho el puerto del servidor
app.listen(process.env.PORT, () => {
    console.log("Escuchando desde el puerto ", process.env.PORT);
});