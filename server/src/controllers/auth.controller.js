// auth.controller.js
import { User } from "../models/user.model.js";

// Function to filter user data to return only required fields
export const filterUserData = (user) => {
  return {
    name: user.name,
    email: user.email,
    age: user.age,
    gender: user.gender,
    address: user.address,
    phone: user.phone,
    picture: user.picture,
  };
};

// Controller logic to handle user login
export const loginUser = async (req, res) => {
  console.log("login");

  try {
    // Assuming req.user is populated by the verifyToken middleware
    console.log("Protected API accessed by:", req.user.uid);

    const { uid, name, email, picture } = req.user;

    // Check if the user exists in the database
    let user = await User.findOne({ uid });

    // If the user doesn't exist, create a new user
    if (!user) {
      user = new User({ uid, name, email, picture });
      await user.save(); // Save the new user to the database

      return res.status(201).json({
        message: "User created successfully",
        user: filterUserData(user), // Filter user data before sending response
      });
    }

    // If user exists, return the user data
    return res.status(200).json({
      message: "User logged in successfully",
      user: filterUserData(user), // Filter user data before sending response
    });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
