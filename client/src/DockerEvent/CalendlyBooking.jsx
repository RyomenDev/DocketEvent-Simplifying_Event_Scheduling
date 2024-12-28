import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CalendlyBooking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const timeSlots = [
    "9:00 PM - 09:30 PM",
    "09:30 PM - 10:00 PM",
    "10:00 PM - 10:30 PM",
    "10:30 PM - 11:00 PM",
    "11:00 PM - 11:30 PM",
    "11:30 PM - 12:00 PM",
  ];

  const currentDate = new Date(); // Get the current date
  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 14); // Set max date to 14 days from now

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const notify = (date, time) => {
    if (date && time) toast(`Interview scheduled on ${date} at ${time}`);
    else toast(`Please select both a date and a time slot.`);
  };

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      const date = selectedDate.toLocaleDateString();
      const time = selectedTime;
      notify(date, time);
    } else {
      notify();
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center p-4 space-y-4">
        <h2 className="text-2xl font-bold">Select a Date and Time Slot</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            minDate={currentDate} // Disable past dates
            maxDate={maxDate} // Disable dates beyond 14 days
          />
        </div>

        <div className="w-64">
          <select
            value={selectedTime}
            onChange={handleTimeChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="" disabled>
              Select a Time Slot
            </option>
            {Array.isArray(timeSlots) && timeSlots.length > 0 ? (
              timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))
            ) : (
              <option disabled>No available time slots</option>
            )}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Confirm Selection
        </button>

        {selectedDate && selectedTime && (
          <div className="text-center mt-4">
            <p className="text-lg font-medium">
              Selected Date: {selectedDate.toLocaleDateString()}
            </p>
            <p className="text-lg font-medium">
              Selected Time Slot: {selectedTime}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CalendlyBooking;
