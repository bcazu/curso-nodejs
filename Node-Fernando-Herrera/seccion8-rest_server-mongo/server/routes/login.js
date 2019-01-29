const express = require('express');
//encriptar contraseñas
const bcrypt = require('bcrypt');
//json web token es la librearia que me permite crear mis tokens al iniciar una sesion
const jwt = require('jsonwebtoken');
//libreria para validar la autenticacion del usuario mendiante google
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

//Importo el modelo de usuarios para usarlo al momento en el que se hacen las peticiones rest
const modeloUsuario = require('../models/usuario');
const UsuarioModel = modeloUsuario.model;
let UsuarioDto = modeloUsuario.dto;

const app = express();


  
//ruta para el login
app.post( '/login', ( req, res ) => {
    let body = req.body;
    //finOne busca en mongo un solo registro que coincida con este email
    UsuarioModel.findOne({ email: body.email } , ( err, usuarioDb ) => {
        //si hay un error retorno el status 500 y el error
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }
        //Valido si existe el email y sino retorno el error
        if( !usuarioDb ){
            console.log('el email')
            return res.status(400).json({
                ok: false,
                err: {
                    message: "-Usuario o contrasea incorrectos"
                }
            })
        }
        //Si existe el email valido el password
        if( !bcrypt.compareSync( body.password, usuarioDb.password )){
            console.log('la pass')
            return res.status(400).json( {
                ok: false,
                err: {
                    message: "Usuario o -contrasea incorrectos"
                }
            })
        }
        //Si todo coincide entonces creo mi token. el seed se encuentra en una variable entorno al igual que la caducidad
        let token = jwt.sign({
            usuario: usuarioDb,
        }, process.env.SEED, {expiresIn: process.env.CADUCIDAD});
        res.json({
            ok:true,
            usuario: usuarioDb,
            token
        })

    });
} )

/**
 * Configuracion de google
*/
//Funcion para verificar el token de google
async function verify( token ) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    //retorno solo alguna informacion del usuario
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google:  true
    }
}
//peticion que hace el boton de iniciar sesion de google en la que envia el token de google
app.post( '/google', async ( req, res ) => {
    token = req.body.idtoken;
    console.log('token', token)
    console.log('entro')
    //reviso el token
    let googleUser = await verify( token )
        .catch( err => {
        console.log('error 4')
            return res.status(403).json({
                ok:false,
                err: {
                    message: 'falló la verificacion del token'
                }
            })
        });
    //si el token es valido voy a buscar el usuario en mi bd para saber si existe
    console.log('consulto bd',googleUser)
    UsuarioModel.findOne( { email: googleUser.email}, ( err, usuarioDb ) => {
        if(err){
            console.log('error 1')
            return res.status(500).json({
                ok: false,
                err
            })
        }
        //Mi sistema solo deja usar un metodo de autenticacion, el tradicional user and password o la autenticacion de google
        if( usuarioDb ){
            console.log('usuario existe')
            //por lo tanto si el usuario existe en la bd, voy a preguntar si la propiedad google es false, esto me indica que su metodo de 
            //autenticacion fue el tradicional por lo que no lo dejare autenticarse con google sino con su user and password
            if( !usuarioDb.google ){
                console.log('no usa google para autenticarse')
                console.log('error 2')
                return res.status(400).json({
                    ok: false,
                    err:{
                        message: "El usuario ya se encuentra autentificado con sus credenciales"
                    }
                })
            }else{
                console.log('usa a google para autenticarse')
                //Si el usuario existe en la bd y la propiedad google es true, indica que el metodo de autenticacion del usuario es el de google
                //Si todo coincide entonces creo mi token. el seed se encuentra en una variable entorno al igual que la caducidad
                let token = jwt.sign({
                    usuario: usuarioDb,
                }, process.env.SEED, {expiresIn: process.env.CADUCIDAD});
                //genero el token del sistema que es diferente al de google y retorno el usuario y su toquen
                return res.json({
                    ok: true,
                    usuario: usuarioDb,
                    token: token
                })
            }
        }else{
            //Si el usuario no existe en la bd hay que crear un nuevo usuario con el metodo de autenticacion de google
            //el password es obligatorio por lo que le ingreso un valor x. 
            console.log('no existe y se va a crear')
            let usuario = new UsuarioModel();
            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = ':)';
            usuario.save( ( err, usuarioDb ) => {
                if(err){
                    console.log('error 3')
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }
                //Si todo coincide entonces creo mi token. el seed se encuentra en una variable entorno al igual que la caducidad
                let token = jwt.sign({
                    usuario: usuarioDb,
                }, process.env.SEED, {expiresIn: process.env.CADUCIDAD});
                console.log('creado')
                return res.json({
                    ok: true,
                    usuario: usuarioDb,
                    token: token
                })
            } )
        }

    } );
    
   
    
} )
module.exports = app