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
		if (req.query.userid) query.userid = req.query.userid;

		const all_residents = await Resident.find(query);

		res.status(200).json(all_residents);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

module.exports.verify_resident = async (req, res) => {
	try {
		const userid = req.body.userid;
		await Resident.findOneAndUpdate(
			{
				userid: userid,
			},
			{
				isVerified: true,
			}
		);
		res.status(200).send("Resident verified!");
	} catch (error) {
		res.status(400).send(error.message);
	}
};

module.exports.get_houses = async (req, res) => {
	try {
		const query = {
			$or: [
				{ userid: null }, // Matches null values};
			],
		};

		if (req.query.userid) query.userid = req.query.userid;
		if (req.query.id) query.id = req.query.id;
		if (req.query.block) query.block = req.query.block;

		const houses = await House.find(query);

		res.status(200).json(houses);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

module.exports.buy_house = async (req, res) => {
	try {
		const house = await House.findOneAndUpdate(
			{
				_id: req.body.houseid,
			},
			{
				userid: req.body.userid,
			}
		);
		res.status(200).send("House Bought Successfully!");
	} catch (error) {
		res.status(400).send(error.message);
	}
};

module.exports.sell_house = async (req, res) => {
	try {
		const house = await House.findOneAndUpdate(
			{
				userid: req.body.userid,
			},
			{
				userid: null,
			}
		);
		res.status(200).send("House Sold Successfully!");
	} catch (error) {
		res.status(400).send(error.message);
	}
};

module.exports.get_bills = async (req, res) => {
	try {
		const all_bills = await Bill.find();
		res.status(200).json(all_bills);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

module.exports.generate_bill = async (req, res) => {
	const session = await mongoose.startSession();

	try {
		session.startTransaction();

		const { userid, billType, currentUnits } = req.body;
		const resident = await Resident.findOne({ userid: userid });

		let oldUnits;
		let amount;
		if (billType == 0) {
			oldUnits = resident.emeter;
			await Resident.findOneAndUpdate(
				{
					userid: userid,
				},
				{
					emeter: currentUnits,
				}
			);
			amount = calculate_bill(oldUnits, currentUnits, erate);
		} else if (billType == 1) {
			oldUnits = resident.gmeter;
			await Resident.findOneAndUpdate(
				{
					userid: userid,
				},
				{
					gmeter: currentUnits,
				}
			);
			amount = calculate_bill(oldUnits, currentUnits, grate);
		} else {
			oldUnits = resident.wmeter;
			await Resident.findOneAndUpdate(
				{
					userid: userid,
				},
				{
					wmeter: currentUnits,
				}
			);
			amount = calculate_bill(oldUnits, currentUnits, wrate);
		}
		const today = new Date();
		const dueDate = due_date(today, daylimit);
		await Bill.insertMany({
			userid: userid,
			billType: billType,
			oldUnits: oldUnits,
			currentUnits: currentUnits,
			dueDate: dueDate,
			amount: amount,
		});

		await session.commitTransaction();
		session.endSession();

		res.status(201).send("Bill Generated Successfully!");
	} catch (error) {
		await session.abortTransaction();
		session.endSession();

		res.status(400).send(error.message);
	}
};
