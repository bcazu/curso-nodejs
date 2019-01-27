const jwt = require('jsonwebtoken');

/**
 * VERIFICAR TOKEN
 */

let verificarToken = ( req, res, next) => {
    //La idea es que el token venga en los headers de la peticion
    //para obtener los heder se usa req.get('nombrePorpiedadHeader')
    let token = req.get('token');
    //Verifico si el token es valido
    jwt.verify( token, process.env.SEED, ( err, decoded ) => {
        //Retorno un error si no es valido
        if(err){
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token inválido"
                }
            })
        }
        //Si es valido entonces doy informacion a la peticion del usuario y con next() le digo que siga con la peticion
        req.usuario = decoded.usuario;
        console.log("req",req.usuario)
        next();
    } );

}

/**
 * VERIFICAR ROL_ADMIN
*/
//verifica si el usuario que está haciendo operaciones si tenga los permisos para hacerlo
let verificarRolAdmin = ( req, res, next ) => {
    let rol = req.usuario.role;
    console.log("vericarRol",req.usuario);
    if(rol != "ADMIN_ROLE"){
        return res.status(403).json({
            ok:false,
            err:{
                message: "El usuario no tiene permisos para realizar esta operación"
            }
        })
    }
    next();
}
module.exports = {
    verificarToken,
    verificarRolAdmin
};