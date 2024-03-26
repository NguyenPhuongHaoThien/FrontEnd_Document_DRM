// ReadingHistoryService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Thay đổi URL theo backend của bạn

export const fetchReadingHistory = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/reading-history/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};