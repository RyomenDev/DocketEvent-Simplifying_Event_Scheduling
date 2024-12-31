import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Toast from "../utils/toaster";
import { scheduleInterview } from "../api/index";
import { useNavigate } from "react-router-dom";

const CalendlyBooking = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [topic, setTopic] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("default");

  const timeSlots = [
    "9:00 PM - 09:30 PM",
    "09:30 PM - 10:00 PM",
    "10:00 PM - 10:30 PM",
    "10:30 PM - 11:00 PM",
    "11:00 PM - 11:30 PM",
    "11:30 PM - 12:00 PM",
  ];

  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 14);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleSubmit = async () => {
    if (selectedDate && selectedTime && topic.trim()) {
      const data = {
        date: selectedDate.toLocaleDateString(),
        time: selectedTime,
        topic,
      };
      try {
        await scheduleInterview(data, navigate, setToastMessage, setToastType);
        setToastMessage("Interview successfully scheduled.");
        setToastType("success");
      } catch (error) {
        // The error message is already set by handleApiError
      }
    } else {
      setToastMessage("Please select a date, time slot, and enter a topic.");
      setToastType("warning");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-8 py-8 px-4 sm:px-8">
        {/* Left Section - Interview Options (Stacked on top for small/medium screens) */}
        <div className="flex flex-col items-start w-full sm:w-1/3 p-6 bg-white shadow-lg rounded-lg space-y-6">
          <h2 className="text-3xl font-semibold text-gray-700">
            Interview Options
          </h2>
          <input
            type="text"
            value={topic}
            onChange={handleTopicChange}
            placeholder="Enter Topic"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Right Section - Date and Time Picker */}
        <div className="flex flex-col items-center w-full sm:w-1/2 p-6 bg-white shadow-lg rounded-lg space-y-6">
          <h2 className="text-3xl font-semibold text-gray-700">
            Select a Date and Time Slot
          </h2>

          {/* Calendar Component */}
          <div className="bg-white shadow-md rounded-lg p-4 m-4">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              minDate={currentDate}
              maxDate={maxDate}
            />
          </div>

          {/* Time Slot Selection */}
          <div className="w-full">
            <select
              value={selectedTime}
              onChange={handleTimeChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mt-4"
            >
              <option value="" disabled>
                Select a Time Slot
              </option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleSubmit}
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 mt-6"
          >
            Confirm Selection
          </button>

          {/* Confirmation Info */}
          {selectedDate && selectedTime && topic && (
            <div className="text-center mt-6 text-lg font-medium text-gray-600">
              <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
              <p>Selected Time Slot: {selectedTime}</p>
              <p>Topic: {topic}</p>
            </div>
          )}
        </div>
      </div>

      {/* Show the Toast component */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          setToastMessage={setToastMessage}
        />
      )}
    </>
  );
};

export default CalendlyBooking;
