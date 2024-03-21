import axios from './axios';

const getToken = () => {
  return localStorage.getItem('token');
};

export const fetchCart = async () => {
  try {
    const token = getToken();
    const response = await axios.get('/cart', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const addToCart = async (documentId) => {
  try {
    const response = await axios.post(`/cart/book/${documentId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const removeFromCart = async (itemId) => {
  try {
    const response = await axios.post(`/cart/book/remove/${itemId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data; // Return the updated list of orderItems
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const updateCartQuantity = async (documentId, quantity) => {
  try {
    const response = await axios.put(`/cart/book/${documentId}`, { quantity }, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    throw error;
  }
};

export const clearCart = async () => {
  try {
    const response = await axios.delete('/cart', {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

export const placeOrder = async (validDays) => {
  try {
    const token = getToken();
    const response = await axios.post('/cart/order', null, {
      headers: { Authorization: `Bearer ${token}` },
      params: { validDays },
    });
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};