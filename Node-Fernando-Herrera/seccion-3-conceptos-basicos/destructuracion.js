
let obj = {
    nombre: "Brayan Stiven",
    apellido: "Castaño Zuluaga",
    edad: 25   
}

/**Destructuracion
 * La destructuracion consiste en crear variables a partir de las propiedades de un objeto; por ejemplo
 * let nombre = obj.nombre
 * let apellido = obj.apellido
 * 
 * Para evitar hacer esto hacemos lo siguiente
 */
let { edad, apellido, nombre} = obj;
console.log(nombre, apellido, edad);
//El orden de las variables no necesariamente deben estar en orden y para ponerle un alias a las variables se hace con el dos puntos

