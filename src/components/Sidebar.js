import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBook, FaUsers, FaShoppingCart, FaTag, FaUserEdit, FaBuilding, FaUserCircle, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const SidebarContainer = styled.div`
  width: 200px;
  background-color: #222;
  color: #fff;
  transition: width 0.3s ease;
  overflow-y: auto;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  height: 100vh;

  &:hover {
    width: 250px;
  }
`;

const SidebarNav = styled(Nav)`
  padding: 20px;
  flex-direction: column;
  flex: 1; /* Thêm flex: 1 để cho phép SidebarNav chiếm không gian còn lại */
`;

const SidebarLink = styled(Nav.Link)`
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: #fff;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #444;
  }

  &.active {
    background-color: #666;
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


const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Đăng xuất thành công');
  };

  const navigateToProfile = () => {
    if (user && user.id) {
      navigate(`/user/${user.id}`);
    }
  };

  const sidebarLinks = [
    {
      path: '/admin/document',
      icon: <FaBook />,
      text: 'Quản lý hồ sơ tài liệu',
    },
    {
      path: '/admin/user',
      icon: <FaUsers />,
      text: 'Quản lý hồ sơ nhân viên',
    },
    {
      path: '/admin/order',
      icon: <FaShoppingCart />,
      text: 'Quản lý hồ sơ danh sách yêu cầu truy vấn',
    },
    {
      path: '/admin/category',
      icon: <FaTag />,
      text: 'Quản lý hồ sơ thể loại tài liệu',
    },
    {
      path: '/admin/author',
      icon: <FaUserEdit />,
      text: 'Quản lý người / cơ quan ban hành',
    },
    {
      path: '/admin/publisher',
      icon: <FaBuilding />,
      text: 'Quản lý hồ sơ người / cơ quan phê duyệt',
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
        <SidebarLink as={Link} to="/register">
          <SidebarIcon>
            <FaUserPlus />
          </SidebarIcon>
          <SidebarText>Đăng ký</SidebarText>
        </SidebarLink>
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

export default Sidebar;