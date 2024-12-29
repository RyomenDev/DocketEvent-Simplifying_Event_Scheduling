import axios from "axios";
import conf from "../conf/conf.jsx";
import { handleApiError } from "../utils/handleApiError";
import { getHeaders } from "../utils/authUtils";

// Server base URL
const SERVER_API_URL = conf.SERVER_API_URL;
// const API_URL = `${SERVER_API_URL}/auth`;
const FIREBASE_API_URL = `${SERVER_API_URL}/auth`;

// Function to send Firebase token for login
export const loginWithFirebaseToken = async (
  firebaseToken,
  navigate,
  userRole
) => {
  try {
    const headers = await getHeaders();
    const response = await axios.post(
      `${FIREBASE_API_URL}/login-with-firebase`,
      { userRole },
      {
        headers,
      }
    );
    console.log(response);

    // return response.data;
  } catch (error) {
    // console.error("Error logging in with Firebase token:", error);
    handleApiError(error, navigate);
    // throw error; // Throw the error to handle it in the component
  }
};

// Function for traditional login
// export const LoginUser = async (navigate) => {
//   try {
//     const headers = await getHeaders();
//     const response = await axios.post(
//       `${API_URL}/login`,
//       {},
//       {
//         headers,
//       }
//     );
//     return response.data; // Return the response data
//   } catch (error) {
//     handleApiError(error, navigate); // Handle any API errors
//   }
// };
