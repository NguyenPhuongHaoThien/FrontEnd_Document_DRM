import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaBook, FaUsers, FaShoppingCart, FaTag, FaUserEdit, FaBuilding } from 'react-icons/fa';

const AdminPage = () => {
  return (
    <Container className="mt-4">
      <h1 className="mb-4">Trang Quản Lý Của Admin</h1>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title><FaBook className="me-2" />Quản lý hồ sơ tài liệu</Card.Title>
              <Card.Text>
                Quản lý các tài liệu, sách điện tử trong hệ thống.
              </Card.Text>
              <Link to="/admin/document">
                <Button variant="primary">Truy cập</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title><FaUsers className="me-2" />Quản lý hồ sơ nhân viên</Card.Title>
              <Card.Text>
                Quản lý thông tin và quyền hạn của nhân viên.
              </Card.Text>
              <Link to="/admin/user">
                <Button variant="primary">Truy cập</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title><FaShoppingCart className="me-2" />Quản lý hồ sơ danh sách yêu cầu truy vấn</Card.Title>
              <Card.Text>
                Theo dõi và xử lý các yêu cầu truy vấn của nhân viên.
              </Card.Text>
              <Link to="/admin/order">
                <Button variant="primary">Truy cập</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title><FaTag className="me-2" />Quản lý hồ sơ thể loại tài liệu</Card.Title>
              <Card.Text>
                Quản lý các thể loại tài liệu trong hệ thống.
              </Card.Text>
              <Link to="/admin/category">
                <Button variant="primary">Truy cập</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title><FaUserEdit className="me-2" />Quản lý người / cơ quan ban hành </Card.Title>
              <Card.Text>
                Quản lý thông tin của Quản lý người / cơ quan ban hành
              </Card.Text>
              <Link to="/admin/author">
                <Button variant="primary">Truy cập</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title><FaBuilding className="me-2" />Quản lý hồ sơ người / cơ quan phê duyệt</Card.Title>
              <Card.Text>
                Quản lý thông tin hồ sơ người / cơ quan phê duyệt.
              </Card.Text>
              <Link to="/admin/publisher">
                <Button variant="primary">Truy cập</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;