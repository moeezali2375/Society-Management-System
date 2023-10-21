const express = require("express");
const { adminAuth } = require("../../middlewares/adminAuth");
const {
	home,
	get_all_residents,
	verify_resident,
	get_bills,
	generate_bill,
	get_houses,
	buy_house,
	sell_house,
} = require("../../controllers/admin/adminController");

const adminRouter = express.Router();

adminRouter.get("/home", adminAuth, home);

adminRouter.get("/residents", adminAuth, get_all_residents);

adminRouter.put("/residents/verify", adminAuth, verify_resident);

adminRouter.get("/houses", adminAuth, get_houses);

adminRouter.put("/houses/buy", adminAuth, buy_house);

adminRouter.put("/houses/sell", adminAuth, sell_house);

adminRouter.get("/bills", adminAuth, get_bills);

adminRouter.post("/bills/generate", adminAuth, generate_bill);

module.exports = adminRouter;
