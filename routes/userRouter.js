const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router
	.route("/:id")
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

/** Apenas o administrador tem permissão para acessar as APIs após essa linha */
router.use(authController.restrictTo("admin"));

router
	.route("/")
	.get(userController.getUsers);

router.delete("/deleteMe", userController.disableUser);

module.exports = router;