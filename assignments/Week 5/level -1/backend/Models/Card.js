const mongoose = require("mongoose");

// List of schemas

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide name"],
    trim: true,
    maxlength: [20, "Title can not be more than 20 characters"],
  },
  desc: {
    type: String,
    required: [true],
    maxlength: [200],
  },
  socials: Array,
  interests: Array,
});

//List of models
const cardModel = mongoose.model("Card", cardSchema);

module.exports = { cardModel };
