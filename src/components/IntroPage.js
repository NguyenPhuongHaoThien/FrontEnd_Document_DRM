import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faShieldAlt, faLock, faUsers } from '@fortawesome/free-solid-svg-icons';
import '../IntroPage.scss';
import headerBackground from '../assets/header-background.jpg';
import featureImage1 from '../assets/feature-image-1.jpg';
import featureImage2 from '../assets/feature-image-2.jpg';
import featureImage3 from '../assets/feature-image-3.jpg';
import featureImage4 from '../assets/feature-image-4.jpg';
import { useNavigate } from 'react-router-dom';

const IntroPage = () => {
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/login');
    };

  return (
    <div className="intro-page">
      <header style={{ backgroundImage: `url(${headerBackground})` }}>
        <Container>
          <h1 className="animate__animated animate__fadeInDown">DRM DOCUMENT</h1>
          <p className="animate__animated animate__fadeInUp">Hệ thống quản lý văn bản an toàn và hiệu quả cho cơ quan</p>
          <Button variant="primary" size="lg" className="animate__animated animate__fadeInUp animate__delay-1s" onClick={navigateToLogin}>Bắt đầu ngay</Button>
        </Container>
      </header>

      <section className="features">
        <Container>
          <Row>
            <Col md={3}>
              <div className="feature-item">
                <img src={featureImage1} alt="Quản lý văn bản" className="feature-image" />
                <FontAwesomeIcon icon={faFileAlt} className="feature-icon" />
                <h3>Quản lý văn bản</h3>
                <p>Dễ dàng quản lý và tổ chức các tài liệu của bạn.</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="feature-item">
                <img src={featureImage2} alt="Bảo mật cao" className="feature-image" />
                <FontAwesomeIcon icon={faShieldAlt} className="feature-icon" />
                <h3>Bảo mật cao</h3>
                <p>Đảm bảo an toàn và bảo mật cho các tài liệu quan trọng.</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="feature-item">
                <img src={featureImage3} alt="Kiểm soát truy cập" className="feature-image" />
                <FontAwesomeIcon icon={faLock} className="feature-icon" />
                <h3>Kiểm soát truy cập</h3>
                <p>Quản lý quyền truy cập và chia sẻ tài liệu một cách linh hoạt.</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="feature-item">
                <img src={featureImage4} alt="Cộng tác hiệu quả" className="feature-image" />
                <FontAwesomeIcon icon={faUsers} className="feature-icon" />
                <h3>Cộng tác hiệu quả</h3>
                <p>Dễ dàng chia sẻ và cộng tác trên các tài liệu với đồng nghiệp.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <footer>
        <Container>
          <p>&copy; 2023 DRM DOCUMENT. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default IntroPage;