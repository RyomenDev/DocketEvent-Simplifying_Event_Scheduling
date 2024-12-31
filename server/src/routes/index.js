import express from "express";
const router = express.Router();

import authRoutes from "./auth.routes.js";
// import studentRoutes from "./student.routes.js";
import interviewRoutes from "./interview.routes.js";
// import AdminRoutes from "./admin.routes.js";
// import MentorRoutes from "./mentor.routes.js";

router.use("/auth", authRoutes);
// router.use("/student", studentRoutes);
router.use("/interview", interviewRoutes);
// router.use("/admin", AdminRoutes);
// router.use("/mentor", MentorRoutes);

export default router;
