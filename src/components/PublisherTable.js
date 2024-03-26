import React, { useEffect, useState } from 'react';
import { fetchAllPublishers, deletePublisher } from '../services/PublisherService';
import { Button, Card, Container, Table, Modal } from 'react-bootstrap';
import PublisherForm from './PublisherForm';

const PublisherTable = () => {
  const [publishers, setPublishers] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPublishers();
  }, []);

  const fetchPublishers = async () => {
    const data = await fetchAllPublishers();
    setPublishers(data);
  };

  const handleAddPublisher = () => {
    setSelectedPublisher(null);
    setShowModal(true);
  };

  const handleChangePublisher = (publisher) => {
    setSelectedPublisher(publisher);
    setShowModal(true);
  };

  const handleDeletePublisher = async (publisherId) => {
    await deletePublisher(publisherId);
    fetchPublishers();
  };

  const handleFormSubmit = async (publisher) => {
    setShowModal(false);
    fetchPublishers();
  };

  return (
    <Container>
      <Card className="mb-3">
        <Card.Header as="h5">Quản lý Hồ Sơ Người / Cơ Quan Phê Duyệt</Card.Header>
        <Card.Body>
          <Button variant="primary" onClick={handleAddPublisher} className="mb-3">
            Thêm Hồ Sơ nhà xuất bản
          </Button>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Mã Người / Cơ Quan Phê Duyệt</th>
                <th>Tên Người / Cơ Quan Phê Duyệt</th>
                <th>Địa Chỉ Phê Duyệt</th>
                <th>Số Điện Thoại Liên Hệ</th>
                <th>Địa Chỉ Email Liên Hệ</th>
                <th>Mô Tả</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {publishers.map((publisher) => (
                <tr key={publisher.id}>
                  <td>{publisher.id}</td>
                  <td>{publisher.name}</td>
                  <td>{publisher.address}</td>
                  <td>{publisher.phone}</td>
                  <td>{publisher.email}</td>
                  <td>{publisher.description}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleChangePublisher(publisher)}
                      className="me-2"
                    >
                      Cập Nhật Hồ Sơ Bộ Phận Phê Quyệt
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeletePublisher(publisher.id)}
                    >
                      Xóa Hồ Sơ Bộ Phận Phê Quyệt
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
          <Modal.Title>{selectedPublisher ? 'Cập Nhật Hồ Sơ' : 'Thêm Hồ Sơ Mới'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PublisherForm publisher={selectedPublisher} onSubmit={handleFormSubmit} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PublisherTable;