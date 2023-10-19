const express = require("express");
const { adminAuth } = require("../../middlewares/adminAuth");
const {
	home,
	get_all_users,
	verify_resident,
} = require("../../controllers/admin/adminController");

const adminRouter = express.Router();

adminRouter.get("/home", adminAuth, home);

adminRouter.get("/get-all-residents", adminAuth, get_all_users);

adminRouter.put("/verify-resident", adminAuth, verify_resident);

module.exports = adminRouter;
