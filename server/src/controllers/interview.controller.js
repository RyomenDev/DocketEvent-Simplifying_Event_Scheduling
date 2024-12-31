import { Interview } from "../models/interview.model.js";
import { User } from "../models/user.model.js";

// Helper function to parse date and time to 24-hour format
const parseScheduledDate = (date, time) => {
  const [month, day, year] = date.split("/").map(Number);
  const [timePart, period] = time.split(" ");
  const [hour, minute] = timePart.split(":").map(Number);

  let hour24 = hour;
  if (period.toUpperCase() === "PM" && hour24 !== 12) hour24 += 12;
  if (period.toUpperCase() === "AM" && hour24 === 12) hour24 = 0;

  return new Date(Date.UTC(year, month - 1, day, hour24, minute));
};

// Endpoint for students to schedule an interview
export const InterviewScheduler = async (req, res) => {
  try {
    const { date, time, topic } = req.body.data;
    const studentId = req.user.uid;

    // Find the student by UID
    const student = await User.findOne({ uid: studentId });
    const studentObjId = student._id;

    if (!student || student.userType !== "student") {
      return res.status(400).json({ message: "Invalid student ID or role." });
    }

    // Check if the student already has a scheduled or accepted interview
    const existingInterview = await Interview.findOne({
      student: studentObjId,
      status: { $in: ["Scheduled", "Accepted"] },
    });

    if (existingInterview) {
      console.log(
        "existingInterview",
        existingInterview?.scheduledDate?.toLocaleString()
      );
      return res.status(400).json({
        message: `You already have an interview scheduled or accepted on ${existingInterview?.scheduledDate?.toLocaleString()}`,
      });
    }

    // Parse and format the scheduled date
    const scheduledDate = parseScheduledDate(date, time);

    // Create a new interview instance
    const interview = new Interview({
      student: studentObjId,
      scheduledDate,
      status: "Scheduled",
      notes: topic,
    });

    // Save the interview to the database
    await interview.save();

    // Respond with success
    res
      .status(201)
      .json({ message: "Interview scheduled successfully.", interview });
  } catch (err) {
    console.error("Error scheduling interview:", err);
    res
      .status(500)
      .json({ message: "Error scheduling interview.", error: err.message });
  }
};
