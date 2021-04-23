const favorito = require("../models/favoritoModel");
const base = require("./baseController");

exports.getFavoritos = base.getAll(favorito);

exports.getFavorito = base.getOne(favorito);

exports.updateFavorito = base.updateOne(favorito);

exports.deleteFavorito = base.deleteOne(favorito);

exports.add = base.createOne(favorito);