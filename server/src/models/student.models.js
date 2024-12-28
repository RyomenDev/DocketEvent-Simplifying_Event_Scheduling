import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js"; // Import the User model to establish the link

const studentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User schema
      required: true,
      unique: true,
    },
    enrollmentDate: {
      type: Date,
      default: Date.now, // Automatically set the enrollment date to now
    },
    course: {
      type: String,
      required: true, // The course the student is enrolled in
    },
    subscription: {
      type: Boolean,
      required: true,
      default: false, // Default subscription status to false
    },
  },
  {
    timestamps: true,
  }
);


export const Student = mongoose.model("Student", studentSchema);
