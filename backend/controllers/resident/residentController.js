const Bill = require("../../models/bill");
const Image = require("../../models/image");
const upload = require("../../middlewares/multer");

module.exports.home = (req, res) => {
	res.send("Home page of Resident!");
};

module.exports.get_bills = async (req, res) => {
	try {
		const bills = await Bill.find({
			userid: req.user._id,
		});
		res.status(200).json(bills);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

module.exports.payment_details = async (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			res.status(400).send(err.message);
		} else {
			const newImage = new Image({
				name: req.body.name,
				image: {
					data: req.file.filename,
					contentType: "image/png",
				},
			});
			newImage
				.save()
				.then(() => {
					res.status(200).send("Picture Uploaded Successfully!");
				})
				.catch((err) => {
					res.status(400).send(err.message);
				});
		}
	});
};
