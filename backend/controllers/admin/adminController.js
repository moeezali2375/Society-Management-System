const User = require("../../models/user");
const Resident = require("../../models/resident");

module.exports.home = (req, res) => {
	res.send("Home page of Admin!");
};

module.exports.get_all_users = async (req, res) => {
	try {
		const all_residents = await Resident.find();
		res.status(200).json(all_residents);
	} catch (error) {
		res.status(400).send(message);
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
		res.status(400).send(message);
	}
};
