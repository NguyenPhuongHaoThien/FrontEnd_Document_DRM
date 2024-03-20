import axios from './axios';

const fetchAllCategories = async () => {
  try {
    const response = await axios.get('/admin/categories');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};

const createCategory = async (category) => {
  try {
    const response = await axios.post('/admin/create-category', category);
    return response.data;
  } catch (error) {
    console.error('Failed to create category:', error);
    throw error;
  }
};

const updateCategory = async (category) => {
  try {
    const response = await axios.post('/admin/update-category', category);
    return response.data;
  } catch (error) {
    console.error('Failed to update category:', error);
    throw error;
  }
};

const deleteCategory = async (category) => {
  try {
    await axios.post('/admin/delete-category', category);
  } catch (error) {
    console.error('Failed to delete category:', error);
    throw error;
  }
};

const getCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`/admin/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch category:', error);
    throw error;
  }
};

export { fetchAllCategories, createCategory, updateCategory, deleteCategory, getCategoryById };