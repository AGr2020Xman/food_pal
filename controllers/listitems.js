const StoredFood = require("../models/StoredFood");
// const { v4: uuid } = require("uuid");
// const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

exports.getListItems = async (req, res) => {
  try {
    // console.log("WHERE IS _ID FROM USER", req.decoded);
    const { _id } = req.decoded;
    const listItems = await StoredFood.find({ ownerId: _id });
    return res.status(200).json({
      success: true,
      message: "List items retrieved",
      listArray: listItems,
    });
  } catch (err) {
    console.log("error in getList", err);
  }
};

exports.createListItems = async (req, res) => {
  try {
    const { _id } = req.decoded;

    const bulk = req.body;
    console.log("pre creating list items", bulk);
    try {
      bulk.forEach((b) => {
        StoredFood.findOneAndUpdate(
          { existsId: b.existsId },
          b,
          {
            upsert: true,
          },
          (err) => {
            if (err) console.log("Error saving", err);
          }
        );
        // StoredFood.insertMany(bulk, { ordered: false });
      });
    } catch (err) {}
    return res.status(200).json({
      success: true,
      message: "List items saved",
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      message: err,
    });
  }
};

exports.updateItems = async (req, res) => {
  const bulk = req.body; //array of objects
  try {
    bulk.forEach((listObj) => {
      let filter = { existsId: listObj.existsId };
      let update = listObj;
      StoredFood.findOneAndUpdate(filter, update);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: true,
      message: err,
    });
  }
  return res.status(200).json({ success: true, message: "List items updated" });
};

exports.deleteItem = async (req, res) => {
  const existsId = req.body.existsId; // or req.body.data._id
  StoredFood.findOneAndDelete({ existsId: existsId }, (err) => {
    if (err) console.log(err);
    console.log("Successful deletion");
  });
  return res.status(200).json({
    success: true,
    message: `Successful delete`,
  });
};

exports.deleteAll = async (req, res) => {
  console.log("body delete all", req.body);
  const { _id } = req.decoded;
  console.log("id", _id);
  try {
    const _id = req.decoded._id; // or req.body.data._id
    StoredFood.deleteMany({ ownerId: _id }, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`List items belonging to ${_id} are deleted`);
      }
    });
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({
    success: true,
    message: "Users list deleted",
  });
};
