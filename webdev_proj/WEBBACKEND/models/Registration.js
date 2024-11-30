const mongoose = require('mongoose');

// Define Registration Schema
const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  batchDetails: { type: String, required: true },
  enrollmentNumber: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  collegeEmail: { type: String, required: true },
  statementOfPurpose: { type: String, required: true },
  participationReason: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Export the Model
module.exports = mongoose.model('Registration', registrationSchema);
