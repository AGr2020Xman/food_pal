const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let FactSchema = new Schema({
  description: {
    type: String,
    required: true,
    unique: true,
  },
});

const Facts = mongoose.model("funfacts", FactSchema);
module.exports = Facts;
