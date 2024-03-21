// TableUsers.js
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Carousel, Form, Modal, InputGroup } from 'react-bootstrap';
import { fetchAllDocument } from '../services/DocumentService';
import ReactPaginate from 'react-paginate';
import SearchInput from './SearchInput';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import DocumentDetail from './DocumentDetail';
import { FaBookOpen, FaShoppingCart, FaInfoCircle, FaLock, FaLockOpen,  FaSearch, FaListAlt  } from 'react-icons/fa';
import { fetchDocumentDetail } from '../services/DocumentService';
import { fetchDocumentsByCategoryName } from '../services/DocumentService';
import { Badge, ListGroup } from 'react-bootstrap';

const TableUsers = () => {
  // Các state để quản lý danh sách tài liệu, phân trang, tìm kiếm và lọc
  const [listDocument, setListDocuments] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Lấy thông tin người dùng từ UserContext
  const { user } = useContext(UserContext);

  // Số lượng tài liệu trên mỗi trang
  const documentsPerPage = 10;

  // Các state để quản lý modal và đặt hàng
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedDocumentsForOrder, setSelectedDocumentsForOrder] = useState([]);
  const [validDays, setValidDays] = useState(30);

  // Lấy các hàm xử lý giỏ hàng từ CartContext
  const { addItemToCart, removeItemFromCart, updateItemQuantity, placeOrder } = useContext(CartContext);

  // Các state để quản lý modal chi tiết tài liệu và modal nhập mã kích hoạt
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showActivationCodeModal, setShowActivationCodeModal] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [activationCode, setActivationCode] = useState('');

  // Thêm state để quản lý hộp thoại gợi ý
  const [showSuggestionBox, setShowSuggestionBox] = useState(false);

  // Hàm để lấy danh sách tài liệu từ server
  useEffect(() => {
    const getDocuments = async () => {
      let res;
      // If selectedCategory is 'all' or not set, fetch all documents.
      if (selectedCategory === 'all' || selectedCategory === '') {
        res = await fetchAllDocument(searchTerm, selectedCategory, currentPage, documentsPerPage);
      } else {
        // If a specific category is selected, fetch documents for that category.
        res = await fetchDocumentsByCategoryName(selectedCategory, currentPage, documentsPerPage);
      }
      // Check for the response content and set the state accordingly.
      if (res && res.content) {
        setListDocuments(res.content);
        setTotalDocuments(res.totalElements);
      } else if (res && res.content.length === 0) {
        setListDocuments([]);
      }
    };
  
    getDocuments();
  }, [currentPage, searchTerm, selectedCategory, documentsPerPage]);

  // Hàm xử lý khi chuyển trang
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  // Hàm xử lý khi thay đổi danh mục
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(0);
  };

  // Tính toán số lượng trang dựa trên tổng số tài liệu và số lượng tài liệu trên mỗi trang
  const pageCount = Math.ceil(totalDocuments / documentsPerPage);

  // Hàm xử lý khi chọn tài liệu để đặt hàng
  const handleDocumentSelect = (document) => {
    setSelectedDocumentsForOrder((prevSelectedDocuments) => {
      if (prevSelectedDocuments.includes(document)) {
        return prevSelectedDocuments.filter((doc) => doc !== document);
      } else {
        return [...prevSelectedDocuments, document];
      }
    });
  };

  // Hàm xử lý khi đặt hàng
  const handlePlaceOrder = () => {
    placeOrder(validDays)
      .catch((error) => {
        console.error('Error placing order:', error);
        alert('Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại sau.');
      });
  };

  // Hàm xử lý khi thêm tài liệu vào giỏ hàng
  const handleAddToCart = (documentId) => {
    addItemToCart(documentId)
      .catch((error) => {
        console.error('Error adding to cart:', error);
        alert('Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.');
      });
  };

  // Hàm xử lý khi xóa tài liệu khỏi giỏ hàng
  const handleRemoveFromCart = (documentId) => {
    removeItemFromCart(documentId)
      .catch((error) => {
        console.error('Error removing from cart:', error);
        alert('Đã xảy ra lỗi khi xóa sản phẩm khỏi giỏ hàng. Vui lòng thử lại sau.');
      });
  };

  // Hàm xử lý khi thay đổi số lượng tài liệu trong giỏ hàng
  const handleQuantityChange = (documentId, quantity) => {
    updateItemQuantity(documentId, quantity)
      .catch((error) => {
        console.error('Error updating cart quantity:', error);
        alert('Đã xảy ra lỗi khi cập nhật số lượng sản phẩm trong giỏ hàng. Vui lòng thử lại sau.');
      });
  };

  // Hàm xử lý khi hiển thị modal chi tiết tài liệu
  const handleShowDocumentDetail = (document) => {
    setSelectedDocument(document);
    setShowDocumentModal(true);
  };

  // Hàm xử lý khi đóng modal chi tiết tài liệu
  const handleCloseDocumentModal = () => {
    setShowDocumentModal(false);
    setSelectedDocument(null);
  };

  // Hàm xử lý khi nhấn nút đọc tài liệu
  const handleReadDocument = (documentId) => {
    window.location.href = `/read/${documentId}/pdf`;
  };

  // Hàm xử lý khi gửi mã kích hoạt
  const handleActivationCodeSubmit = () => {
    if (activationCode.trim() === '') {
      alert('Vui lòng nhập mã kích hoạt.');
      return;
    }
  
  };

  const handleSuggestionSelected = async (suggestion) => {
    try {
      const docDetail = await fetchDocumentDetail(suggestion.id); // Giả định bạn có hàm fetchDocumentDetail
      setSelectedDocument(docDetail);
      setShowDocumentModal(true);
    } catch (error) {
      console.error('Error fetching document detail:', error);
      alert('Failed to fetch document details. Please try again.');
    }
  };
  

  return (
    <>
      {/* Carousel */}
      <Carousel>
        {/* Đây là nơi bạn có thể thêm hình ảnh slider */}
      </Carousel>

      {/* Danh sách tài liệu */}
      <Container className="mt-5">
        {/* Tìm kiếm và lọc */}
        <Row className="mb-4 align-items-center">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <SearchInput
                  searchTerm={searchTerm}
                  onSearchTermChange={setSearchTerm}
                  onSuggestionSelected={handleSuggestionSelected}
                  placeholder="Tìm kiếm tài liệu..."
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FaListAlt />
                </InputGroup.Text>
                <Form.Select
                  aria-label="Select category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="all">Tất cả</option>
                  <option value="Nguyen Minh Phuong">Nguyen Minh Phuong</option>
                  <option value="category2">Thể loại 2</option>
                  {/* Thêm các lựa chọn khác */}
                </Form.Select>
              </InputGroup>
            </Col>
          </Row>

        {/* Danh sách tài liệu */}
        <Row xs={1} md={2} lg={3} className="g-4">
          {listDocument.map((item) => (
            <Col key={item.id} md={4} className="mb-4">
              <Card>
                {/* Hình ảnh tài liệu */}
                <Card.Img
                  variant="top"
                  src={item.thumbnail}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleShowDocumentDetail(item)}
                />
                <Card.Body>
                  {/* Tên tài liệu */}
                  <Card.Title>
                    {item.name}{' '}
                    <FaBookOpen style={{ color: 'green', verticalAlign: 'middle' }} />
                  </Card.Title>
                  {/* Quyền đọc tài liệu */}
                  <ListGroup.Item>
            <Badge bg={item.drmEnabled ? 'success' : 'danger'}>
              {item.drmEnabled ? (
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
                  {/* Nút đọc tài liệu */}
                  {user.auth && (
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => handleReadDocument(item.id)}
                    >
                      <FaBookOpen className="me-2" /> Truy Vấn Tài Liệu
                    </Button>
                  )}
                  {/* Nút xin quyền đọc */}
                  {user.auth && item.drmEnable && item.activationCode.status !== 'USED' && (
                    <Button
                      variant="warning"
                      onClick={() => handleDocumentSelect(item)}
                      disabled={selectedDocumentsForOrder.includes(item)}
                      className="me-2"
                    >
                      <FaLockOpen className="me-2" />
                      {selectedDocumentsForOrder.includes(item)
                        ? 'Đã Chọn Xin Quyền'
                        : 'Xin Quyền Đọc'}
                    </Button>
                  )}
                  {/* Nút thêm vào giỏ hàng */}
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(item.id)}
                    className="me-2"
                  >
                    <FaShoppingCart className="me-2" /> Xin Quyền Truy Vấn Tài Liệu
                  </Button>
                  {/* Nút xem chi tiết */}
                  <Button
                    variant="info"
                    onClick={() => handleShowDocumentDetail(item)}
                  >
                    <FaInfoCircle className="me-2" /> Xem Chi Tiết Tài Liệu
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Phân trang */}
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />

        
      </Container>

      {/* Modal chi tiết tài liệu */}
      <Modal
        show={showDocumentModal}
        onHide={handleCloseDocumentModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi Tiết Tài Liệu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDocument && (
            <
              DocumentDetail  document={selectedDocument} 
              onReadDocument={handleReadDocument} 
              onAddToCart={handleAddToCart} 
            />
          )}
        </Modal.Body>
      </Modal>

      
    </>
  );
};

export default TableUsers;