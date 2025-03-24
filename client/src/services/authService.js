import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};