const express = require ("express")
const app = express()
const port = 3030
const cors = require ("cors")
const productosRouter = require ("./routes/productosRouter.js");
const pedidosRouter = require ("./routes/pedidosRouter.js");
const categoriaRouter = require ("./routes/categoriaRouter.js");
const proveedorRouter = require ("./routes/proveedorRouter.js");


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get ("/",(req,res)=>{
    res.send ("Bienvenido!")
}) 

app.use ("/productos",productosRouter);
app.use ("/pedidos",pedidosRouter);
app.use ("/categorias",categoriaRouter);
app.use ("/proveedor",proveedorRouter);

app.listen (port,()=>{
    console.log(`servidor OK en el puerto ${port}`);
})

