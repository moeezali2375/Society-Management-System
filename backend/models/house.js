const mongoose = require("mongoose");

const houseSchema = mongoose.Schema({
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
	userid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const House = mongoose.model("house", houseSchema);

module.exports = House;
