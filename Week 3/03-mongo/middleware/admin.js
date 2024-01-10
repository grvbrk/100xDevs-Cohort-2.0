const { Admin } = require("../db/index");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  const { username, password } = req.headers;
  try {
    const foundAdmin = await Admin.find({ username, password });
    if (!foundAdmin) return res.json({ msg: "Not an admin" });
    next();
  } catch (error) {
    throw new Error("Something went wrong with adminMiddleware");
  }

  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
}

module.exports = adminMiddleware;
