const user = require("../models/userModel");
const base = require("./baseController");
const apiResponse = require("../helpers/apiResponse");
const {
	promisify
} = require("util");
const jwt = require("jsonwebtoken");

exports.getUsers = base.getAll(user);

exports.getUser = base.getOne(user);

exports.getCurrent = async (req, res, next) => {
	try {

		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
		}
		if (!token) {
			return apiResponse.ErrorResponseCustom(res, "Você não está logado, realize o login para continuar !", 401);
		}

		const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

		if (!decode.id) {
			return apiResponse.ErrorResponseCustom(res, "Você não está logado, realize o login para continuar !", 401);
		}

		/** 3) verifique se o usuário existe (não foi excluído)*/
		const current = await user.findById(decode.id);

		if (!current) {
			return apiResponse.ErrorResponseCustom(res, "Você não está logado, realize o login para continuar !", 401);
		}	

		res.status(200).json({
			status: "success",
			data: current
		});
	} catch (err) {
		next(err);
	}
};

exports.updateUser = base.updateOne(user);

exports.deleteUser = base.deleteOne(user);

/** disable user  */
exports.disableUser = async (req, res, next) => {
	try {
		await user.findByIdAndUpdate(req.user.id, {
			active: false
		});

		res.status(204).json({
			status: "success",
			data: null
		});

	} catch (error) {
		next(error);
	}
};