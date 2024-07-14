
const express = require("express")
const router = express.Router()

const { traerCategorias, traerUnaCategoria, crearCategoria, actualizarCategoria, borrarCategoria } = require("../controllers/categoriaControllers.js")

router.get("/", traerCategorias);
router.get("/:id", traerUnaCategoria);
router.post("/", crearCategoria);
router.put("/:id", actualizarCategoria);
router.delete("/:id", borrarCategoria);

module.exports = router;