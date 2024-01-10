const { Router } = require("express");
const { User, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post("/signup", async (req, res) => {
  try {
    await User.create(req.body);
  } catch (error) {
    throw new Error("Error", error);
  }
  return res.json({ message: "User created successfully" });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.json({ message: "No user found" });
    const token = jwt.sign({ username, password }, process.env.JWT_KEY);
    return res.json({ message: "Successfully signed in", token });
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/courses", async (req, res) => {
  try {
    const courseList = await Course.find({});
    return res.json({ courses: [courseList] });
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const { username } = req.user;
  const { courseId } = req.params;
  try {
    const user = await User.findOneAndUpdate(
      { username },
      { $push: { coursePurchased: courseId } },
      { new: true }
    );
    return res.json({ message: "Course purchased successfully" });
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const { username } = req.user;
  try {
    const user = await User.find({ username });
    let valuesToMatch = user[0].coursePurchased;
    const purchasedCourses = await Course.find({
      _id: { $in: valuesToMatch },
    });
    return res.json({ purchasedCourses });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
