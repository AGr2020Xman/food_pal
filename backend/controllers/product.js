import Products from "../models/Products";
import StoredFood from "../models/StoredFood";
// import Perishables from "../modles/Perishables";
// const Joi = require("joi");
// const { v4: uuid } = require("uuid");
// const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

exports.getFood = async (req, res) => {
  try {
    const products = await Products.find(); // returns arr of obj

    return res.status(200).json({products});
  } catch (err) {
    console.log(err);
  }
};
exports.getListItems = async (req, res) => {
  try {
    const { _id } = req.decoded;
    const listItems = await StoredFood.find({ owner: _id })// may need to filter query down to also find just the name of the list it belongs to
    return res.status(200).json({listItems})
  } catch (err) {
      console.log(err);
  }
};

exports.createListItems = async (req, res) => {
    try {
        const bulk = req.body
        StoredFood.insertMany(bulk).then(() => {
          console.log('Success');
          return res.status(200).json({
            success: true,
            message: 'List items saved'
          })
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({
          error: true,
          message: err
        })
    }
};

exports.updateItems = async (req, res) => {
  try {

  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: true,
      message: err
    })
  }
}
router.put("/listitems/:id", validateToken, updateItems)
router.delete("/listitems/:id", validateToken, deleteItems)


router.delete("/removelist", validateToken, removeList);

exports.createListItems = async (req, res) => {};
exports.addFreshFood = async (req, res) => {};
exports.addPerishableFood = async (req, res) => {};
exports.updateFresh = async (req, res) => {};
exports.updatePerish = async (req, res) => {};
exports.removeList = async (req, res) => {};

exports.addFreshFood = async (req, res) => {
  try {
    const freshFood = await Products.findOne({ name: req.body.name });

    if (freshFood) {
      return res.status(422).json({
        errors: true,
        message: "item already exists",
      });
    }
    // name: {
    //     type: String,
    //     required: true,
    //   },
    //   canRefrigerate: {
    //     type: Boolean,
    //     required: true,
    //   },
    //   canFreeze: {
    //     type: Boolean,
    //     required: true,
    //   },
    //   standardExpiry: {
    //     type: Number,
    //     required: true,
    //   },
    //   fridgeExpiry: {
    //     type: Number,
    //     required: false,
    //   },
    //   freezerExpiry: {
    //     type: Number,
    //     required: false,
    //   },
    const newFood = new User({
      name: req.body.name,
      canRefrigerate: req.body.canRefrigerate,
      canFreeze: req.body.canFreeze,
      standardExpiry: req.body.standardExpiry,
      fridgeExpiry: req.body.fridgeExpiry,
      freezerExpiry: req.body.freezerExpiry,
    });
    await newFood.save();

    return res.status(200).json({
      success: true,
      message: "Add successful",
    });
  } catch (error) {
    console.error("adding new item error", error);
    return res.status(500).json({
      error: true,
      message: "Error adding item",
    });
  }
};

exports.addPerishableFood = async (req, res) => {
  try {
    const perishableFood = await FreshProduce.findOne({ name: req.body.name });

    if (freshFood) {
      return res.status(422).json({
        errors: true,
        message: "item already exists",
      });
    }
    // name: {
    //     type: String,
    //     required: true,
    //   },
    //   canRefrigerate: {
    //     type: Boolean,
    //     required: true,
    //   },
    //   canFreeze: {
    //     type: Boolean,
    //     required: true,
    //   },
    //   standardExpiry: {
    //     type: Number,
    //     required: true,
    //   },
    //   fridgeExpiry: {
    //     type: Number,
    //     required: false,
    //   },
    //   freezerExpiry: {
    //     type: Number,
    //     required: false,
    //   },
    const newFood = new User({
      name: req.body.name,
      canRefrigerate: req.body.canRefrigerate,
      canFreeze: req.body.canFreeze,
      standardExpiry: req.body.standardExpiry,
      fridgeExpiry: req.body.fridgeExpiry,
      freezerExpiry: req.body.freezerExpiry,
    });
    await newFood.save();

    return res.status(200).json({
      success: true,
      message: "Add successful",
    });
  } catch (error) {
    console.error("adding new item error", error);
    return res.status(500).json({
      error: true,
      message: "Error adding item",
    });
  }
};

exports.updateFood = () => {};
