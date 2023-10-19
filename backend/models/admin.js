const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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
});

const Admin = mongoose.model("admins", adminSchema);

module.exports = Admin;
