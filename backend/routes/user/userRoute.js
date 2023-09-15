import express from "express";
import { adduser } from "../../controllers/userCtrl.js";
const userRoute = express.Router();

userRoute.get("/", (req, res) => {
	try {
		res.json({ msg: "home route of user" });
	} catch (error) {
		res.json(error);
	}
});
userRoute.post("/adduser", adduser);

export default userRoute;
