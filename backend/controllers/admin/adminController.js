const mongoose = require("mongoose");

const User = require("../../models/user");
const Bill = require("../../models/bill");
const Resident = require("../../models/resident");

const { erate, grate, wrate, daylimit } = require("../../config/index");
const { due_date, calculate_bill } = require("../../utils/billUtils");

module.exports.home = (req, res) => {
	res.send("Home page of Admin!");
};

module.exports.get_all_residents = async (req, res) => {
	try {
		const all_residents = await Resident.find();
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
