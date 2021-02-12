const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Schema.statics.bulkInsert = function(models, fn) {
//   if (!models || !models.length) {
//     return fn(null)
//   }

//   const bulk = this.
// }
let ListItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    foodType: {
      type: Schema.Types.ObjectId,
      ref: "foods",
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: false,
      // default: 'See product for details'
    },
    quantity: {
      type: Number,
      required: false,
      default: 1,
    },
    inFridge: {
      type: Boolean,
      required: false,
    },
    inFreezer: {
      type: Boolean,
      required: false,
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

const StoredListItem = mongoose.model("storedlistitem", ListItemSchema);
module.exports = StoredListItem;
