import mongoose from "mongoose";
const connectionString = "mongodb://127.0.0.1:27017/SMS";
const exp = mongoose
	.connect(connectionString)
	.then(() => console.log("Db connected!"))
	.catch((err) => {
		console.log("error:" + err);
	});

export default exp;
