const Registration = require("../models/Registration");

// Create Registration
const registerUser = async (req, res) => {
  try {
    console.log("Incoming Request Body:", req.body); // Debugging line

    const { name, batchDetails, enrollmentNumber, mobileNumber, collegeEmail, statementOfPurpose, participationReason } = req.body;

    if (!name || !batchDetails || !enrollmentNumber || !mobileNumber || !collegeEmail || !statementOfPurpose || !participationReason) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newRegistration = new Registration({
      name,
      batchDetails,
      enrollmentNumber,
      mobileNumber,
      collegeEmail,
      statementOfPurpose,
      participationReason,
    });
    await newRegistration.save();
    res.status(201).json({ success: true, message: "Registration successful", data: newRegistration });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ success: false, message: "Error registering user", error: error.message });
  }
};


// Fetch All Registrations
const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).json({ success: true, message: "Registrations fetched successfully", data: registrations });
  } catch (error) {
    console.error("Error fetching registrations:", error.message);
    res.status(500).json({ success: false, message: "Error fetching registrations", error: error.message });
  }
};

module.exports = { registerUser, getAllRegistrations };
