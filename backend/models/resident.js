const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
	userid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		unique: true,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	cnic: {
		type: Number,
		min: 1000000000000,
		max: 9999999999999,
		required: true,
		unique: true,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	emeter: {
		type: Number,
		default: 0,
	},
	gmeter: {
		type: Number,
		default: 0,
	},
	wmeter: {
		type: Number,
		default: 0,
	},
});

const Resident = mongoose.model("residents", residentSchema);

module.exports = Resident;
