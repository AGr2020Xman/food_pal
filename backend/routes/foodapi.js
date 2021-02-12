const express = require("express");
const router = express.Router();
const {} = require("../controllers/auth");
// const cleanBody = require("../controllers/middlewares/cleanbody.js");
const { validateToken } = require("../controllers/middlewares/validateToken");

router.get("getfoods", validateToken, getFood);
router.get("/storedlist", validateToken, getList);
router.post("/addlist", validateToken, addList);
router.patch("/editlist", validateToken, editList);
router.post("/addfresh", validateToken, addFreshFood);
router.post("/addperish", validateToken, addPerishableFood);
router.patch("/updatefresh", validateToken, activate);
router.patch("/updateperish", validateToken, forgotPassword);
router.delete("/removelist", validateToken, removeList);

module.exports = router;
