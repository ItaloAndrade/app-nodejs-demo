const favorito = require("../models/favoritoModel");
const base = require("./baseController"); 
const apiResponse = require("../helpers/apiResponse");

exports.getFavoritos = base.getAll(favorito);

exports.getFavorito = base.getOne(favorito);

exports.updateFavorito = base.updateOne(favorito);

exports.deleteFavorito = base.deleteOne(favorito);

exports.add = base.createOne(favorito);

exports.getFavoritoByUsuario = async (req, res, next) => {
	try {
		const doc = await favorito.findOne({idUsuario:req.params.idUsuario});
 
		if (!doc) {
			return apiResponse.ErrorResponseCustom(res, "Nenhum documento encontrado com esse id !", 400);
		}

		res.status(200).json({
			status: "success",
			data: {
				doc
			}
		});
	} catch (error) {
		next(error);
	}
};