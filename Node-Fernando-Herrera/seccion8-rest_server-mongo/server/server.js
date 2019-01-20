require("./config/config.js");

const express = require('express');
const mongoose = require('mongoose');
const app = express();
//Body parse se usa para poder manipular de mejor 
//forma los parámetros de las peticiones
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Importar y usar las rutas
app.use( require('./routes/usuario') );

//urlDB es una variable de entorno que creo en el config.js
mongoose.connect(process.env.URLDB ,{ useNewUrlParser: true }, ( e, res ) => {
    if(e) throw new Error(" Opps! :(");
    console.log("Conexion: On line :)");
});

app.listen(process.env.PORT, () => {
    console.log("Escuchando desde el puerto ", process.env.PORT);
});