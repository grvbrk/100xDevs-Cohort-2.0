require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../db/index");

async function userMiddleware(req, res, next) {
  const validationHeader = req.headers.authorization;
  const token = validationHeader.split(" ")[1];

  try {
    const verify = jwt.verify(token, process.env.JWT_KEY);
    const { username } = verify;
    const user = await User.findOne({ username });
    if (!user) return res.json({ msg: "Please signup first" });
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    throw new Error("Invalid token");
  }
}

module.exports = userMiddleware;
