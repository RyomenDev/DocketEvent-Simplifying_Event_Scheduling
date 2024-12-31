import axios from "axios";
import conf from "../conf/conf.jsx";
import { handleApiError } from "../utils/handleInterviewApiError.jsx";
import { getHeaders } from "../utils/authUtils";
import { refreshToken } from "../FireBase/RefreshIdToken";

// Constants for API URL
const SERVER_API_URL = conf.SERVER_API_URL;
const INTERVIEW_URL = `${SERVER_API_URL}/interview`;

const scheduleInterview = async (
  data,
  navigate,
  setToastMessage,
  setToastType
) => {
  let attempt = 0;
  const maxRetries = 3;

  let headers = await getHeaders();

  // Function to send the interview schedule request
  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `${INTERVIEW_URL}/schedule`,
        { data },
        { headers }
      );
      console.log("Interview scheduled:", response);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401 && attempt < maxRetries) {
        console.log(`Token expired. Retrying... Attempt ${attempt + 1}`);
        attempt++;

        const newToken = await refreshToken();
        if (newToken) {
          headers.Authorization = `Bearer ${newToken}`;
          return sendRequest(); // Retry the request
        }
      }

      handleApiError(error, setToastMessage, setToastType);
      throw error;
    }
  };

  return sendRequest(); // Initial request attempt
};

const getUserInterviews = async () => {
  let attempt = 0;
  const maxRetries = 3;

  // Get initial headers for the request
  let headers = await getHeaders();

  // Function to send the get interviews request
  const sendRequest = async () => {
    try {
      const response = await axios.get(`${INTERVIEW_URL}/scheduled`, {
        headers,
      });
      return response.data;
    } catch (error) {
      // Retry logic for token expiration or other errors
      if (error.response?.status === 401 && attempt < maxRetries) {
        console.log(
          `Token expired or error occurred. Retrying... Attempt ${attempt + 1}`
        );
        attempt++;

        // Refresh the token if needed
        const newToken = await refreshToken();
        if (newToken) {
          headers.Authorization = `Bearer ${newToken}`;
          return sendRequest(); // Retry the request
        }
      }

      handleApiError(error);
      throw new Error("Error fetching interviews");
    }
  };

  return sendRequest();
};

export  {
  scheduleInterview,
  getUserInterviews,
};
