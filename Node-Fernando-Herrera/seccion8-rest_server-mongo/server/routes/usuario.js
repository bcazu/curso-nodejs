const express = require('express');
//encriptar contraseñas
const bcrypt = require('bcrypt');
//herramienta para ciclos, objetos, arrays etc..
const _ = require('underscore');

//Importo el modelo de usuarios para usarlo al momento en el que se hacen las peticiones rest
const modeloUsuario = require('../models/usuario');
const UsuarioModel = modeloUsuario.model;
let UsuarioDto = modeloUsuario.dto;

const app = express();

app.get('/usuario', ( req, res ) => {
    //desde funciona para indicar desde qué registro quiero visualizar.
    //Por defecto es desde el registro 0
    let desde = req.query.desde || 0;
    desde = Number(desde);
    //limite es el hasta, es decir, desde el registro 0 hasta los 5 siguientes
    let limite = req.query.limite || 5;
    limite = Number(limite);

    //find es un metodo para buscar registros, el recibe dentro de las llaves cualquier condición
    //también recibe los campos que se quieren mostrar
    //ejemplo: find({ google:true }, 'nombre)
    //skip define el desde
    //limite define cuantos
    //exec ejecuta la query
    UsuarioModel.find({ estado: true }, 'nombre email role estado google img' )
                .skip(desde)
                .limit(limite)
                .exec( ( err, usuariosDb ) => {
                    if(err){
                        return res.status(400, {
                            ok: false,
                            err
                        })
                    }
                    UsuarioModel.count({ estado: true }, ( err, conteo ) => {
                         res.json({
                            ok: true,
                            usuario: usuariosDb,
                            cuantos: conteo
                        })
                    } );
                   
                } )

                
})

app.post('/usuario', ( req, res ) => {
    let body = req.body;
    //De esta manera creo un nuevo objeto con el modelo que quiera usar. En este caso es el modelo de Usuario 
    let usuarioModel = new UsuarioModel({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    }); 
    let usuarioDto = JSON.parse(JSON.stringify(UsuarioDto));
    //de esta manera guardo un nuevo usuario en la bd mongo
    usuarioModel.save( ( err, usuarioDb ) => {
        //verifico si hubo error y controlo la respuesta
        if(err){
            return res.status( 400 ).json({
                ok: false,
                err
            })
        }
        //si todo va bien, indico que la operacion es ok y retorno el usuario que ingresaron sin incluir la contraseña
        usuarioDto.nombre = usuarioDb.nombre;
        usuarioDto.email = usuarioDb.email;
        usuarioDto.img = usuarioDb.img;
        usuarioDto.estado = usuarioDb.estado;
        usuarioDto.role = usuarioDb.role;
        usuarioDto.google = usuarioDb.google;
        
        res.json({
            ok: true,
            usuario: usuarioDto
        })

    } )
    
})

app.put('/usuario', ( req, res ) => {
    res.json("put usuario");
})

app.put('/usuario/:id', ( req, res ) => {
    let id = req.params.id;
    //uso el metodo _pick para crear un objeto solo con las propiedades que yo quiero mandar a actualizar a partir del body 
    let body = _.pick(req.body, ['nombre','email','img','role','estado']);
    //De esta forma le digo al modelo que busque en la bd el id que envio y si lo encuentra lo actualice.
    //new indica que me retorne el objeto actualizado y runValiators indica que antes de actualizar corra las validaciones del modelo.
    //esto impide que se pueda actualiar role que no esté permitido
    UsuarioModel.findByIdAndUpdate( id, body, { new: true, runValidators: true } , ( err, usuarioDb ) => {
        if(err){
            return res.status( 400 ).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDb
        })
    })


})

app.delete('/usuario/:id', ( req, res ) => {
    //Capturo el id enviado por url
   let id = req.params.id;

   let cambiEstado = {
       estado: false
   }


   //busco un registro con el id para eliminarlo
   UsuarioModel.findByIdAndUpdate(id, cambiEstado, { new: true}, ( err, usuarioBorrado ) => {
       //Valido si hay error o si no encontró el id a eliminar
       if(err){
            return res.status(400).json({
                ok: false,
                err
            })
       }
       if( !usuarioBorrado ){
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Usuario no encontrado para eliminar'
                }
            })
       }
       //Si todo salió bien, retorno el usuario eliminado
       res.json({
           ok: true,
           usuario: usuarioBorrado
       })
   } )
})

module.exports = app