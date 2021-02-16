const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  activate,
  forgotPassword,
  resetPassword,
  signout,
  getUser,
  getUsers,
} = require("../controllers/auth");
const cleanBody = require("../controllers/middlewares/cleanbody.js");
const { validateToken } = require("../controllers/middlewares/validateToken");

router.post("/signup", cleanBody, signup);
router.post("/signin", cleanBody, signin);
router.patch("/activate", cleanBody, activate);
router.patch("/forgot", cleanBody, forgotPassword);
router.patch("/reset", cleanBody, resetPassword);
router.get("/signout", validateToken, signout);
router.get("/secret", validateToken, (req, res) => {
  res.status(200).json({ message: "the password is potato" });
  console.log(req);
});
router.get("/ping", (req, res) => {
  return res.send({
    error: false,
    message: "Server is healthy",
  });
});
router.get("/profile", getUser);

router.get("/allusers", getUsers);

module.exports = router;
