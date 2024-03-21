import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createAuthor, updateAuthor } from '../services/AuthorService';

const AuthorForm = ({ author, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    thumbnail: '',
    status: '',
  });

  useEffect(() => {
    if (author) {
      setFormData({
        id: author.id,
        name: author.name,
        description: author.description,
        thumbnail: author.thumbnail,
        status: author.status,
      });
    } else {
      setFormData({
        id: '',
        name: '',
        description: '',
        thumbnail: '',
        status: '',
      });
    }
  }, [author]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (author) {
      await updateAuthor(formData);
    } else {
      await createAuthor(formData);
    }

    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Tên người / cơ quan ban</Form.Label>
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
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="thumbnail">
        <Form.Label>Ảnh người / cơ quan ban</Form.Label>
        <Form.Control
          type="text"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="status">
        <Form.Label>Trạng Thái</Form.Label>
        <Form.Control
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {author ? 'Update' : 'Create'}
      </Button>
    </Form>
  );
};

export default AuthorForm;