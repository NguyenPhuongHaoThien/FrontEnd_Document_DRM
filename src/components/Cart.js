import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash, PlusCircle, DashCircle } from 'react-bootstrap-icons';

const Cart = () => {
  const { orderItems, removeItemFromCart, updateItemQuantity, handlePlaceOrder } = useContext(CartContext);
  const [validDays, setValidDays] = React.useState(30);

  const handleRemoveItem = (documentId) => {
    removeItemFromCart(documentId);
  };

  const handleQuantityChange = (documentId, quantity) => {
    updateItemQuantity(documentId, quantity);
  };

  const handlePlaceOrderClick = () => {
    handlePlaceOrder(validDays);
  };

  return (
    <div>
      <h2>Giỏ hàng</h2>
      {orderItems.length === 0 ? (
        <p>Danh Sách Trống.</p>
      ) : (
        <>
          <ul className="list-unstyled">
            {orderItems.map((item) => (
              <li key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                <span>{item.bookId}</span>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-danger btn-sm ms-3"
                    onClick={() => handleRemoveItem(item.bookId)}
                  >
                    <Trash size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center">
            <label className="me-2">Số ngày yêu cầu:</label>
            <input
              type="number"
              className="form-control me-2"
              value={validDays}
              onChange={(e) => setValidDays(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handlePlaceOrderClick}>
              Gửi Yêu Cầu
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;