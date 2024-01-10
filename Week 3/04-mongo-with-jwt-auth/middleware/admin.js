require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Admin } = require("../db/index");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  const validationHeader = req.headers.authorization;
  const token = validationHeader.split(" ")[1];

  try {
    const verify = jwt.verify(token, process.env.JWT_KEY);
    console.log(verify);
    const { username } = verify;
    const foundAdmin = await Admin.findOne({ username });
    if (!foundAdmin) return res.json({ msg: "Not an admin" });
    next();
  } catch (error) {
    throw new Error("Invalid token");
  }
}

module.exports = adminMiddleware;
