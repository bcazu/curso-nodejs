const axios = require('axios');
//`https://maps.googleapis.com/
const getLugarLatLng = async ( direccion ) => {
    let encodeUrl = encodeURI( direccion );

    let resp = await axios.get( `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeUrl}&key=AIzaSyDyJPPlnIMOLp20Ef1LlTong8rYdTnaTXM` )
 
    if(resp.data.status === 'ZERO_RESULTS'){
       throw new Error("No se encontraron resultados para ", direccion);
    }
    
    return {
        direccion: resp.data.results[0].formatted_address,
        lat: resp.data.results[0].geometry.location.lat,
        lng: resp.data.results[0].geometry.location.lng,
    }
  
}

module.exports = {
    getLugarLatLng
}
