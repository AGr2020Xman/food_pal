const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Products = new Schema({
  name: {
    type: String,
    required: true,
  },
  isFresh: {
    type: Boolean,
    required: true,
  },
  canRefrigerate: {
    type: Boolean,
    required: true,
  },
  canFreeze: {
    type: Boolean,
    required: true,
  },
  standardExpiry: {
    type: String,
    required: false,
  },
  fridgeExpiry: {
    type: String,
    required: false,
    default: "1-2 weeks",
  },
  freezerExpiry: {
    type: String,
    required: false,
    default: "2-3 months",
  },
});

const Products = mongoose.model("foods", Products);
module.exports = Products;
