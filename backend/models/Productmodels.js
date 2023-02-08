const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  addedon: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", ProductSchema);
