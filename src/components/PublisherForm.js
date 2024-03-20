import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createPublisher, updatePublisher } from '../services/PublisherService';

const PublisherForm = ({ publisher, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
    email: '',
    description: '',
  });

  useEffect(() => {
    if (publisher) {
      setFormData({
        id: publisher.id,
        name: publisher.name,
        address: publisher.address,
        phone: publisher.phone,
        email: publisher.email,
        description: publisher.description,
      });
    } else {
      setFormData({
        id: '',
        name: '',
        address: '',
        phone: '',
        email: '',
        description: '',
      });
    }
  }, [publisher]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (publisher) {
      await updatePublisher(formData);
    } else {
      await createPublisher(formData);
    }

    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Tên Nhà Xuất Bản</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="address">
        <Form.Label>Địa Chỉ</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="phone">
        <Form.Label>Số Điện Thoại</Form.Label>
        <Form.Control
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Địa Chỉ Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Mô Tả</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {publisher ? 'Update' : 'Create'}
      </Button>
    </Form>
  );
};

export default PublisherForm;