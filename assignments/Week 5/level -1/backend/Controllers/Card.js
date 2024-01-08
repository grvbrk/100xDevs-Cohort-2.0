const { cardModel } = require("../Models/Card");

async function getAllCards(req, res) {
  const cards = await cardModel.find({});
  return res.json({ msg: "Success", cards });
}

async function postOneCard(req, res) {
  const todo = req.body;
  await cardModel.create(todo);
  return res.status(200).json({ msg: "Success", todo });
}

async function deleteOneCard(req, res) {
  const { id: cardId } = req.params;
  const card = await cardModel.findByIdAndDelete({_id: cardId})
  return res.json({ msg: "success", card });
}

module.exports = { getAllCards, postOneCard, deleteOneCard };
