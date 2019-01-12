const http = require('http');

http.createServer( ( req, res ) =>{
    res.writeHead(200, {
        'content-Type': 'application/json'
    })
    let salida = {
        name: 'brayan',
        edad: 25,
        url: req.url
    }
    res.write(JSON.stringify(salida));
    res.end();
}  )
.listen(8080);

console.log('Escucahndo el puerto 8080');