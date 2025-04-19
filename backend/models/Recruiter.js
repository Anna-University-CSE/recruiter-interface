const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  companyName: String, // Equivalent to "company" in your sample
  companyWebsite: String,
  phone: String,
  linkedin: String,
  role: String, // Added
  profile_picture: String, // Added
  domainVerified: Boolean,
  is_active: { type: Boolean, default: true }, // Added
  createdAt: { type: Date, default: Date.now }, // Equivalent to "date_created"
  last_login: Date // Added
});

module.exports = mongoose.model("Recruiter", recruiterSchema);
