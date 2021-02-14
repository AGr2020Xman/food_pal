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

router.get("/getfood", validateToken, getFood);

router.get("/listitems", validateToken, getListItems);

router.post("/listitems", validateToken, createListItems);

router.put("/listitems", validateToken, updateItems);

router.delete("/listitems", validateToken, deleteItem);

router.delete("/listitems", validateToken, deleteAll);

router.post("/food", addFood);

router.put("/food", updateFood);

module.exports = router;
