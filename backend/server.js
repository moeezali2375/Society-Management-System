import dotenv from "dotenv";
import "./utils/dbConnect.js"; //DB connection
import express from "express";
import userRoute from "./routes/user/userRoute.js";

dotenv.config();
const app = express();

//! MIDDLEWARES
app.use(express.json());
app.use("/", userRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log("App Started on port " + PORT);
});
