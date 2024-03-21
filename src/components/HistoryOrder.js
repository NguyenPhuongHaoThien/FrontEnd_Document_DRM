import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { fetchHistoryOrders } from '../services/UserService';

const HistoryOrder = () => {
  const { user } = useContext(UserContext);
  const [historyOrders, setHistoryOrders] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await fetchHistoryOrders();
        setHistoryOrders(data);
      } catch (error) {
        console.error('Failed to fetch history orders:', error);
      }
    };

    if (user.auth) {
      fetchHistory();
    }
  }, [user]);

  return (
    <div>
      <h2>Lịch sử Xin Quyền</h2>
      {historyOrders.map((historyOrder) => (
        <div key={historyOrder.order.id}>
          <h4>Order ID: {historyOrder.order.id}</h4>
          <p>Trạng thái: {historyOrder.order.orderStatus}</p>
          <p>Ngày đặt hàng: {new Date(historyOrder.order.createdAt).toLocaleDateString()}</p>
          <p>Hạn order: {new Date(historyOrder.order.expiredAt).toLocaleDateString()}</p>
          <h5>Sách trong order:</h5>
          <ul>
            {historyOrder.documents.map((document) => (
              <li key={document.id}>{document.name}</li>
            ))}
          </ul>
          {historyOrder.activationCode && (
            <>
              <h5>Activation Code:</h5>
              <p>Code: {historyOrder.activationCode.code}</p>
              <p>Trạng thái: {historyOrder.activationCode.status}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default HistoryOrder;