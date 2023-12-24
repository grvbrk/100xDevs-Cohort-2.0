const { Router } = require("express");
const { Admin, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const router = Router();
require("dotenv").config();

// Admin Routes
router.post("/signup", async (req, res) => {
  try {
    await Admin.create(req.body);
  } catch (error) {
    throw new Error(error);
  }
  return res.json({ message: "Admin created successfully" });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.json({ message: "No admin found" });
    const token = jwt.sign({ username, password }, process.env.JWT_KEY);
    return res.json({ message: "Successfully signed in", token });
  } catch (error) {
    throw new Error("No admin found in catch block");
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  try {
    const newCourse = { ...req.body, published: true };
    await Course.create(newCourse);
    return res.json({
      message: "Course created successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  try {
    const courseList = await Course.find({});
    return res.json({ courses: [courseList] });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
