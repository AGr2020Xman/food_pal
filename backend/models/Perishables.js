const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let PerishableSchema = new Schema({
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

const Perishables = mongoose.model("perishablefood", PerishableSchema);
module.exports = Perishables;
