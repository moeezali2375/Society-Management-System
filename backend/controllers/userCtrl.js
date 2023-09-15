// import mongoose from "mongoose";
import User from "../models/user.js";

export const adduser = async (req, res) => {
	try {
		const new_user = {
			username: "Moeez Ali",
		};
		const registered_user = await User.insertMany(new_user);
		if (registered_user) {
			res.json({ msg: "User inserted successfully!" });
		}
	} catch (error) {
		console.log(error);
	}
};

