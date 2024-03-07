import axios from './axios'; // Adjust the import path based on your project structure

const fetchPdf = async (documentId) => {
  try {
    const response = await axios.get(`/read/${documentId}/pdf`, { responseType: 'blob' });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch PDF", error);
    throw error;
  }
};

export const PDFService = {
  fetchPdf,
};
