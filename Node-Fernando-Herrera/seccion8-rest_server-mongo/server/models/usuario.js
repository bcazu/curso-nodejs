const mongoose = require('mongoose');
//mongoose-unique-validator es un plugin para ayudar a manejar los mensaje de error cuando el campo es unico
const uniqueValidator = require('mongoose-unique-validator');



//Este objeto es necesario crearlo para indicarle a la propiedad role
//qué valores debe esperar y validarlos.
//Para indicarle a una propiedad que valide los valores esperados se le debe
//asignar la propiedad enum
let rolesValido = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;

//este modelo es con el que voy a guardar en la bd
let usuarioModel = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        unique: true,
        required: [true,'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true,'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValido
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
//este modelo es con el que voy a responderle al usuario una vez haya guardado. Muy similar a la estructura model y dto que se maneja en JAVA
let usuarioDto = {
    nombre: 'nombre',
    email: 'email',
    img: 'img',
    role: 'role',
    estado: 'estado',
    google: 'google',
    
};

//Se debe asignarle el pugin al modelo que lo usará
//PATH indica automáticamente la propiedad que es unica
usuarioModel.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
});


module.exports = {
    model: mongoose.model( 'UsuarioModel', usuarioModel ),
    dto: usuarioDto
}