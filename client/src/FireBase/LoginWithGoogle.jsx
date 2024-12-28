// LoginWithGoogle.jsx
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase-config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";

const LoginWithGoogle = ({ role, setErrorMessage }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (!user.emailVerified) {
        setErrorMessage("Please verify your email before logging in.");
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          username: user.displayName || "No Name",
          role: role,
        });
      } else if (docSnap.data().role !== role) {
        setErrorMessage("You are not authorized to log in as this role.");
        return;
      }

      setErrorMessage("");
      navigate("/");
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mt-4"
      disabled={loading}
    >
      {loading ? "Logging in..." : "Login with Google"}
    </button>
  );
};

export default LoginWithGoogle;
