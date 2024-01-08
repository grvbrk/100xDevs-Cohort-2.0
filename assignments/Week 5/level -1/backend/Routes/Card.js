const express = require("express");
const { getAllCards, postOneCard, deleteOneCard, patchOneCard } = require("../Controllers/Card");
const CardRouter = express.Router();

CardRouter.route("/card").get(getAllCards).post(postOneCard)
CardRouter.route("/card/:id").delete(deleteOneCard).patch(patchOneCard)

module.exports = { CardRouter };
