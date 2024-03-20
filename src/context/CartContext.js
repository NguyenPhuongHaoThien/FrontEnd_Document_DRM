import React, { createContext, useState, useEffect } from 'react';
import { fetchCart, addToCart, removeFromCart, updateCartQuantity, clearCart, placeOrder } from '../services/CartService';
import { toast } from 'react-toastify';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const getOrderItems = async () => {
      try {
        const data = await fetchCart();
        setOrderItems(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    getOrderItems();
  }, []);

  const addItemToCart = async (documentId) => {
    try {
      await addToCart(documentId);
      const updatedCart = await fetchCart();
      setOrderItems(updatedCart);
      toast.success('Sản phẩm đã được thêm vào giỏ hàng.');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.');
    }
  };

  const removeItemFromCart = async (documentId) => {
    try {
      await removeFromCart(documentId);
      const updatedCart = await fetchCart();
      if (updatedCart && updatedCart.length > 0) {
        setOrderItems(updatedCart);
        toast.success('Sản phẩm đã được xóa khỏi giỏ hàng.');
      } else {
        setOrderItems([]);
        toast.warning('Giỏ hàng đã trống sau khi xóa sản phẩm.');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      if (error.response && error.response.status === 404) {
        setOrderItems([]);
        toast.warning('Giỏ hàng không tồn tại.');
      } else {
        toast.error('Đã xảy ra lỗi khi xóa sản phẩm khỏi giỏ hàng. Vui lòng thử lại sau.');
      }
    }
  };
  
  const updateItemQuantity = async (documentId, quantity) => {
    try {
      await updateCartQuantity(documentId, quantity);
      const updatedCart = await fetchCart();
      setOrderItems(updatedCart);
      toast.success('Số lượng sản phẩm đã được cập nhật.');
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      toast.error('Đã xảy ra lỗi khi cập nhật số lượng sản phẩm trong giỏ hàng. Vui lòng thử lại sau.');
    }
  };

  const clearCartItems = async () => {
    try {
      await clearCart();
      setOrderItems([]);
      toast.success('Giỏ hàng đã được xóa.');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Đã xảy ra lỗi khi xóa giỏ hàng. Vui lòng thử lại sau.');
    }
  };

  const handlePlaceOrder = async (validDays) => {
    try {
      const order = await placeOrder(validDays);
      console.log('Đặt hàng thành công:', order);
      setOrderItems([]);
      toast.success('Đơn hàng đã được đặt thành công.');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại sau.');
    }
  };

  return (
    <CartContext.Provider value={{ orderItems, addItemToCart, removeItemFromCart, updateItemQuantity, clearCartItems, handlePlaceOrder }}>
      {children}
    </CartContext.Provider>
  );
};