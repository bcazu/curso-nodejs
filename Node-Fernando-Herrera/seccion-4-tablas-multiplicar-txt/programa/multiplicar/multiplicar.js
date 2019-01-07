/** De esta forma solicito dependencias de node. 
 * En este caso fileSystem es dependencia de node 
 * por lo que no tengo que indicarle una ruta
 * 
*/

const fs = require('fs');
const colors = require('colors');

let listar = ( base, limite ) => {
    console.log('========================='.green);
    console.log(`Tabla del ${base}`.green);
    console.log('========================='.green);
    let data = '';
    for(let i = 1; i <= limite; i++){
        data +=`${ base } * ${ i } = ${ base * i } \n`;
    }
    console.log(data)
}

let crearArchivo = ( base, limite ) => {

    return new Promise( ( resolve, reject ) =>{
        if( !Number( base ) ){
            reject( `El valor introducido ${ base } no es un número` )
            return;
        }
        let data = '';

        for(let i = 1; i <= limite; i++){
            data +=`${ base } * ${ i } = ${ base * i } \n`;
        }

        fs.writeFile(`tablas/tabla-${ base }.txt`, data, (err) => {
        
            if (err) 
                reject( err )
            else
                resolve( `tabla-${ base }.txt`.green );

        });
    } )

}
/**
 * module es una variable global de node por lo que la puedo usar
 * para especificar que quiero exportar o dejar disponible para usar
 * de este archivo js. Para lograrlo uso la propiedad exports el cual es un objeto
 * 
 */
module.exports = {
    crearArchivo,
    listar
}

