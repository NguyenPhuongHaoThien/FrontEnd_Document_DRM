// src/components/ReadingHistory.js
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { fetchReadingHistory, getDocumentById } from '../services/DocumentService';
import { FaBookOpen } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const ReadingHistory = () => {
  const [readingHistory, setReadingHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { user } = useContext(UserContext);
  const itemsPerPage = 10;

const [documents, setDocuments] = useState({});

useEffect(() => {
  const getReadingHistory = async () => {
    try {
      const data = await fetchReadingHistory(user.id);
      setReadingHistory(data);

      const documentPromises = data.map(async (item) => {
        const document = await getDocumentById(item.documentId);
        return { documentId: item.documentId, document };
      });

      const documentMap = await Promise.all(documentPromises);
      const documentDict = Object.fromEntries(documentMap.map(({ documentId, document }) => [documentId, document]));
      setDocuments(documentDict);
    } catch (error) {
      console.error('Error fetching reading history:', error);
      alert('Failed to fetch reading history. Please try again.');
    }
  };

  if (user.auth) {
    getReadingHistory();
  }
}, [user]);

const handleReadDocument = (documentId, currentPage) => {
  window.location.href = `/read/${documentId}/pdf?page=${currentPage}`;
};

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const pageCount = Math.ceil(totalPages / itemsPerPage);

  return (
    <Container className="mt-5">
      <h2>Lịch Sử Đọc Gần Nhất</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
      {readingHistory.map((item) => (
        <Col key={item.id}>
          <Card>
            <Card.Body>
              <Card.Title>{documents[item.documentId]?.name || 'Tài liệu không có tên'}</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>Ngày đọc: {new Date(item.timestamp).toLocaleString()}</ListGroup.Item>
                <ListGroup.Item>Trang đọc gần nhất: {item.currentPage}</ListGroup.Item>
              </ListGroup>
              {documents[item.documentId] && (
                <Button
                variant="success"
                onClick={() => handleReadDocument(documents[item.documentId].id, item.currentPage)}
              >
                <FaBookOpen className="me-2" /> Đọc Tiếp
              </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
      {/* <ReactPaginate
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
      /> */}
    </Container>
  );
};

export default ReadingHistory;