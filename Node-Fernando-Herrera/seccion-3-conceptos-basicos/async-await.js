/**
 * Async Await
 */

 //Async es de ES7, y su funcion es resumir las promesas, es decir
 //Con solo asignar async ya me convierne getNombre en una promesa que puedo resolver cuando quiera
 
 let getNombre = async() => {
     return "Brayan";
 }

 getNombre().then( nombre =>{
     console.log(nombre)
 }).catch(e => {
     console.log(e)
 })
 //////////////////////


 //saludo es otra función que ejecuta otra funcion que es una promesa,
 //y al ponerle async convierto a saludo en otra promesa
  let saludo = async () => {
    //con la palabra await convierto esa linea en codigo sincrono
    // de esta forma obtengo el retorno de getNombre y lo almaceno en una variable que puedo retornar
    let nombre = await getNombre();
    return `hola ${nombre}`
  }

  //Al ejecturar saludo, puedo tratarlo como promesa
  saludo().then( (msg) => {
       console.log(msg);
  })