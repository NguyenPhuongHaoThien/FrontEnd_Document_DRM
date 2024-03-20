import axios from './axios';

const fetchAllAuthors = async () => {
  try {
    const response = await axios.get('/admin/authors');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch authors:', error);
    return [];
  }
};

const createAuthor = async (author) => {
  try {
    const response = await axios.post('/admin/create-author', author);
    return response.data;
  } catch (error) {
    console.error('Failed to create author:', error);
    throw error;
  }
};

const updateAuthor = async (author) => {
  try {
    const response = await axios.post('/admin/update-author', author);
    return response.data;
  } catch (error) {
    console.error('Failed to update author:', error);
    throw error;
  }
};

const deleteAuthor = async (authorId) => {
  try {
    await axios.post('/admin/delete-author', { id: authorId });
  } catch (error) {
    console.error('Failed to delete author:', error);
    throw error;
  }
};

const getAuthorById = async (authorId) => {
  try {
    const response = await axios.get(`/admin/author/${authorId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch author:', error);
    throw error;
  }
};

export { fetchAllAuthors, createAuthor, updateAuthor, deleteAuthor, getAuthorById };