const {
	promisify
} = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const appError = require("../helpers/appError");

const createToken = (id) => {

	return jwt.sign({
		id,
	},
	process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	},
	);
};
/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.signup = async (req, res, next) => {

	try {

		const {
			name,
			email,
			password,
			passwordConfirm,
			role
		} = req.body;

		if (!name || !email || !password || !passwordConfirm || !role) {
			return next(new appError(400, "Bad Request", "Informações incompleta para realizar cadastro !"), req, res, next);
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
		return next(new appError(500, "Falha",err.message), req, res, next);
	}
};
/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.login = async (req, res, next) => {
	try {

		const {
			email,
			password
		} = req.body;

		if (!email || !password) {
			return next(
				new appError(400, "Falha", "Por favor forneção o email e a senha !"),
				req,
				res,
				next,
			);
		}

		/** 2) verifica se usuario existe e posteriormente se a senha condiz */
		const user = await User.findOne({
			email,
		}).select("+password");

		if (!user || !(await user.correctPassword(password, user.password))) {
			return next(
				new appError(401, "Falha", "Email or Password está incorreta !"),
				req,
				res,
				next,
			);
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
 * @param  {} next
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
			return next(
				new appError(
					401,
					"fail",
					"You are not logged in! Please login in to continue",
				),
				req,
				res,
				next,
			);
		}

		/** 2) Verifica Token válido */
		const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

		/** 3) verifique se o usuário existe (não foi excluído)*/
		const user = await User.findById(decode.id);
		if (!user) {
			return next(
				new appError(401, "fail", "This user is no longer exist"),
				req,
				res,
				next,
			);
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
			return next(
				new appError(403, "fail", "You are not allowed to do this action"),
				req,
				res,
				next,
			);
		}
		next();
	};
};