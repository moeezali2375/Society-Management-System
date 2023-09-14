import express from "express";

const app = express();

app.listen(3000, () => {
	console.log("App Started on port 3000");
});

app.get("/", (req, res) => {
	console.log("App is working");
});
