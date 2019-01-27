## Web server rest
Iniciar con ```git init``` para instalar todos los paquetes.

### Contenido
express, pordy parser, api rest, bycript, mongoose

### Errores
#### Bycript
Error: Can't find Python executable "python" after installing  
Solución: Ejecutar el siguiente codigo en una consola como administrador
```
npm --add-python-to-path='true' --debug install --global windows-build-tools
```
Error: Problemas de incopatibilidad con Bycript.
Solución: Una es adicionar en el package.json la propiedad engine:
```
    "engine":{
        "node": version de node que estas usando
    }
```

#### Heroku
Se integra con heroku. para hacer push a heroku se usa:
```
git push heroku master
```
Para crear variables de entorno en consola se usa:
``` 
heroku config:set NOMBRE=valor
```
Para leerla en consola:
```
heroku config:get NOMBRE
```
En el código js se lee desde la variable global ``` process.env.NOMBRE ```
#### Mlab
Es un motor de bd mongo. aqui almacenamos nuestra bd