const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  activate,
  forgotPassword,
  resetPassword,
  signout,
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
router.get("/profile", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );
  User.findOne({
    _id: decoded._id,
  })
    .then((response) => {
      if (response) {
        res.json(response);
      } else {
        res.status(400).json({ error: "User does not exist" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.get("/allusers", (req, res) => {
  User.find()
    .then((response) => {
      if (response) {
        res.json(response);
      } else {
        res.status(400).json({ error: "Users do not exist" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = router;
