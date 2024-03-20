import React, { useState, useEffect } from 'react';
import { fetchAllDocument, deleteDocument } from "../services/DocumentService";
import { Container, Table, Button, Modal, Card } from 'react-bootstrap';
import DocumentForm from './DocumentForm';
import { FileEarmarkPdfFill } from 'react-bootstrap-icons';
import { XCircleFill } from 'react-bootstrap-icons';
import ReactPaginate from 'react-paginate';

const DocumentTable = () => {
    const [listDocument, setListDocuments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentDocument, setCurrentDocument] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [documentToDelete, setDocumentToDelete] = useState(null);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const documentsPerPage = 10; // 

    useEffect(() => {
        getDocuments().then(r => console.log(r)).catch(e => console.error(e));
      }, [currentPage]);
    
      const getDocuments = async () => {
        let response = await fetchAllDocument('', '', currentPage, documentsPerPage);
        if (response && response.content) {
          setListDocuments(response.content);
          setTotalDocuments(response.totalElements);
        }
      };

    const handleUpdateDocument = (document) => {
        setCurrentDocument(document);
        setShowModal(true);
    };


    const handleAddDocument = () => {
        setCurrentDocument(null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        getDocuments().then(r => console.log(r)).catch(e => console.error(e));
    };

    const handleDeleteDocument = (document) => {
        setDocumentToDelete(document);
        setShowDeleteModal(true);
    };

    const confirmDeleteDocument = async () => {
        try {
            await deleteDocument(documentToDelete.id);
            console.log('Xóa tài liệu thành công');
            getDocuments().then(r => console.log(r)).catch(e => console.error(e));
        } catch (error) {
            console.error('Đã có lỗi xảy ra', error);
        } finally {
            setShowDeleteModal(false);
            setDocumentToDelete(null);
        }
    };

    const renderPdfIcon = (pdfUrl) => {
        return pdfUrl ? (
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                <FileEarmarkPdfFill color="red" size={20} />
            </a>
        ) : (
            <XCircleFill color="grey" size={20} /> 
        );
    };


      const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
      };


      const pageCount = Math.ceil(totalDocuments / documentsPerPage);

    return (
        <Container>
            <Card className="mb-3">
                <Card.Header as="h5">Quản lý tài liệu</Card.Header>
                <Card.Body>
                    <Button variant="primary" onClick={handleAddDocument} className="mb-3">
                        Thêm Tài Liệu
                    </Button>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Tên Tài liệu</th>
                                <th>ID tác giả</th>
                                <th>ID nhà xuất bản</th>
                                <th>ID danh mục</th>
                                <th>URL hình ảnh</th>
                                <th>URL PDF</th>
                                <th>Ngày xuất bản</th>
                                <th>Mô tả sách</th>
                                <th>DRM Enabled</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listDocument.map((document) => (
                                <tr key={document.id}>
                                    <td>{document.name}</td>
                                    <td>{document.authorId}</td>
                                    <td>{document.publisherId}</td>
                                    <td>{document.categoryId}</td>
                                    <td>
                                        <img src={document.thumbnail} alt="Document thumbnail" style={{width: '100px', height: 'auto'}} />
                                    </td>
                                    <td>{renderPdfIcon(document.pdfUrl)}</td>
                                    <td>{document.publicationDate}</td>
                                    <td>{document.description}</td>
                                    <td>{document.drmEnabled ? 'Yes' : 'No'}</td>
                                    <td>{document.status}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleUpdateDocument(document)} className="me-2">
                                            Update
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteDocument(document)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

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

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{currentDocument ? 'Chỉnh sửa Tài liệu' : 'Thêm Tài liệu Mới'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DocumentForm document={currentDocument} onClose={handleCloseModal} />
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa tài liệu này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Hủy bỏ
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteDocument}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default DocumentTable;