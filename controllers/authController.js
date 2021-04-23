const {
	promisify
} = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const apiResponse = require("../helpers/apiResponse");

const createToken = (id) => {
	return jwt.sign({id,},process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN,});
};

/**
 * @param  {} req
 * @param  {} res 
 */
exports.signup = async (req, res) => {

	try {

		const {
			name,
			email,
			password,
			passwordConfirm,
			role
		} = req.body;

		if (!name || !email || !password || !passwordConfirm || !role) {
			return apiResponse.ErrorResponseCustom(res, "Informações incompleta para realizar cadastro !", 400);
		}

		const user = await User.create({
			name: req.body.name,
			...req.body
		});

		const token = createToken(user.id);

		user.password = (void 0);

		res.status(201).json({
			status: "success",
			token,
			data: {
				user,
			},
		});
	} catch (err) {
		return apiResponse.ErrorResponse(res, err.message);
	}
};
/**
 * @param  {} req
 * @param  {} res 
 */
exports.login = async (req, res, next) => {
	try {

		const {
			email,
			password
		} = req.body;

		if (!email || !password) {
			return apiResponse.ErrorResponseCustom(res, "Por favor forneção o email e a senha !", 400);
		}

		/** 2) verifica se usuario existe e posteriormente se a senha condiz */
		const user = await User.findOne({
			email,
		}).select("+password");

		if (!user || !(await user.correctPassword(password, user.password))) {
			return apiResponse.ErrorResponseCustom(res, "Email or Password está incorreta !", 401);
		}

		/** 3) Cria token com base no id do usuario */
		const token = createToken(user.id);

		/**remove senha do campo */
		user.password = (void 0);

		res.status(200).json({
			status: "success",
			token,
			data: {
				user,
			},
		});
	} catch (err) {
		next(err);
	}
};
/**
 * Valida Chamada
 * @param  {} req
 * @param  {} res 
 */
exports.protect = async (req, res, next) => {
	try {
		// 1) check if the token is there
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

		/** 2) Verifica Token válido */
		const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

		/** 3) verifique se o usuário existe (não foi excluído)*/
		const user = await User.findById(decode.id);
		if (!user) {
			return apiResponse.ErrorResponseCustom(res, "Usuário não existe !", 401);
		}

		req.user = user;
		next();
	} catch (err) {
		next(err);
	}
};

/**
 * Verifica se o usuário tem  autorização
 * @param  {} ...roles
 */
exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return apiResponse.ErrorResponseCustom(res, "Você não tem permissão acessar essa api !", 403);
		}
		next();
	};
};