import express from "express";

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log("App Started on port 3000");
});

app.get("/", (req, res) => {
	console.log("App is working");
});
