const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ListSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    // collection: "users",
  }
);

const StoredList = mongoose.model("storedlist", ListSchema);
module.exports = StoredList;
