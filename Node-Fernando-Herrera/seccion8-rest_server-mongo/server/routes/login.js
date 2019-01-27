const express = require('express');
//encriptar contraseñas
const bcrypt = require('bcrypt');
//json web token es la librearia que me permite crear mis tokens al iniciar una sesion
const jwt = require('jsonwebtoken');
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

module.exports = app