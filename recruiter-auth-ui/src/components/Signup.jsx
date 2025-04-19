import React, { useState } from 'react';
import { signup } from '../services/authService';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '', // Changed from company to match model
    companyWebsite: '',
    phone: '',
    linkedin: '',
    role: '',
    profile_picture: '' // Will need proper file upload implementation later
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(formData);
      alert('Signup successful');
      console.log(res.data);
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <h2>Recruiter Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input id="name" name="name" type="text" placeholder="Full Name" onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" placeholder="Email" onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input id="password" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="companyName">Company Name *</label>
          <input id="companyName" name="companyName" type="text" placeholder="Company Name" onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="companyWebsite">Company Website</label>
          <input id="companyWebsite" name="companyWebsite" type="url" placeholder="https://example.com" onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn Profile</label>
          <input id="linkedin" name="linkedin" type="url" placeholder="LinkedIn URL" onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input id="role" name="role" type="text" placeholder="Your Role (e.g., HR Manager)" onChange={handleChange} />
        </div>
        
        {/* Profile picture will require a file upload component */}
        <div className="form-group">
          <label htmlFor="profile_picture">Profile Picture URL</label>
          <input id="profile_picture" name="profile_picture" type="url" placeholder="Profile Picture URL" onChange={handleChange} />
        </div>
        
        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
      <div className="required-fields-note">
        * Required fields
      </div>
    </div>
  );
};

export default Signup;
