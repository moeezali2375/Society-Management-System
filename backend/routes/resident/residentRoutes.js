const express = require("express");
const { residentAuth } = require("../../middlewares/residentAuth");
const { home } = require("../../controllers/resident/residentController");

const residentRouter = express.Router();

residentRouter.get("/home", residentAuth, home);

module.exports = residentRouter;
