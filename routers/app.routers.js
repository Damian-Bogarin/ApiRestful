// Esta es nuestra ruta "madre", nuestra ruta central donde todas las peticiones cuya url sea /api entraran y veran que hacer aqui adentro.
const express = require("express"); //<< Requerimos exprees
const router = express.Router(); //<< nos traemos el metodo Router de express para usarlo


// Aqui importaremos todos las rutas "hijas" de cada recurso,en nuestro caso solo usamos products.
const productsRoutes = require("./products/products.routes"); 


// A FUTURO podriamos incorporar estas rutas hijas:
/*
const usersRoutes = require("./products/users.routes");  << por ejemplo las rutas al: perfil, favoritos, registro, logueo, carrito, articuloscomprados, articulos deseados, billetera etc.
const adminRoutes = require("./products/admin.routes");  << por ejemplo las rutas al: perfil, crear nuevo articulo, eliminarlo, modificarlo,, dar permisos a x usuario etc.
const sellerRoutes = require("./products/seller.routes");  << tus empleados, podrian usar las rutas a:  concretar venta, ver cuantas ventas realize tal dia, ayudar con la cuenta a un usuario etc.... 
const nuevoRecursoQueSeTePuedaOcurrirRoutes = require("./products/nuevoRecursoQueSeTePuedaOcurrir.routes");  

IMAGINENSE TENER TODO ESTO EN EL ARCHIVO INDEX.JS SERIA UNA LOCURA, para esto nos sirve este middleware, para mantener el orden!. :3
 */

router.use("/products", productsRoutes); //<< cuando la ruta que llegue, sea /api/products usara este método el cual esta en la linea 7 de este archivo.   

// A FUTURO podriamos incorporar estos metodos, recuerda que deben ser importados con el require:
/*
router.use("/users", usersRoutes);
router.use("/admin", adminRoutes);
router.use("/seller", sellerRoutes);
router.use("/nuevoRecursoQueSeTePuedaOcurrir", nuevoRecursoQueSeTePuedaOcurrirRoutes);
*/



module.exports = router; //lo exportamos con module.exports, para poder hacer el require en el archivo index.js linea número: 2
