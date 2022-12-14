// Este es la ruta "hija" de productos, aqui es donde desembocara todas las rutas que sean /api/products y procesamos todo como corresponda, ya sea un get, un post un put...
const express = require("express"); //<< requerimos express
const route = express.Router(); // << usamos el metodo router, el middleware 

const Contenedor = require("../../database/class.products"); // requerimos nuestra clase para poder traernos los metodos, save GetById getAll etc

/*Aqui a futuro pondriamos los middlewarees a nivel del ROUTER, solo influenciaran en aquellas peticiones cuya url sea /api/products */


//instanciamos la variable products, para poder controlar el json. Esto seria nuestro PSEUDO controllador de base de datos, el cual ira evolucionando mas adelante!
let products = new Contenedor('./routers/products/products.json'); //<< Usamos la palabra reservada new para crear una nueva clase en el cual le pasamos el archivo .json como parametro


route.get("/", async (req, res) => {
    try {
        let productos = await products.getAll()
        res.json(productos)
    } catch (error) {
        
    }
    
  });
  
  route.get("/:id", async (req, res) => {
  
    const { id } = req.params;
    const product = await products.getById(+id);
    if (!product) {
      return res.status(404).json({
        status: false,
        error: `Product with id: ${id} not found`,
      });
    }
    return res.json({ status: "located", result: product });
  });
  
  route.post("/", async (req, res) => {
    const { title, price, thumbnail } = req.body;
    if (title === Number(title) || !title || !price || !thumbnail) {
      return res.status(404).json({
        status: false,
        error: `product does not comply with the required format`,
      });
    }
   
   try {
    let idDevuelto = await products.save(req.body); //ejecutamos el metodo save, este nos devuelve el id
    let prodductoAgregado = await products.getById(idDevuelto) // ejecutamos el metodo getById y luego lo mandamos con el res.json
    res.json(prodductoAgregado)  // res.json nos responde con el objeto
   } catch (error) {
    console.log(error)
   } 
    
  });
  
  route.put("/:id", async (req, res) => {
    const {params: { id }, body: { title, price, thumbnail },
    } = req;
    if (!title || title === Number(title) || !price || !thumbnail) {  //aqui validamos que lo que llegue en el req.body sea lo correcto.
      return res.status(404).json({ 
        status: false,
        error: `product does not comply with the required format`,
      });


    }
    try {
        await products.changeById(+id, { title, price, thumbnail } )   //cree un metodo nuevo, el cual actualiza los datos del json el id es un string, al ponerle el + adelante lo parsea a int
        let newProduct = await products.getById(+id)
        return res.json({ success: true, result: newProduct });
    } catch (error) {
        console.log(error)
    }
   
  });
  
  route.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProduct = await products.getById(+id); //verificamos que el producto exista!
    if (deleteProduct === undefined) {
      return res.status(404).json({
        status: false,
        error: `Product with id: ${id} not found`,
      });
    }
    const newListProduct = await products.deleteById(+id); //una vez validado que el producto existe, lo eliminamos.
    res.json({
      success: true,
      result: newListProduct,
    });
    } catch (error) {
        
    }
    
  });

module.exports = route; //Por ultimo, no menos importate, exportamos el route!