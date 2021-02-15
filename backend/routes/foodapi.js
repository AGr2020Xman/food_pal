const express = require("express");
const router = express.Router();
const {
  getFood,
  getListItems,
  createListItems,
  updateItems,
  deleteItem,
  deleteAll,
  addFood,
  updateFood,
} = require("../controllers/product");
// const cleanBody = require("../controllers/middlewares/cleanbody.js");
const { validateToken } = require("../controllers/middlewares/validateToken");

router.get("/food", getFood);

router.get("/listitems", getListItems);

router.post("/listitems", createListItems);

router.put("/listitems", updateItems);

router.delete("/listitems", deleteItem);

router.delete("/listitems", deleteAll);

router.post("/food", addFood);

router.put("/food", updateFood);

module.exports = router;
