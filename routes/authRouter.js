const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/register", authController.signup);
router.post("/login", authController.login);

/** proteje todas rotas após essa linha */
router.use(authController.protect);

module.exports = router;