import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Row, Col, Card, Form, Button, Carousel } from 'react-bootstrap';
import { fetchAllDocument } from '../services/DocumentService';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import SearchInput from './SearchInput';

const TableUsers = () => {
    const [listDocument, setListDocuments] = useState([]);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const documentsPerPage = 10;

    useEffect(() => {
        const getDocuments = async () => {
            let res = await fetchAllDocument(searchTerm, selectedCategory, currentPage, documentsPerPage);
            if (res && res.content) {
                setListDocuments(res.content);
                setTotalDocuments(res.totalElements);
            }
        };

        getDocuments();
    }, [currentPage, searchTerm, selectedCategory]);

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(0);
    };

    const pageCount = Math.ceil(totalDocuments / documentsPerPage);

    return (
        <>

            <Carousel>
                {/* Đây là nơi bạn có thể thêm hình ảnh slider */}
            </Carousel>
            <Container className="mt-5">
                <Row className="mb-4">
                    <Col>
                        <SearchInput searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
                    </Col>
                    <Col>
                        <Form.Select aria-label="Select category" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="all">Tất cả</option>
                            <option value="category1">Thể loại 1</option>
                            <option value="category2">Thể loại 2</option>
                            // Thêm các lựa chọn khác
                        </Form.Select>
                    </Col>
                </Row>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {listDocument.length > 0 ? listDocument.map((item, index) => (
                        <Col key={`document-${index}`}>
                        <Card className="h-100 shadow">
                            <Card.Img variant="top" src={item.thumbnail} alt="Thumbnail" />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>Price: {item.price}</Card.Text>
                                <Card.Text>Quantity: {item.quantity}</Card.Text>
                                <Link to={`/read/${item.id}/pdf`}>
                                    <button>Read Book</button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    )) : <p>Không tìm thấy tài liệu nào.</p>}
                </Row>
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
        </>
    );
};

export default TableUsers;
