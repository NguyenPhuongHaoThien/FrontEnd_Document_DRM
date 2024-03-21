import React, { useEffect, useState } from 'react';
import { fetchAllCategories, deleteCategory, createCategory, updateCategory } from '../services/CategoryService';
import { Button, Card, Container, Table, Modal } from 'react-bootstrap';
import CategoryForm from './CategoryForm';

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await fetchAllCategories();
    setCategories(data);
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setShowModal(true);
  };

  const handleChangeCategory = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDeleteCategory = async (category) => {
    await deleteCategory(category);
    fetchCategories();
  };

  const handleFormSubmit = async (category) => {
    if (category.id) {
      await updateCategory(category);
    } else {
      await createCategory(category);
    }
    setShowModal(false);
    fetchCategories();
  };

  return (
    <Container>
      <Card className="mb-3">
        <Card.Header as="h5">Quản lý danh mục</Card.Header>
        <Card.Body>
          <Button variant="primary" onClick={handleAddCategory} className="mb-3">
            Thêm Hồ Sơ Loại Tài Liệu
          </Button>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Mã Loại Tài Liệu</th>
                <th>Tên Loại Tài Liệu</th>
                <th>Mô Tả Loại Tài Liệu</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleChangeCategory(category)}
                      className="me-2"
                    >
                      Cập nhật loại tài liệu
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteCategory(category)}
                    >
                      Xóa loại tài liệu
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory ? 'Update Category' : 'Add Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryForm category={selectedCategory} onSubmit={handleFormSubmit} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CategoryTable;