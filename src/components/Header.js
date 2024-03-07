import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useEffect, useState } from 'react';
const Header = (props) => {
  const {logout, user} = useContext(UserContext);

  const navigate = useNavigate();

  // const[hideHeader, setHideHeader] = useState(false);
  // useEffect(()=>{
  //   if (window.location.pathname === '/login') {
  //     setHideHeader(true);
  //   }
  // }, [])
  
  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Đăng xuất thành công');
  }
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">WAKA</Navbar.Brand>
                  {( user && user.auth == true || window.location.pathname === '/') &&
                   <>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Trang chủ</Nav.Link>
                        <Nav.Link href="/documents">Sách</Nav.Link>
                    </Nav>
                    <Nav>
                        {user && user.email && <span className='nav-link'> <>Welcome: {user.email }!!!</> </span>}
                        <NavDropdown title="Tài khoản" id="basic-nav-dropdown">
                        {
                            user && user.auth 
                            ? <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
                            : 
                            <>
                                <NavDropdown.Item href="/login">Đăng nhập</NavDropdown.Item> 
                                <NavDropdown.Item href="/register">Đăng ký</NavDropdown.Item>
                            </>
                        }
                        </NavDropdown>
                    </Nav>
                    </>
                  }
                </Container>
            </Navbar>
        </>
    )
}

export default Header;