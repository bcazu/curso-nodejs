const config = require('yargs').options({
    direccion:{
        alias: 'd',
        desc: 'Commando para obtener el clima',
        demand: true
    }
}).argv;

module.exports = {
    config
}