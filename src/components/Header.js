import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import { House, Book, PersonCircle, BoxArrowRight, Cart as CartIcon } from 'react-bootstrap-icons';

const Header = () => {
  const { logout, user } = useContext(UserContext);
  const { orderItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    window.location.reload();
    toast.success('Đăng xuất thành công');
  };

  const navigateToProfile = () => {
    if (user && user.id) {
      navigate(`/user/${user.id}`);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-3" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/intro">
            <House size={24} className="me-2" />
            WAKA
          </Navbar.Brand>
          {(user && user.auth === true || window.location.pathname === '/') && (
            <>
              <Nav className="me-auto">
                <Nav.Link href="/">
                  <House size={20} className="me-2" />
                  Trang chủ
                </Nav.Link>
                <Nav.Link href="/home/documents-free">
                  <Book size={20} className="me-2" />
                  Tài liệu miễn phí
                </Nav.Link>
                {user && user.role === 'ROLE_ADMIN' && (
                  <Nav.Link href="/admin">Quản Lý</Nav.Link>
                )}
              </Nav>
              <Nav>
                {user && user.email && <span className="nav-link text-light">Xin chào: {user.email}</span>}
                {user && user.auth && (
                  <>
                    <Link to="/cart" className="nav-link text-light position-relative">
                      <CartIcon size={20} className="me-2" />
                      Danh Sách Xin
                      {orderItems && orderItems.length > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {orderItems.length}
                          <span className="visually-hidden">số lượng tài liệu: </span>
                        </span>
                      )}
                    </Link>
                    <Nav.Link href="/user/history">
                      <Book size={20} className="me-2" />
                      Lịch sử Xin Quyền
                    </Nav.Link>

                    <Nav.Link href="/reading-history">
                        <Book size={20} className="me-2" />
                        Lịch sử đọc
                    </Nav.Link>
                    
                  </>
                )}
                <NavDropdown title={<PersonCircle size={20} className="me-2" />} id="basic-nav-dropdown">
                  {user && user.auth ? (
                    <>
                      <NavDropdown.Item onClick={handleLogout}>
                        <BoxArrowRight size={20} className="me-2" />
                        Đăng xuất
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={navigateToProfile}>Thông tin cá nhân</NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      <NavDropdown.Item href="/login">Đăng nhập</NavDropdown.Item>
                      <NavDropdown.Item href="/register">Đăng ký</NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
              </Nav>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;