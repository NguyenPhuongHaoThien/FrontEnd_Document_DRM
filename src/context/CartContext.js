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

  const removeItemFromCart = async (itemId) => {
    try {
      console.log("Calling removeFromCart with itemId:", itemId);
      const updatedOrderItems = await removeFromCart(itemId);
      setOrderItems(updatedOrderItems);
      toast.success('Sản phẩm đã được xóa khỏi giỏ hàng.');
      window.location.reload();
    } catch (error) {
      console.error('Error removing from cart:', error);
      if (error.message === 'Document not found') {
        toast.error('Không tìm thấy tài liệu trong giỏ hàng.');
      } else if (error.message === 'Unauthorized') {
        toast.error('Bạn không có quyền xóa sản phẩm khỏi giỏ hàng.');
      } else {
        toast.error('Đã xảy ra lỗi khi xóa sản phẩm khỏi giỏ hàng. Vui lòng thử lại sau.');
      }
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

  const updateItemQuantity = async (documentId, quantity) => {
    try {
      const updatedCart = await updateCartQuantity(documentId, quantity);
      setOrderItems(updatedCart);
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  return (
    <CartContext.Provider value={{ orderItems, addItemToCart, removeItemFromCart, updateItemQuantity, handlePlaceOrder }}>
      {children}
    </CartContext.Provider>
  );
};