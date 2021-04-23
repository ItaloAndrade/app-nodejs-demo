var express = require("express");
const favoritoController = require("../controllers/favoritoController");

var router = express.Router();

router
    .route('/')
    .get(favoritoController.getFavoritos);

router
    .route('/:id')
    .get(favoritoController.getfavorito)
    .patch(favoritoController.updateFavorito)
    .delete(favoritoController.deleteFavorito);
 
module.exports = router;