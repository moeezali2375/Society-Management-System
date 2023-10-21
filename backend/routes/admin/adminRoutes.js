const express = require("express");
const { adminAuth } = require("../../middlewares/adminAuth");
const {
	home,
	get_all_residents,
	verify_resident,
	get_unsold_houses,
	buy_house,
	get_sold_houses,
	get_bills,
	generate_bill,
	sell_house,
	get_residents_houses,
} = require("../../controllers/admin/adminController");

const adminRouter = express.Router();

adminRouter.get("/home", adminAuth, home);

adminRouter.get("/residents", adminAuth, get_all_residents);

adminRouter.put("/residents/verify", adminAuth, verify_resident);

adminRouter.get("/unsold-houses", adminAuth, get_unsold_houses);

adminRouter.put("/houses/buy", adminAuth, buy_house);

adminRouter.get("/sold-houses", adminAuth, get_sold_houses);

adminRouter.put("/houses/sell", adminAuth, sell_house);

//! residents-houses
adminRouter.get("/residents-houses", adminAuth, get_residents_houses);

//! Generate a bill
adminRouter.post("/bills/generate", adminAuth, generate_bill);

// adminRouter.get("/bills", adminAuth, get_bills);

module.exports = adminRouter;
