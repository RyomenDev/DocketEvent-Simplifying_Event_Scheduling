import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js"; // Import the User model to establish the link

const mentorSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User schema
      required: true,
      unique: true,
    },
    expertise: {
      type: String,
      required: true, // The area of expertise for the mentor
    },
    yearsOfExperience: {
      type: Number,
      required: true, // The years of experience the mentor has
      min: [0, "Years of experience cannot be negative"],
    },
    availability: {
      type: String,
      enum: ["Full-time", "Part-time", "On-demand"],
      required: true, // Availability of the mentor
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

export const Mentor = mongoose.model("Mentor", mentorSchema);
