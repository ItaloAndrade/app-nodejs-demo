const appError = require("../helpers/appError");
const apiFeatures = require("../helpers/apiFeatures");

exports.deleteOne = (Model) => async (req, res, next) => {
	try {
		const doc = await Model.findByIdAndDelete(req.params.id);

		if (!doc) {
			return next(new appError(404, "fail", "Nenhum documento encontrado com esse id !"), req, res, next);
		}

		res.status(204).json({
			status: "success",
			data: null
		});
	} catch (error) {
		next(error);
	}
};

exports.updateOne = (Model) => async (req, res, next) => {
	try {
		const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		if (!doc) {
			return next(new appError(404, "fail", "Nenhum documento encontrado com esse id"), req, res, next);
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

exports.createOne = (Model) => async (req, res, next) => {
	try {

		const doc = await Model.create(req.body);

		res.status(201).json({
			status: "success",
			data: {
				doc
			}
		});

	} catch (error) {
		next(error);
	}
};

exports.getOne = (Model) => async (req, res, next) => {
	try {
		const doc = await Model.findById(req.params.id);

		if (!doc) {
			return next(new appError(404, "fail", "Nenhum documento encontrado com esse id"), req, res, next);
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

exports.getAll = (Model) => async (req, res, next) => {
	try {

		const features = new apiFeatures(Model.find(), req.query)
			.sort()
			.paginate();

		const doc = await features.query;

		res.status(200).json({
			status: "success",
			results: doc.length,
			data: {
				data: doc
			}
		});

	} catch (error) {
		next(error);
	}

};