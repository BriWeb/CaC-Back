
const express = require ("express")
const router = express.Router()

const {traerpedidos,traerUnPedido,crearPedido,actualizarPedido,borrarPedido} = require ("../controllers/pedidosControllers.js")

router.get("/",traerpedidos);
router.get("/:id",traerUnPedido);
router.post("/",crearPedido);
router.put("/:id",actualizarPedido);
router.delete("/:id",borrarPedido);

module.exports = router;