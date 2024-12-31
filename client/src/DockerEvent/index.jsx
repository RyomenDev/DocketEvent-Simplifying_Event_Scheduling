import CalendlyBooking from "./CalendlyBooking";
import InterviewStatus from "./InterviewStatus";

const DockerEvent = () => {
  return (
    <>
    <InterviewStatus/>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg w-full p-6">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
            Book a Interview
          </h1>
          <p className="text-center text-gray-700 mb-6">
            Schedule a convenient time for your Docker event discussion. Choose
            from the available time slots below.
          </p>
          <div className="flex justify-center">
            <CalendlyBooking /> {/* timeslots={timeslots} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DockerEvent;
