import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { handleApiError } from "../utils/handleApiError";

const LoginWithEmailPassword = ({
  role,
  setErrorMessage,
  isSignUp,
  setIsSignUp,
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuthError = (error) => {
    console.error("Authentication error:", error); // Log the error object for debugging
    if (error.code === "auth/email-already-in-use") {
      setErrorMessage("This email is already in use. Please try logging in.");
    } else if (error.code === "auth/weak-password") {
      setErrorMessage("Password should be at least 6 characters.");
    } else if (error.code === "auth/user-not-found") {
      setErrorMessage("No account found with this email.");
    } else if (error.code === "auth/wrong-password") {
      setErrorMessage("Incorrect password. Please try again.");
    } else {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);
    console.log("Login attempt for email:", email);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Logged in user:", user);
      //    const userData = await LoginUser(token, navigate);
      //    dispatch(authLogin(userData?.user));

      if (!user.emailVerified) {
        setErrorMessage("Please verify your email before logging in.");
        return;
      }
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;
    const userRole = role;

    console.log("Sign-up attempt for email:", email);

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed up:", user);

      // Set user profile details like username
      await updateProfile(user, { displayName: username });
      console.log("User profile updated with username:", username);
      setErrorMessage("");
      setIsSignUp(false); // Switch back to login after successful signup
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={isSignUp ? handleSignUp : handleLogin}
      className="space-y-4"
    >
      {isSignUp && (
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        required
      />
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
        disabled={loading}
      >
        {loading
          ? isSignUp
            ? "Signing up..."
            : "Logging in..."
          : isSignUp
          ? "Sign Up"
          : "Login"}
      </button>
    </form>
  );
};

export default LoginWithEmailPassword;
