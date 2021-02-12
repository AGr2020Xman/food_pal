const express = require("express");
const router = express.Router();
const {} = require("../controllers/auth");
// const cleanBody = require("../controllers/middlewares/cleanbody.js");
const { validateToken } = require("../controllers/middlewares/validateToken");

router.get("getfoods", validateToken, getFood);

router.get("/listitems", validateToken, getListItems);
router.post("/listitems", validateToken, createListItems);
router.put("/listitems/:id", validateToken, updateItems);
router.delete("/listitems/:id", validateToken, deleteItems);

router.delete("/removelist", validateToken, removeList);

module.exports = router;
