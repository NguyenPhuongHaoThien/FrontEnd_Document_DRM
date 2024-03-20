import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const CategoryForm = ({ category, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: ''
  });

  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id,
        name: category.name,
        description: category.description
      });
    }
  }, [category]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Tên Thể Loại</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Mô Tả</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {category ? 'Update' : 'Create'}
      </Button>
    </Form>
  );
};

export default CategoryForm;