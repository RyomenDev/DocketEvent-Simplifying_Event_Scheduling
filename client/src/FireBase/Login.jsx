import { loginWithFirebaseToken } from "../api";
import { login as authLogin } from "../store/authSlice";
import { handleApiError } from "../utils/handleApiError";

export const loginUser = async (
  firebase_Token,
  dispatch,
  navigate,
  setErrorMessage,
  userRole
) => {
  try {
    if (!firebase_Token) {
      setErrorMessage("Firebase token is required.");
      return;
    }

    // Call the API to authenticate with the Firebase token
    const data = await loginWithFirebaseToken(
      firebase_Token,
      navigate,
      userRole
    );

    if (data && data.user) {
      console.log(data);

      // Dispatch login action to Redux
      //   dispatch(authLogin(data.user));

      //   // Store user data in localStorage
      //   localStorage.setItem("user", JSON.stringify(data.user));
      //   localStorage.setItem("token", data.token);

      //   // Navigate to home or dashboard
      //   navigate("/");
    } else {
      setErrorMessage("Failed to login.");
    }
  } catch (error) {
    setErrorMessage("An error occurred during login. Please try again.");
  }
};