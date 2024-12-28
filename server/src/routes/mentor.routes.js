import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

// import {
//   createPatient,
//   getPatientsByDoctor,
//   //   getPatientById,
//   updatePatient,
//   deletePatient,
// } from "../controllers/patient.controller.js";

// router.post("/patients", verifyToken, createPatient);
// router.get("/patients", verifyToken, getPatientsByDoctor);
// // router.get("/patients/:patientId", verifyToken, getPatientById);
// router.put("/patients/:patientId", verifyToken, updatePatient);
// router.delete("/patients/:patientId", verifyToken, deletePatient);

export default router;
