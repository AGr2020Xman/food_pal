const Products = require("../models/Products");

exports.getFood = async (req, res) => {
  try {
    const products = await Products.find(); // returns arr of obj
    return res.status(200).json({
      success: true,
      message: "Products received",
      products: products,
    });
  } catch (err) {
    console.log("getFood", err);
  }
};

exports.addFood = async (req, res) => {
  try {
    const item = req.body;
    const food = await Products.findOne({ name: item.name });

    if (food) {
      return res.status(422).json({
        errors: true,
        message: "item already exists",
      });
    }

    const newFood = new Products({
      name: item.name,
      isFresh: item.isFresh,
      canRefrigerate: item.canRefrigerate,
      canFreeze: item.canFreeze,
      standardShelfLife: item.standardShelfLife,
      fridgeExpiry: item.fridgeExpiry,
      freezerExpiry: item.freezerExpiry,
    });
    await newFood.save();
  } catch (error) {
    console.error("adding new item error", error);
    return res.status(400).json({
      error: true,
      message: "Error adding item",
    });
  }
  return res.status(200).json({
    success: true,
    message: `Add of ${req.body.name} successful`,
  });
};

exports.updateFood = async (req, res) => {};
