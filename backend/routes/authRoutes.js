const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Recruiter = require("../models/Recruiter");
const verifyDomain = require("../utils/whoisValidator");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, companyName, companyWebsite, phone, role } = req.body;
    
    // Check for required fields
    if (!name || !email || !password || !companyName) {
      return res.status(400).json({ 
        msg: "Please provide all required fields: name, email, password, and company name" 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Please provide a valid email address" });
    }
    
    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ msg: "Password must be at least 8 characters long" });
    }
    
    // Check if email already exists
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ msg: "Email already registered" });
    }
    
    // Optional domain verification
    let domainVerified = false;
    if (companyWebsite) {
      try {
        const domain = new URL(companyWebsite).hostname;
        domainVerified = await verifyDomain(domain);
      } catch (error) {
        console.error("Domain verification error:", error);
      }
    }

    const hash = await bcrypt.hash(password, 10);
    const newRec = new Recruiter({
      name, 
      email, 
      password: hash, 
      companyName, 
      companyWebsite, 
      phone,
      role,
      domainVerified,
      ...req.body // Include other fields from request
    });
    
    await newRec.save();
    res.status(201).json({ msg: "Recruiter created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) return res.status(400).json({ msg: "Account not found" });
  
    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
  
    // Update last login time
    recruiter.last_login = new Date();
    await recruiter.save();
  
    const token = jwt.sign({ id: recruiter._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    // Don't send password back to client
    const recruiterData = recruiter.toObject();
    delete recruiterData.password;
    
    res.json({ token, recruiter: recruiterData });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
