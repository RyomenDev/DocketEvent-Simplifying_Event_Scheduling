import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginWithGoogle from "./LoginWithGoogle";
import LoginWithEmailPassword from "./LoginWithEmailPassword";

const AuthPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("student"); // Default role set to "student"
  const [isSignUp, setIsSignUp] = useState(false); // Track if the user is in sign-up mode
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userRole = queryParams.get("role");
    if (userRole) {
      setRole(userRole); // Set role if it's passed through the query params
    }
  }, [location]);

  // Handle role selection (Mentor or Student)
  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    navigate(`/login?role=${selectedRole}`); // Update the URL with the selected role
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-6">
        {/* Role Selection */}
        <div className="space-y-4">
          <button
            onClick={() => handleRoleSelection("student")}
            className={`w-full py-3 font-semibold rounded-lg shadow-md transition duration-200 ${
              role === "student"
                ? isSignUp
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {isSignUp ? "Sign Up as Student" : "Login as Student"}
          </button>
          <button
            onClick={() => handleRoleSelection("mentor")}
            className={`w-full py-3 font-semibold rounded-lg shadow-md transition duration-200 ${
              role === "mentor"
                ? isSignUp
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-teal-500 text-white hover:bg-teal-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {isSignUp ? "Sign Up as Mentor" : "Login as Mentor"}
          </button>
        </div>

        {/* Login/Sign Up Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {isSignUp ? "Sign Up" : "Login"} as{" "}
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        {/* Login/Sign Up Options */}
        <div className="space-y-4">
          <LoginWithEmailPassword
            role={role}
            setErrorMessage={setErrorMessage}
            isSignUp={isSignUp}
            setIsSignUp={setIsSignUp}
          />

          {/* Conditionally render LoginWithGoogle based on role */}
          {role !== "mentor" && (
            <LoginWithGoogle role={role} setErrorMessage={setErrorMessage} />
          )}
        </div>

        {/* Toggle between Login and Sign Up */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500 hover:text-blue-600 underline"
          >
            {role === "student" &&
              (isSignUp
                ? "Already have an account? Login here"
                : "Don't have an account? Sign up here")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
