const express = require("express");
const favoritoController = require("../controllers/favoritoController");


const router = express.Router();



router
	.route("/getFavoritosByUsuario/:idUsuario")
	.get(favoritoController.getFavoritosByUsuario);


router
	.route("/:idUsuario")
	.get(favoritoController.getFavoritoByUsuario);


  
  
router
	.route("/:id")
	.get(favoritoController.getFavorito)
	.patch(favoritoController.updateFavorito)
	.delete(favoritoController.deleteFavorito);

router
	.route("/")
	.get(favoritoController.getFavoritos);

router.post("/", favoritoController.add);

module.exports = router;