const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let FreshSchema = new Schema({
  name: {
    type: String,
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
    type: Number,
    required: true,
  },
  fridgeExpiry: {
    type: Number,
    required: false,
  },
  freezerExpiry: {
    type: Number,
    required: false,
  },
});

const FreshProduce = mongoose.model("freshfood", FreshSchema);
module.exports = FreshProduce;
