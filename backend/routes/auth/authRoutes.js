const express = require("express");
const {
	register,
	login,
	login_failure,
	logout,
	login_success,
	register_admin,
} = require("../../controllers/auth/authController");

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/login-failure", login_failure);
authRouter.get("/login-success", login_success);

authRouter.post("/logout", logout);

authRouter.post("/register-admin", register_admin);
module.exports = authRouter;
