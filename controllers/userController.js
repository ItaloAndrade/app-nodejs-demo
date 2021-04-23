const user = require("../models/userModel");
const base = require("./baseController"); 

exports.getUsers = base.getAll(user);

exports.getUser = base.getOne(user);

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