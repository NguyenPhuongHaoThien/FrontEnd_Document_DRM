import axios from "../services/axios.js";

const fetchAllDocument = async (searchTerm = '', selectedCategory = 'all', page = 0, size = 10) => {
    try {
        const response = await axios.get(`/home`, {
            params: {
                searchTerm,
                selectedCategory,
                page,
                size
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching documents:', error);
        throw error;
    }
};

const PDFService = async (documentId) => {
    try {
      const response = await axios.get(`/read/${documentId}/pdf`, {
        responseType: 'blob',
      });
      return URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    } catch (error) {
      console.error('Error fetching PDF:', error);
      throw error;
    }
  };
export { fetchAllDocument, PDFService };



