import React, { useState } from 'react';
import { Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { Book, Tag, Person, House, Calendar, Image, FileEarmarkText, Percent, ToggleOn, ToggleOff } from 'react-bootstrap-icons';
import { createDocument, updateDocument } from '../services/DocumentService';

const DocumentForm = ({ document, onClose }) => {
    const [formData, setFormData] = useState(document || {
        name: '',
        price: '',
        quantity: '',
        authorId: '',
        publisherId: '',
        categoryId: '',
        thumbnail: '',
        pdfUrl: '',
        publicationDate: '',
        description: '',
        discountId: '',
        drmEnabled: false,
        status: '',
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (document) {
                await updateDocument(formData);
                console.log('Cập nhật tài liệu thành công');
            } else {
                await createDocument(formData);
                console.log('Tạo tài liệu thành công');
            }
            onClose();
        } catch (error) {
            console.error('Đã có lỗi xảy ra', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h1>{document ? 'Cập nhật Hồ Sơ Tài liệu' : 'Tạo Hồ Sơ Tài liệu Mới'}</h1>

            {/* Tên sách */}
            <Form.Group as={Row} className="mb-3" controlId="formName">
                <Form.Label column sm={2}>Tên Tài Liệu:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><Book/></InputGroup.Text>
                        <FormControl type="text" name="name" value={formData.name} onChange={handleChange} />
                    </InputGroup>
                </Col>
            </Form.Group>

            {/* ID tác giả */}
            <Form.Group as={Row} className="mb-3" controlId="formAuthorId">
                <Form.Label column sm={2}>ID lý người / cơ quan ban hành:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><Person/></InputGroup.Text>
                        <FormControl type="text" name="authorId" value={formData.authorId} onChange={handleChange} />
                    </InputGroup>
                </Col>
            </Form.Group>

            {/* ID nhà xuất bản */}
            <Form.Group as={Row} className="mb-3" controlId="formPublisherId">
                <Form.Label column sm={2}>ID người / cơ quan phê duyệt:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><House/></InputGroup.Text>
                        <FormControl type="text" name="publisherId" value={formData.publisherId} onChange={handleChange} />
                    </InputGroup>
                </Col>
            </Form.Group>

            {/* ID danh mục */}
            <Form.Group as={Row} className="mb-3" controlId="formCategoryId">
                <Form.Label column sm={2}>ID Loại Tài Liệu:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text>#</InputGroup.Text>
                        <FormControl type="text" name="categoryId" value={formData.categoryId} onChange={handleChange} />
                    </InputGroup>
                </Col>
            </Form.Group>

            {/* URL hình ảnh */}
            <Form.Group as={Row} className="mb-3" controlId="formThumbnail">
                <Form.Label column sm={2}>URL hình ảnh:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><Image/></InputGroup.Text>
                        <FormControl type="text" name="thumbnail" value={formData.thumbnail} onChange={handleChange} />
                    </InputGroup>
                </Col>
            </Form.Group>

            {/* URL PDF */}
            <Form.Group as={Row} className="mb-3" controlId="formPdfUrl">
                <Form.Label column sm={2}>URL PDF:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><FileEarmarkText/></InputGroup.Text>
                        <FormControl type="text" name="pdfUrl" value={formData.pdfUrl} onChange={handleChange} />
                    </InputGroup>
                </Col>
            </Form.Group>

            {/* Ngày xuất bản */}
            <Form.Group as={Row} className="mb-3" controlId="formPublicationDate">
                <Form.Label column sm={2}>Ngày phê duyệt:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><Calendar/></InputGroup.Text>
                        <FormControl type="date" name="publicationDate" value={formData.publicationDate} onChange={handleChange} />
                    </InputGroup>
                </Col>
            </Form.Group>

            {/* Mô tả sách */}
            <Form.Group as={Row} className="mb-3" controlId="formDescription">
                <Form.Label column sm={2}>Mô tả tài liệu:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><FileEarmarkText/></InputGroup.Text>
                        <FormControl as="textarea" name="description" value={formData.description} onChange={handleChange} />
                    </InputGroup>
                </Col>
            </Form.Group>


            {/* DRM Enabled */}
            <Form.Group as={Row} className="mb-3" controlId="formDRMEnabled">
                <Form.Label column sm={2}>DRM Enabled:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text>{formData.drmEnabled ? <ToggleOn/> : <ToggleOff/>}</InputGroup.Text>
                        <FormControl type="checkbox" name="drmEnabled" checked={formData.drmEnabled} onChange={handleChange} />
                    </InputGroup>
                </Col>
            </Form.Group>

            {/* Trạng thái */}
            <Form.Group as={Row} className="mb-3" controlId="formStatus">
                <Form.Label column sm={2}>Trạng thái tài liệu:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><Tag/></InputGroup.Text>
                        <FormControl type="text" name="status" value={formData.status} onChange={handleChange} />
                    </InputGroup>
                </Col>
            </Form.Group>

            <Button variant="primary" type="submit">
                {document ? 'Cập nhật Hồ Sơ Tài Liệu ' : 'Tạo Hồ Sơ Tài Liệu Mới'}
            </Button>
        </Form>
    );
};

export default DocumentForm;