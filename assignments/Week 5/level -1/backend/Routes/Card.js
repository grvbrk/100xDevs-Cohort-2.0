const express = require("express");
const { getAllCards, postOneCard } = require("../Controllers/Card");
const CardRouter = express.Router();

CardRouter.route("/card").get(getAllCards).post(postOneCard)

module.exports = { CardRouter };
