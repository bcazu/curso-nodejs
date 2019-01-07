const argv = require('./config/configuracion');
const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');


let getInfo = async ( direccion ) => {
    try{
        coors = await lugar.getLugarLatLng( direccion );
        temp = await clima.getClima( coors.lat, coors.lng  );
        return `La temperatura en ${coors.direccion} es de ${temp.temp} `
   }catch(e){
        return `No se pudo determinar el clima en ${direccion}`;
   }
}

getInfo( argv.config.direccion )
.then( resp => {
    console.log(resp)
} )