import { useState } from "react";
import {
  auth,
  googleProvider,
  db,
  //   microsoftProvider,
  //   twitterProvider,
  //   githubProvider,
} from "./firebase-config"; // Ensure correct imports
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
// import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      //   console.log(user);

      await updateProfile(user, { displayName: username });
      // Send email verification after user signs up
      await sendEmailVerification(user);

      //   await setDoc(doc(db, "users", user.uid), {
      //     email: user.email,
      //     username: username,
      //   });
      console.log("Sign up successful. Verification email sent.");
      setErrorMessage("");
    } catch (error) {
      //   console.error("Error during sign up:", error);
      handleAuthError(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Check if the user's email is verified
      if (!user.emailVerified) {
        setErrorMessage("Please verify your email before logging in.");
        return; // Stop further login if email is not verified
      }

      console.log("Login successful.", user);
      // Retrieve user details from Firestore
      //   const docRef = doc(db, "users", user.uid);
      //   const docSnap = await getDoc(docRef);

      //   if (docSnap.exists()) {
      //     console.log("User details:", docSnap.data());
      //   } else {
      //     console.log("No additional details found.");
      //   }
      setErrorMessage("");
    } catch (error) {
      //   console.error("Error during login:", error);
      handleAuthError(error);
    }
  };

  const handleAuthError = (error) => {
    if (error.code === "auth/email-already-in-use") {
      setErrorMessage("This email is already in use. Please try logging in.");
    } else if (error.code === "auth/weak-password") {
      setErrorMessage("Password should be at least 6 characters.");
    } else if (error.code === "auth/password-does-not-meet-requirements") {
      setErrorMessage(
        "Password must be at least 8 characters, contain both uppercase and lowercase letters, and include at least one special character."
      );
    } else if (error.code === "auth/user-not-found") {
      setErrorMessage("No account found with this email.");
    } else if (error.code === "auth/wrong-password") {
      setErrorMessage("Incorrect password. Please try again.");
    } else {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if the user's email is verified
      if (!user.emailVerified) {
        setErrorMessage("Please verify your email before logging in.");
        return;
      }

      console.log("Google Login successful.", user);
    } catch (error) {
      console.error("Error during Google login:", error);
      setErrorMessage(
        "An error occurred during Google login. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
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
            className={`w-full px-4 py-2 text-white ${
              isSignUp
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            } rounded-lg`}
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="w-full px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg mt-4"
        >
          Login with Google
        </button>
        {/* 
        <button onClick={() => handleLogin(microsoftProvider)} className="...">
          Login with Microsoft
        </button>
        <button onClick={() => handleLogin(twitterProvider)} className="...">
          Login with Twitter
        </button>
        <button onClick={() => handleLogin(githubProvider)} className="...">
          Login with GitHub
        </button>
        */}
        <p className="text-center mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMessage(""); // Clear error messages when toggling
            }}
            className="text-blue-500 underline"
          >
            {isSignUp ? "Login here" : "Sign up here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
