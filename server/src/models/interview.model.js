import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";

const interviewSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled", "Accepted"],
      default: "Scheduled",
    },
    feedback: {
      type: String,
      required: false,
    },
    notes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster querying by student and mentor
interviewSchema.index({ student: 1, mentor: 1, scheduledDate: 1 });

export const Interview = mongoose.model("Interview", interviewSchema);
