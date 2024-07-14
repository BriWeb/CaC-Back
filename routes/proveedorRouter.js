const express = require("express")
const router = express.Router()

const { traerProveedores, traerUnProveedor, crearProveedor, actualizarProveedor, borrarProveedor } = require("../controllers/proveedorControllers.js")

router.get("/", traerProveedores);
router.get("/:id", traerUnProveedor);
router.post("/", crearProveedor);
router.put("/:id", actualizarProveedor);
router.delete("/:id", borrarProveedor);

module.exports = router;