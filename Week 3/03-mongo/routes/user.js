const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
const zod = require("zod");

const userSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  coursePurchased: zod.array(zod.string()),
});

// User Routes
router.post("/signup", async (req, res) => {
  const validateUser = userSchema.safeParse(req.body);
  if (!validateUser.success) {
    throw new Error("Wrong User credentials");
  }
  try {
    await User.create(req.body);
  } catch (error) {
    throw new Error("Error", error);
  }
  return res.json({ message: "User created successfully" });
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
  const { username } = req.headers;
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
  const { username } = req.headers;
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
