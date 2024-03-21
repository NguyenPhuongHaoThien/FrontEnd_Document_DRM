import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import '../Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <h4>Liên Hệ</h4>
            <ul className="contact-list">
              <li>
                <FaEnvelope className="icon" />
                <a href="phuongit9902@gmail.com">phuongit9902@gmail.com</a>
              </li>
              <li>
                <FaPhone className="icon" />
                <a href="tel:+0896412355">+84 (896) 412-355</a>
              </li>
              <li>
                <FaMapMarkerAlt className="icon" />
                <span>Phước Kiển, Nhà Bè, Việt Nam</span>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h4>Theo Dõi Chúng Tôi</h4>
            <ul className="social-icons">
              <li>
                <a href="https://www.facebook.com/MinhPhuong992k2/" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="icon" />
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="icon" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="icon" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="icon" />
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h4>Đăng Ký Nhận Thông Tin</h4>
            <form className="newsletter-form">
              <input type="email" placeholder="Email của bạn" required />
              <button type="submit">Đăng Ký</button>
            </form>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="copyright">
              &copy; {new Date().getFullYear()} - Your Company Name. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;