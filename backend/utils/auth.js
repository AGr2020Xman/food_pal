const jwt = require("jsonwebtoken");
require("dotenv").config();

const options = {
  expiresIn: 600000,
};

const createJWT = async (email, userId, name, _id) => {
  try {
    const payload = {
      id: _id,
      email: email,
      name: name,
      userId: userId,
    };
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
