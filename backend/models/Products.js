const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  standardShelfLife: {
    type: Number,
    required: true,
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

const Products = mongoose.model("foods", ProductSchema);
module.exports = Products;
