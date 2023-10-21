const mongoose = require("mongoose");

const User = require("../../models/user");
const Resident = require("../../models/resident");
const House = require("../../models/house");
const Bill = require("../../models/bill");

const { erate, grate, wrate, daylimit } = require("../../config/index");
const { due_date, calculate_bill } = require("../../utils/billUtils");

module.exports.home = (req, res) => {
	res.send("Home page of Admin!");
};

module.exports.get_all_residents = async (req, res) => {
	try {
		const query = {};

		if (req.query.isVerified) query.isVerified = req.query.isVerified;
		if (req.query.userId) query.userId = req.query.userId;

		const all_residents = await Resident.find(query);

		res.status(200).json(all_residents);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

module.exports.verify_resident = async (req, res) => {
	try {
		const userId = req.body.userId;
		const resident = await Resident.findOne({ userId: userId });
		if (resident.isVerified) res.status(400).send("Resident already verified!");
		else {
			await Resident.findOneAndUpdate(
				{
					userId: userId,
				},
				{
					isVerified: true,
				}
			);
			res.status(200).send("Resident verified!");
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
};

module.exports.get_unsold_houses = async (req, res) => {
	try {
		const query = {
			$or: [
				{ residentId: null }, // Matches null values};
			],
		};

		// if (req.query.houseNo) query.houseNo = req.query.houseNo;
		// if (req.query.block) query.block = req.query.block;

		const houses = await House.find(query);

		res.status(200).json(houses);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

module.exports.buy_house = async (req, res) => {
	try {
		const { residentId, houseId } = req.body;
		const house = await House.findOne({ _id: houseId });
		if (!house.residentId) {
			await House.findOneAndUpdate(
				{
					_id: houseId,
				},
				{
					residentId: residentId,
				}
			);
			res.status(200).send("House Bought Successfully!");
		} else {
			throw new Error("House already Sold!");
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
};
