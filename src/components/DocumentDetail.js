// DocumentDetail.js
import React from "react";
import { Card, ListGroup, Container, Button, Badge } from 'react-bootstrap';
import { FaBookOpen, FaCalendarAlt, FaUser, FaBuilding, FaTag, FaFileAlt, FaPercent, FaLock, FaLockOpen } from 'react-icons/fa';

const DocumentDetail = ({  document, category, author, publisher, onReadDocument, onAddToCart }) => {
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card style={{ width: '100%' }}>
        <Card.Img variant="top" src={document.thumbnail} />
        <Card.Body>
          <Card.Title>{document.name} <FaBookOpen style={{ color: 'green', verticalAlign: 'middle' }} /></Card.Title>
          <Card.Text>
            <strong>Mô tả:</strong> {document.description}
          </Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <FaTag className="me-2" /> <strong>Loại Tài Liệu:</strong> {category?.name}
          </ListGroup.Item>
          <ListGroup.Item>
            <FaUser className="me-2" /> <strong>Người / Cơ Quan Ban Hành:</strong> {author?.name}
          </ListGroup.Item>
          <ListGroup.Item>
            <FaBuilding className="me-2" /> <strong>Người / Cơ Quan Phê Duyệt:</strong> {publisher?.name}
          </ListGroup.Item>
          <ListGroup.Item>
            <FaCalendarAlt className="me-2" /> <strong>Ngày Phê Duyệt:</strong> {document.publicationDate}
          </ListGroup.Item>
          <ListGroup.Item>
            <Badge bg={document.drmEnabled ? 'success' : 'danger'}>
              {document.drmEnabled ? (
                <>
                  <FaLock className="me-2" /> DRM Enabled
                </>
              ) : (
                <>
                  <FaLockOpen className="me-2" /> Không có DRM
                </>
              )}
            </Badge>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Trạng thái:</strong> {document.status}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Button variant="primary" onClick={() => onReadDocument(document.id)}>
            Đọc Tài Liệu
          </Button>
          <Button variant="success" className="ms-3" onClick={() => onAddToCart(document.id)}>
            Xin Quyền Truy Vấn Tài Liệu
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DocumentDetail;