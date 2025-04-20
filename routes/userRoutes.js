const express= require("express");
const { registerUser, loginUser, dashboardUser } = require("../controllers/userController");
const authenticateUser = require("../middlewares/authenticateUserHandler");
const { validateUserRegister, validateUserLogin } = require("../middlewares/validateUserInputHandler");
const router= express.Router();

router.route("/register").post(validateUserRegister,registerUser)
router.route("/login").post(validateUserLogin,loginUser)
router.route("/dashboard").get(authenticateUser,dashboardUser)

module.exports= router;