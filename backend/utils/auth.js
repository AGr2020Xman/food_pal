const jwt = require("jsonwebtoken");
require("dotenv").config();

const options = {
  expiresIn: "1h",
};

const createJWT = async (email, userId) => {
  try {
    const payload = { email: email, id: userId };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
    return { error: false, token: token };
  } catch (error) {
    return { error: true };
  }
};

module.exports = { createJWT };

// exports.createJWT = (email, userId, duration) => {
//   const payload = {
//     email,
//     userId,
//     duration,
//   };

//   return jwt.sign(payload, process.env.TOKEN_SECRET, {
//     expiresIn: duration,
//   });
// };
