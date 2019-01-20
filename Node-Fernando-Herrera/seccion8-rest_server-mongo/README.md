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