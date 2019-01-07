const axios = require('axios');
//https://openweathermap.org/current
const getClima = async( lat, lng ) => {
   let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=eb963b1354b51c9eda59c90c645a2d6f`)
    //console.log(resp.status)
    return {
        temp: resp.data.main.temp
    }
}

module.exports = {
    getClima
}