import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBook, FaShoppingCart, FaHistory, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const SidebarContainer = styled.div`
  width: 200px;
  background-color: #f8f9fa;
  color: #333;
  transition: width 0.3s ease;
  overflow-y: auto;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  height: 90vh;

  &:hover {
    width: 250px;
  }
`;

const SidebarNav = styled(Nav)`
  padding: 20px;
  flex-direction: column;
  flex-grow: 1; // Add this line
`;

const SidebarLink = styled(Nav.Link)`
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: #333;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e9ecef;
  }

  &.active {
    background-color: #dee2e6;
  }
`;

const SidebarIcon = styled.div`
  margin-right: 10px;
  font-size: 20px;
`;

const SidebarText = styled.span`
  font-size: 16px;
`;

const FooterLinks = styled.div`
  padding: 20px;
`;


const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Đăng xuất thành công');
    window.location.reload();
  };

  const navigateToProfile = () => {
    if (user && user.id) {
      navigate(`/user/${user.id}`);
    }
  };

  const sidebarLinks = [
    {
      path: '/home/documents-free',
      icon: <FaBook />,
      text: 'Tài liệu miễn phí',
    },
    {
      path: '/cart',
      icon: <FaShoppingCart />,
      text: 'Danh sách xin quyền',
    },
    {
      path: '/user/history',
      icon: <FaHistory />,
      text: 'Lịch sử xin quyền',
    },
  ];

  return (
    <SidebarContainer>
      <SidebarNav>
        {sidebarLinks.map((link, index) => (
          <SidebarLink
            key={index}
            as={Link}
            to={link.path}
            className={location.pathname === link.path ? 'active' : ''}
          >
            <SidebarIcon>{link.icon}</SidebarIcon>
            <SidebarText>{link.text}</SidebarText>
          </SidebarLink>
        ))}
      </SidebarNav>
      <div>
        <SidebarLink onClick={navigateToProfile}>
          <SidebarIcon>
            <FaUserCircle />
          </SidebarIcon>
          <SidebarText>Hồ sơ cá nhân</SidebarText>
        </SidebarLink>
        <SidebarLink onClick={handleLogout}>
          <SidebarIcon>
            <FaSignOutAlt />
          </SidebarIcon>
          <SidebarText>Đăng xuất</SidebarText>
        </SidebarLink>
      </div>
    </SidebarContainer>
  );
};

export default UserSidebar;