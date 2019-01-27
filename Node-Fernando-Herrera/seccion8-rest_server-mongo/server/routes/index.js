const express = require('express');
const app = express();
//Importar y usar las rutas
app.use( require('./usuario') );
app.use( require('./login') );

module.exports = app;