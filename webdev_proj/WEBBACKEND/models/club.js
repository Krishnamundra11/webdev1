const mongoose = require("mongoose");

// Club Schema
const clubSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  venue: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true }, // Added date as string for flexibility
  time: { type: String, required: true },
  
  createdAt: { type: Date, default: Date.now },
});

// Export Model
module.exports = mongoose.model("Club", clubSchema);
