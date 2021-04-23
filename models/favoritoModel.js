const mongoose = require("mongoose");

/**cria  esquema  para collection */
const favoritoSchema = new mongoose.Schema({
	idComic: {
		type: String,
		required: [true]
	},
	idUsuario: {
		type: String,
		required: [true],
	},
	nomeComic: {
		type: String,
		required: [true],
	},
	img: {
		type: String,
		required: [true],
	},
	active: {
		type: Boolean,
		default: true,
		select: false,
	  }
}, {
	timestamps: true
});

module.exports = mongoose.model("Favorito", userSchema);