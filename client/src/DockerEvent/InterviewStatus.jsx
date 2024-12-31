import { useEffect, useState } from "react";
import { getUserInterviews } from "../api/index"; // Replace with the actual API function
import { useNavigate } from "react-router-dom";

const InterviewStatus = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user interviews when the component mounts
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        // Replace with an API call to fetch interviews for the logged-in user
        const data = await getUserInterviews(); // The function should return interview data
        setInterviews(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching interview data");
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const handleReschedule = (interviewId) => {
    // Navigate to the interview reschedule page (or provide functionality for rescheduling)
    navigate(`/reschedule/${interviewId}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">
        Your Interviews
      </h2>

      {loading ? (
        <div className="text-center text-lg text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-lg text-red-600">{error}</div>
      ) : interviews.length === 0 ? (
        <div className="text-center text-lg text-gray-600">
          You have no upcoming interviews.
        </div>
      ) : (
        <div className="space-y-6">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="p-4 border border-gray-300 rounded-lg flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <div className="flex flex-col sm:w-1/3">
                <p className="font-medium text-gray-700">
                  Topic: {interview.topic}
                </p>
                <p className="text-gray-600">
                  Date: {new Date(interview.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">Time: {interview.time}</p>
              </div>
              <div className="flex flex-col sm:w-1/2">
                <p className="text-gray-600">Status: {interview.status}</p>
                {interview.status === "Scheduled" && (
                  <button
                    onClick={() => handleReschedule(interview.id)}
                    className="mt-2 px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300"
                  >
                    Reschedule
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewStatus;
