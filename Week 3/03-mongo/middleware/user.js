const { User } = require("../db/index");

async function userMiddleware(req, res, next) {
  const { username, password } = req.headers;
  try {
    const foundUser = await User.find({ username, password });
    if (!foundUser) return res.json({ msg: "Not a user" });
    next();
  } catch (error) {
    throw new Error("Something went wrong with userMiddleware");
  }
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
}

module.exports = userMiddleware;
