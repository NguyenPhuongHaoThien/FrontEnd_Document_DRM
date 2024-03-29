import axios from './axios';

const fetchAllPublishers = async () => {
  try {
    const response = await axios.get('/admin/publishers');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch publishers:', error);
    return [];
  }
};

const createPublisher = async (publisher) => {
  try {
    const response = await axios.post('/admin/create-publisher', publisher);
    return response.data;
  } catch (error) {
    console.error('Failed to create publisher:', error);
    throw error;
  }
};

const updatePublisher = async (publisher) => {
  try {
    const response = await axios.post('/admin/update-publisher', publisher);
    return response.data;
  } catch (error) {
    console.error('Failed to update publisher:', error);
    throw error;
  }
};

const deletePublisher = async (publisherId) => {
  try {
    await axios.post('/admin/delete-publisher', { id: publisherId });
  } catch (error) {
    console.error('Failed to delete publisher:', error);
    throw error;
  }
};

const getPublisherById = async (publisherId) => {
  try {
    const response = await axios.get(`/admin/publisher/${publisherId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch publisher:', error);
    throw error;
  }
};

export { fetchAllPublishers, createPublisher, updatePublisher, deletePublisher, getPublisherById };