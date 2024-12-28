import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js"; // Import the User model to establish the link

const adminSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User schema
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["Super Admin", "Admin"],
      required: true, // Role of the admin, can be "Super Admin" or "Admin"
    },
    permissions: {
      type: [String],
      required: true, // List of permissions for the admin
      enum: [
        "manage_users",
        "view_reports",
        "manage_content",
        "edit_settings",
        "approve_requests",
      ],
      default: ["manage_users"], // Default permission
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

// Index for userId for faster querying
adminSchema.index({ userId: 1 });

export const Admin = mongoose.model("Admin", adminSchema);
