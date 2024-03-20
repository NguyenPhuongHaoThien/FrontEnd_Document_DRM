// import axios from "../services/axios.js";

// const fetchAllDocument = async (searchTerm = '', selectedCategory = 'all', page = 0, size = 10) => {
//     try {
//         const response = await axios.get(`/home`, {
//             params: {
//                 searchTerm,
//                 selectedCategory,
//                 page,
//                 size
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching documents:', error);
//         throw error;
//     }
// };

// const PDFService = async (documentId) => {
//     try {
//         const response = await axios.get(`/read/${documentId}/pdf`, {
//             responseType: 'blob',
//         });
//         return URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
//     } catch (error) {
//         console.error('Error fetching PDF:', error);
//         throw error;
//     }
// };



// const fetchDocumentDetail = async (id) => {
//     try {
//       const response = await axios.get(`/home/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching document detail:', error);
//       throw error;
//     }
//   }


//   const getDocumentById = async (documentId) => {
//     try {
//         const response = await axios.get(`/home/${documentId}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching document detail:', error);
//         throw error;
//     }
// };

// export {fetchAllDocument, PDFService, fetchDocumentDetail, getDocumentById};



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
        return URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
    } catch (error) {
        console.error('Error fetching PDF:', error);
        throw error;
    }
};

const fetchDocumentDetail = async (id) => {
    try {
      const response = await axios.get(`/home/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching document detail:', error);
      throw error;
    }
};

const getDocumentById = async (documentId) => {
    try {
        const response = await axios.get(`/admin/document/${documentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching document detail:', error);
        throw error;
    }
};

const createDocument = async (document) => {
    try {
        const response = await axios.post('/admin/create-document', document);
        return response.data;
    } catch (error) {
        console.error('Error creating document:', error);
        throw error;
    }
};

const updateDocument = async (document) => {
    try {
        const response = await axios.post('/admin/update-document', document);
        return response.data;
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
};

const deleteDocument = async (documentId) => {
    try {
        await axios.post('/admin/delete-document', { id: documentId });
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
};

const fetchFreeDocuments = async (searchTerm = '', page = 0, size = 10) => {
    try {
      const response = await axios.get(`/home/documents-free`, {
        params: {
          searchTerm,
          page,
          size
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching free documents:', error);
      throw error;
    }
  };

  const fetchDocumentsByCategoryName = async (categoryName, page = 0, size = 10) => {
    try {
        const response = await axios.get(`/home/category`, {
            params: {
                categoryName, // Notice the parameter is now categoryName
                page,
                size
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching documents by category name:', error);
        throw error;
    }
};
  
  export { fetchAllDocument, PDFService, fetchDocumentDetail, getDocumentById, createDocument, updateDocument, deleteDocument, fetchFreeDocuments, fetchDocumentsByCategoryName };