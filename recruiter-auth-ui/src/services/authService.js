import axios from 'axios';

const API = 'http://localhost:5000/api/auth'; // Changed from /api/recruiter to /api/auth

export const login = (data) => axios.post(`${API}/login`, data);
export const signup = (data) => axios.post(`${API}/signup`, data);
export const forgotPassword = (data) => axios.post(`${API}/forgot-password`, data);
