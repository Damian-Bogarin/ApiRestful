const express = require("express");  //<- Requerimos express
const apiRouters = require("./routers/app.routers"); // <- importamos la ruta "madre", la ruta que controla todas las rutas por asi decirlo (Es como la persona que guia la peticion que manda el cliente)

const app = express();
const PORT = process.env.PORT || 8080; 


 /*MIDDLEWARES A NIVEL APLICACION, (influyen en TODAS las peticiones, ya sean get post delete etc) RECUERDA: los middlwares de rutas van por debajo de todo los app.use*/

 //Estos middlewares le dicen a express : Vas a recibir info en formato json (POST PUT ejemplo)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Este middleware le dicen a express: Todos tus archivos estaticos( imagenes, archivos css, audio.. por ejemplo) van a estar en tu carpeta public, buscalos ahí señor express. :D
app.use(express.static('public'));


//Cada vez que llega una peticion cuya url empieza con /api usara esta ruta, esto nos sirve para mantener el orden y la escalabilidad, y cada recurso (products, usuarios, comerciantes, administradores, etc etc etc)
//tengan su propia ruta, para que así por ejemplo, si me esta fallando la ruta /api/usuarios/perfil por ejemplo, sabemos donde esta el inconveniente, y no tengamos que recorrer mucho código para encontrarlo
//imaginense si todo estuviera en el archivo index.js, y una persona nueva ingresa a la empresa y ve un archivo de 550 renglones o MAS, COLAPSA! 
app.use("/api", apiRouters);
// recuerda poner las rutas, al final de todos los middlewares para evitar posibles conflictos.




// ESta es la ruta 404, cuando la peticion tenga una URL incorrecta, podriamos, con esta ruta, mostrarle un lindo error en pantalla con un botoncito para regresarlo al home.  :3
app.use('*', (req, res) => {
    res.status(404).send('<h1> Page does not exist</h1>')
})


//Conexion del servidor y todo lo que ya sabemos. :D
const connectedServer = app.listen(PORT, () => {
  console.log(`🚀Server up and listening on the port: ${PORT}`);
});

connectedServer.on("error", (error) => {
  console.log(`error:`, error.message);
});