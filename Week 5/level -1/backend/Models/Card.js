const mongoose = require("mongoose");

// List of schemas

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  desc: {
    type: String,
    required: [true],
  },
  socials: Array,
  interests: Array,
});

//List of models
const cardModel = mongoose.model("Card", cardSchema);

module.exports = { cardModel };
