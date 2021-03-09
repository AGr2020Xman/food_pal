const express = require("express");
const router = express.Router();
const {
  getListItems,
  createListItems,
  updateItems,
  deleteItem,
  deleteAll,
} = require("../controllers/listitems");
const { getFood, addFood, updateFood } = require("../controllers/food");
// const cleanBody = require("../controllers/middlewares/cleanbody.js");
const { validateToken } = require("../controllers/middlewares/validateToken");

router.get("/food", validateToken, getFood);

router.get("/listitems", validateToken, getListItems);

router.post("/listitems", validateToken, createListItems);

router.put("/listitems", validateToken, updateItems);

router.delete("/listitems", validateToken, deleteItem);

router.delete("/listitems", validateToken, deleteAll);

router.post("/food", addFood);

router.put("/food", updateFood);

module.exports = router;
