
let opts = {
    base:{
        demand: true,
        alias: 'b'
    },
    limite:{
        alias: 'l',
        default: 10
    }
}
const argv = require('yargs')
.command('listar', 'imprime las tablas de multiplicar',opts)
.command('crear', 'crea una nueva tabla', opts)
.help()
.argv;

module.exports = {
    argv
}