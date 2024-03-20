// PDFService.js
import axios from './axios';

const fetchPdf = async (documentId, activationCode = null) => {
  try {
    const response = await axios.request({
      url: `/read/${documentId}/pdf`,
      method: 'POST',
      responseType: 'arraybuffer',
      data: activationCode ? { code: activationCode } : null,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch PDF", error);
    throw error;
  }
};

export const PDFService = {
  fetchPdf,
};