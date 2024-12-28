import mongoose, { Schema } from "mongoose";
import { Student } from "./student.model.js"; // Reference to the Student model
import { Mentor } from "./mentor.model.js"; // Reference to the Mentor model

const interviewSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student", // Reference to the Student model
      required: true,
    },
    mentor: {
      type: Schema.Types.ObjectId,
      ref: "Mentor", // Reference to the Mentor model
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: true, // The date and time the interview is scheduled for
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled", // Default status is "Scheduled"
    },
    feedback: {
      type: String,
      required: false, // Feedback after the interview, optional
    },
    notes: {
      type: String,
      required: false, // Additional notes about the interview
    },
    createdAt: {
      type: Date,
      default: Date.now, // When the interview was created
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Index for faster querying by student and mentor
interviewSchema.index({ student: 1, mentor: 1, scheduledDate: 1 });

export const Interview = mongoose.model("Interview", interviewSchema);
