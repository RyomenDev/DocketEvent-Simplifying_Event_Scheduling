import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { InterviewScheduler } from "../controllers/interview.controller.js";

const router = express.Router();

// Protected Route - Login Route
router.post("/schedule", verifyToken, InterviewScheduler);

export default router;
