import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectionString = process.env.CSTRING;
const exp = mongoose
	.connect(connectionString)
	.then(() => console.log("Db connected!"))
	.catch((err) => {
		console.log("error:" + err);
	});

export default exp;
