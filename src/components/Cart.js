import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash, PlusCircle, DashCircle } from 'react-bootstrap-icons';

const Cart = () => {
  const { orderItems, removeItemFromCart, updateItemQuantity, handlePlaceOrder } = useContext(CartContext);
  const [validDays, setValidDays] = React.useState(30);

  const handleRemoveItem = (documentId) => {
    console.log("Removing item with documentId:", documentId);
    // Kiểm tra và đảm bảo rằng documentId khớp với _id trong cơ sở dữ liệu
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
        <p>Danh Sách Yêu Cầu Truy Vấn Trống.</p>
      ) : (
        <>
          <ul className="list-unstyled">
            {Array.isArray(orderItems)
              ? orderItems.map((item) => (
                  <li key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                    <span>{item.comboId}</span>
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
                ))
              : (
                  <li className="d-flex justify-content-between align-items-center mb-3">
                    <span>{orderItems.comboId}</span>
                    <span>{orderItems.bookId}</span>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-danger btn-sm ms-3"
                        onClick={() => handleRemoveItem(orderItems.bookId)}
                      >
                        <Trash size={20} />
                      </button>
                    </div>
                  </li>
                )}
          </ul>
          <div className="d-flex align-items-center">
            <label className="me-2">Số ngày yêu cầu truy vấn Tài Liệu:</label>
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