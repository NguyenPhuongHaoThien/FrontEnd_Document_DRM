// OrderService.js
import axios from './axios';

const fetchAllOrders = async () => {
  try {
    const response = await axios.get('/admin/orders');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return [];
  }
};

const createOrder = async (order) => {
  try {
    const response = await axios.post('/admin/create-order', order);
    return response.data;
  } catch (error) {
    console.error('Failed to create order:', error);
    throw error;
  }
};

const updateOrder = async (order) => {
  try {
    const response = await axios.post('/admin/update-order', order);
    return response.data;
  } catch (error) {
    console.error('Failed to update order:', error);
    throw error;
  }
};

const deleteOrder = async (orderId) => {
  try {
    await axios.post('/admin/delete-order', { id: orderId });
  } catch (error) {
    console.error('Failed to delete order:', error);
    throw error;
  }
};

const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`/admin/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch order:', error);
    throw error;
  }
};

const fetchAllUsers = async () => {
  try {
    const response = await axios.get('/admin/users');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
};

const fetchAllDocuments = async () => {
  try {
    const response = await axios.get('/admin/documents');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch documents:', error);
    return [];
  }
};
const createActivationCode = async () => {
  try {
    const response = await axios.post('/admin/create-activation-code');
    return response.data;
  } catch (error) {
    console.error('Failed to create activation code:', error);
    throw error;
  }
};

const acceptOrder = async (orderId) => {
  try {
    const response = await axios.post('/admin/accept-order', { id: orderId });
    return response.data;
  } catch (error) {
    console.error('Failed to accept order:', error);
    throw error;
  }
};

const cancelOrder = async (orderId) => {
  try {
    const response = await axios.post('/admin/cancel-order', { id: orderId });
    return response.data;
  } catch (error) {
    console.error('Failed to cancel order:', error);
    throw error;
  }
};

export { fetchAllOrders, createOrder, updateOrder, deleteOrder, getOrderById, fetchAllUsers, fetchAllDocuments, createActivationCode, acceptOrder, cancelOrder };