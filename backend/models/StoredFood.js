const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Schema.statics.bulkInsert = function(models, fn) {
//   if (!models || !models.length) {
//     return fn(null)
//   }
// name (list name), owner (from req.decoded._id), 
//   const bulk = this.
// }
let ListItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      ref: 'users',
    },
    foodDetails: {
      type: Schema.Types.ObjectId,
      ref: "foods", // food details from foods model
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
