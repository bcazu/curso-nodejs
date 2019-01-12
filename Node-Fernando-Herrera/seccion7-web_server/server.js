const express = require('express');
const app = express();
const hbs = require('hbs');
require('./hbs/helpers');

const port = process.env.PORT || 3000;

//Middleware
//Esto indica que en esa carpeta estaran todos los archivos publicos y de acceso para un usuario o visitante
//por ello la primer carga al iniciar el servidor es el index.html ubicado en /public, y esto lo hace sin necesitad
//de crear un controlador para la url raiz "/"
app.use( express.static( __dirname + '/public' ) )


//Handlebars es un generador de plantillas dinamicas. 

//Los parciales son fracciones de codigo que puedo reutilizar en toda la aplicacion. Este metodo indica que mis parciales estan en /views/parciales
//con esto es suficiente para llamar mis parciales desde el home.habs o cualquier otro archivo .hbs
hbs.registerPartials(__dirname + '/views/parciales' );
//Lo que hacemos es indicar que hbs se convertira en el generador por defecto
app.set('view engine', 'hbs');

app.get( '/', ( req, res ) => {
    
    res.render( 'home');

} )

app.get( '/about', ( req, res ) => { 
    res.render( 'about')
} )

app.listen(port, () => {
    console.log('Escuchando peticiones en el puerto ' + port);
});