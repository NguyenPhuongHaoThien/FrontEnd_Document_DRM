import React, { useEffect, useState } from 'react';
import { fetchAllOrders, deleteOrder, acceptOrder, cancelOrder } from '../services/OrderService';
import { Button, Card, Container, Table, Modal } from 'react-bootstrap';
import OrderAdminForm from './OrderAdminForm';

const OrderTable = () => {
  const [listOrders, setListOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const orders = await fetchAllOrders();
    setListOrders(orders);
  };

  const handleAddOrder = () => {
    setSelectedOrder(null);
    setShowModal(true);
  };

  const handleChangeOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleDeleteOrder = async (orderId) => {
    await deleteOrder(orderId);
    fetchOrders();
  };

  const handleAcceptOrder = async (orderId) => {
    await acceptOrder(orderId);
    fetchOrders();
  };

  const handleCancelOrder = async (orderId) => {
    await cancelOrder(orderId);
    fetchOrders();
  };

  const handleFormSubmit = async (order) => {
    setShowModal(false);
    fetchOrders();
  };

  return (
    <Container>
      <Card className="mb-3">
        <Card.Header as="h5">Quản lý Yêu Cầu Truy Vấn Tài Liệu</Card.Header>
        <Card.Body>
          <Button variant="primary" onClick={handleAddOrder} className="mb-3">
            Thêm Hồ Sơ Mới
          </Button>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Tên Nhân Viên</th>
                <th>Tên tài liệu</th>
                <th>Mã Code DRM</th>
                <th>Ngày yêu cầu Truy Vấn Tài Liệu</th>
                <th>Trạng thái </th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {listOrders.map((orderDetail) => (
                <tr key={orderDetail.order.id}>
                  <td>{orderDetail.user ? orderDetail.user.username : 'N/A'}</td>
                  <td>
                    {orderDetail.documents &&
                      orderDetail.documents.map((document) => document.name).join(', ')}
                  </td>
                  <td>{orderDetail.activationCode ? orderDetail.activationCode.code : 'N/A'}</td>
                  <td>{new Date(orderDetail.order.orderDate).toLocaleDateString()}</td>
                  <td>{orderDetail.order.orderStatus}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleChangeOrder(orderDetail)}
                      className="me-2"
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteOrder(orderDetail.order.id)}
                      className="me-2"
                    >
                      Delete
                    </Button>
                    {orderDetail.order.orderStatus === 'ORDERED' && (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => handleAcceptOrder(orderDetail.order.id)}
                          className="me-2"
                        >
                          Accept
                        </Button>
                        <Button
                          variant="warning"
                          onClick={() => handleCancelOrder(orderDetail.order.id)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedOrder ? 'Cập nhật Hồ Sơ' : 'Xóa Hồ Sơ'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrderAdminForm order={selectedOrder} onSubmit={handleFormSubmit} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default OrderTable;  