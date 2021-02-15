const Products = require("../models/Products");
const StoredFood = require("../models/StoredFood");
// const { v4: uuid } = require("uuid");
// const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

exports.getFood = async (req, res) => {
  try {
    const products = await Products.find(); // returns arr of obj
    console.log("INSIDE GET FOOD");
    return res.status(200).json({
      success: true,
      message: "Products received",
      products: products,
    });
  } catch (err) {
    console.log("getFood", err);
  }
};

exports.getListItems = async (req, res) => {
  try {
    console.log("WHERE IS _ID FROM USER", req.decoded);
    const { _id } = req.decoded;
    const listItems = await StoredFood.find({ owner: _id }); // may need to filter query down to also find just the name of the list it belongs to
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
    console.log(req);
    // console.log(req.decoded);
    const { _id } = req.decoded;

    const bulk = req.body;
    console.log("pre creating list items", req.body);
    const alreadyExistingItems = await StoredFood.find({ owner: _id }); //arr of obj

    if (!alreadyExistingItems.length) {
      await StoredFood.insertMany(bulk)
        .then(() => {
          console.log("Success");
          return res.status(200).json({
            success: true,
            message: "List items saved",
          });
        })
        .catch((err) => {
          console.log("insert filtered result", err);
          res.status(400).json({
            error: true,
            message: err,
          });
        });
    } else {
      console.log("already exists array", alreadyExistingItems);
      //two arrays - bulk && alreadyExistingItems
      const delineater = ["existsId"];

      const result = await bulk
        .filter((o1) => {
          return !alreadyExistingItems.some((o2) => {
            return o1.existsId === o2.existsId;
          });
        })
        .map((o) => {
          return delineater.reduce((newO, existsId) => {
            newO[existsId] = o[existsId];
            return newO;
          }, {});
        });

      await StoredFood.insertMany(result)
        .then(() => {
          console.log("Success");
          return res.status(200).json({
            success: true,
            message: "List items saved",
          });
        })
        .catch((err) => {
          console.log("insert filtered result", err);
          res.status(400).json({
            error: true,
            message: err,
          });
        });

      await bulk
        .forEach((listObj) => {
          let filter = { existsId: listObj.existsId };
          let update = listObj;
          StoredFood.findOneAndUpdate(filter, update);
        }) // <filter>, <update>
        .then(() => {
          console.log("Success");
          return res.status(200).json({
            success: true,
            message: "List items saved",
          });
        })
        .catch((err) => {
          console.log("update bulk req.body", err);
          res.status(400).json({
            error: true,
            message: err,
          });
        });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateItems = async (req, res) => {
  const bulk = req.body; //array of objects

  bulk
    .forEach((listObj) => {
      let filter = { existsId: listObj.existsId };
      let update = listObj;
      StoredFood.findOneAndUpdate(filter, update);
    })
    .then(() => {
      console.log("Success");
      return res
        .status(200)
        .json({ success: true, message: "List items updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: true,
        message: err,
      });
    });
};

exports.deleteItem = async (req, res) => {
  console.log(req.body);
  const existsId = req.body.existsId; // or req.body.data._id
  StoredFood.findByIdAndDelete(existsId, (err) => {
    if (err) {
      console.log(`Successful delete of ${existsId}`);
    }
  });
};

exports.deleteAll = async (req, res) => {
  console.log(req.body);
  // const { _id } = req.decoded;
  const _id = req.body._id; // or req.body.data._id
  StoredFood.deleteMany({ owner: _id }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`List items belonging to ${_id} are deleted`);
    }
  });
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

    return res.status(200).json({
      success: true,
      message: "Add successful",
    });
  } catch (error) {
    console.error("adding new item error", error);
    return res.status(400).json({
      error: true,
      message: "Error adding item",
    });
  }
};

exports.updateFood = async (req, res) => {};
