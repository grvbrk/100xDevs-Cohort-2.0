const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const zod = require("zod");
const { Admin, Course } = require("../db/index");

const adminSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const courseSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  price: zod.number(),
  imageLink: zod.string(),
});

// Admin Routes
router.post("/signup", async (req, res) => {
  const validateAdmin = adminSchema.safeParse(req.body);
  if (!validateAdmin.success) {
    throw new Error("Wrong Admin credentials");
  }
  try {
    await Admin.create(req.body);
  } catch (error) {
    throw new Error(error);
  }
  return res.json({ message: "Admin created successfully" });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const validateCourse = courseSchema.safeParse(req.body);
  if (!validateCourse.success) {
    throw new Error("Wrong Course credentials");
  }
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
