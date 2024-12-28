import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    picture: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      required: false,
      min: [0, "Age must be a positive number"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: false,
      default: null, // Default to null if not provided
    },
    address: {
      type: String,
      required: false,
      default: null, // Default to null if not provided
    },
    phone: {
      type: String,
      required: false, // Optional phone number field
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
      default: null, // Default to null if not provided
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);

// Subscription: {
//       type: Boolean,
//       required: true,
//       default: false,
//     },