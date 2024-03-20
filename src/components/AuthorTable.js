import React, { useEffect, useState } from 'react';
import { fetchAllAuthors, deleteAuthor } from '../services/AuthorService';
import { Button, Card, Container, Table, Modal } from 'react-bootstrap';
import AuthorForm from './AuthorForm';

const AuthorTable = () => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    const data = await fetchAllAuthors();
    setAuthors(data);
  };

  const handleAddAuthor = () => {
    setSelectedAuthor(null);
    setShowModal(true);
  };

  const handleChangeAuthor = (author) => {
    setSelectedAuthor(author);
    setShowModal(true);
  };

  const handleDeleteAuthor = async (authorId) => {
    await deleteAuthor(authorId);
    fetchAuthors();
  };

  const handleFormSubmit = async (author) => {
    setShowModal(false);
    fetchAuthors();
  };

  return (
    <Container>
      <Card className="mb-3">
        <Card.Header as="h5">Quản lý tác giả</Card.Header>
        <Card.Body>
          <Button variant="primary" onClick={handleAddAuthor} className="mb-3">
            Thêm tác giả
          </Button>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Mã Tác Giả</th>
                <th>Tên Tác Giả</th>
                <th>Mô Tả</th>
                <th>Ảnh Tác Giả</th>
                <th>Trạng Thái</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.id}>
                  <td>{author.id}</td>
                  <td>{author.name}</td>
                  <td>{author.description}</td>
                  <td>{author.thumbnail}</td>
                  <td>{author.status}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleChangeAuthor(author)}
                      className="me-2"
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteAuthor(author.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedAuthor ? 'Update Author' : 'Add Author'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AuthorForm author={selectedAuthor} onSubmit={handleFormSubmit} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AuthorTable;