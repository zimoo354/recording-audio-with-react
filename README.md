# recording-audio-with-react

### Instalación

Esta aplicación se puede instalar fácilmente en un hosting compartido o un entorno de desarrollo local con stack XAMP (WAMP, LAMP, MAMP).
##### Paso 1
Instala la base de datos encontrada en el archivo `atexto.sql` en un servidor MySQL.
##### Paso 2
Copia los archivos a la raíz de la carpeta que vaya a fungir como raíz del directorio
##### Paso 3
En el archivo `/config/db.php` modifica tus credenciales de la base de datos
(Hasta este punto ya deberías de ser capaz de obtener respuesta de la API en la URL `https://<<BASE_URL>>/api`)
##### Paso 4
Instala las dependencias de la aplicación de react que se encuentra en el folder `react-app` mediante el comando:
```sh
$ npm install
```
##### Paso 5
Modifica la ruta de la API a la que apuntará el front end en el archivo `/react-app/src/config.js`
##### Paso 6
Compila la aplicación de react mediante el comando
```sh
$ npm run build
```
##### Paso 6
Se generará una carpeta llamada `build`. Mueve todo su contenido a la raíz del proyecto.

### Ya debería funcionar