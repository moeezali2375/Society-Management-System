const express = require("express");

const { residentAuth } = require("../../middlewares/residentAuth");
const {
	home,
	get_bills,
	payment_details,
} = require("../../controllers/resident/residentController");

const residentRouter = express.Router();

residentRouter.get("/home", residentAuth, home);

residentRouter.get("/bills", residentAuth, get_bills);

residentRouter.post("/bills/payment-details", residentAuth, payment_details);

module.exports = residentRouter;
