import axios from 'axios';

const API_URL = 'http://localhost:4000/api';  // Adjust the URL as needed

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const bookSeats = async (userId, seats, date, selectedClass) => {
  try {
    const response = await axios.post(`${API_URL}/booking/book`, {
      userId,
      seats,
      date,
      selectedClass,
    });
    return response.data;
  } catch (error) {
    console.error('Error booking seats:', error);
    throw error;
  }
};
