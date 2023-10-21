const mongoose = require("mongoose");

const houseSchema = mongoose.Schema({
	residentid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
		unique: true,
	},
	id: {
		type: Number,
		required: true,
		primary: true,
	},
	block: {
		type: String,
		maxlength: 1,
		required: true,
		primary: true,
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

const House = mongoose.model("houses", houseSchema);

module.exports = House;
