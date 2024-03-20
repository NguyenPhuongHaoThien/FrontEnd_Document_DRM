import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createActivationCode, createOrder, updateOrder, fetchAllUsers, fetchAllDocuments } from '../services/OrderService';

const OrderAdminForm = ({ order, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    userId: '',
    bookIds: [],
    orderStatus: 'ORDERED',
    activationCodeId: '',
  });
  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchAllUsers().then(data => setUsers(data));
    fetchAllDocuments().then(data => setDocuments(data));
  }, []);

  useEffect(() => {
    if (order) {
      setFormData({
        id: order.order.id,
        userId: order.order.userId,
        bookIds: order.order.bookIds,
        orderStatus: order.order.orderStatus,
        activationCodeId: order.order.activationCodeId,
      });
    } else {
      setFormData({
        id: '',
        userId: '',
        bookIds: [],
        orderStatus: 'ORDERED',
        activationCodeId: '',
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value, options } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'bookIds' ? Array.from(options).filter(option => option.selected).map(option => option.value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      id: formData.id,
      userId: formData.userId,
      bookIds: Array.isArray(formData.bookIds) ? formData.bookIds : formData.bookIds.split(',').map((id) => id.trim()),
      orderStatus: formData.orderStatus,
      activationCodeId: formData.activationCodeId,
    };

    try {
      if (orderData.id) {
        await updateOrder(orderData);
      } else {
        await createOrder(orderData);
      }
      onSubmit();
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="userId">
        <Form.Label>Nhân viên:</Form.Label>
        <Form.Control
          as="select"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        >
          <option value="">Chọn Nhân Viên</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="bookIds">
        <Form.Label>Chọn tài liệu ( nếu chọn nhiều nhấn ctrl + click chuột ) : </Form.Label>
        <Form.Control
          as="select"
          name="bookIds"
          value={formData.bookIds}
          onChange={handleChange}
          multiple
          required
        >
          {documents.map(document => (
            <option key={document.id} value={document.id}>{document.name}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="orderStatus">
        <Form.Label>Trạng thái: </Form.Label>
        <Form.Control
          as="select"
          name="orderStatus"
          value={formData.orderStatus}
          onChange={handleChange}
          required
        >
          <option value="">Chọn trạng thái</option>
          <option value="CART">Trong danh sách</option>
          <option value="ORDERED">Đã xin</option>
          <option value="ACCEPTED">Chấp nhận</option>
          <option value="CANCELLED">Từ chối</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="activationCodeId">
        <Form.Label>Mã Code</Form.Label>
        <Form.Control
          type="text"
          name="activationCodeId"
          value={formData.activationCodeId}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {order ? 'Update' : 'Create'}
      </Button>
    </Form>
  );
};

export default OrderAdminForm;