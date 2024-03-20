import React, {useEffect, useState} from "react";
import {fetchAllUsers} from "../services/UserService";
import { Button, Card, Container, Modal, Table, Pagination, Image } from "react-bootstrap";
import axios from "../services/axios";
import UserForm from "./UserForm";
import ChangeUserPasswordForm from "./ChangeUserPasswordForm";
import { FaUserEdit, FaUserTimes, FaUnlockAlt, FaUserPlus } from "react-icons/fa";

const UserTable = () => {
    const [listUsers, setListUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);



    useEffect(() => {
        getUsers().then(r => console.log(r)).catch(e => console.error(e));
    }, []);

    const getUsers = async () => {
        let response = await fetchAllUsers();
        if (response) {
            console.log(response);
            setListUsers(response);
        }
    };

    const handleChangeUserPassword = (user) => {
        setCurrentUser(user);
        setShowChangePasswordModal(true);
    }

    const handleAddUser = () => {
        setCurrentUser(null);
        setShowModal(true);
    };

    const handleUpdateUser = (user) => {
        setCurrentUser(user);
        setShowModal(true);
    };

    const handleDeleteUser = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };


    const handleCloseModal = () => {
        setShowModal(false);
        setShowDeleteModal(false);
        setShowChangePasswordModal(false);
        getUsers().then(r => console.log(r)).catch(e => console.error(e));
    };


    const confirmDeleteUser = async () => {
        try {
            let response = await axios.post(`/admin/delete-user`, userToDelete);
            if (response.status === 200) {
                console.log('Xóa người dùng thành công');
                getUsers().then(r => console.log(r)).catch(e => console.error(e));
            } else if (response.status === 403) {
                console.error('Không thể xóa chính mình');
            } else {
                console.error('Xóa người dùng thất bại');
            }
        } catch (error) {
            console.error('Đã có lỗi xảy ra', error);
        } finally {
            setShowDeleteModal(false);
            setUserToDelete(null);
        }
    };

    return (
        <Container>
            <Card className="mb-3">
                <Card.Header as="h5">Quản lý người dùng</Card.Header>
                <Card.Body>
                    <Button variant="primary" onClick={handleAddUser} className="mb-3">
                        Thêm người dùng
                    </Button>
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>Ảnh đại diện</th>
                            <th>Tên người dùng</th>
                            <th>Chức vụ</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Họ và tên</th>
                            <th>Địa chỉ</th>
                            <th>Giới tính</th>
                            <th>Ngày sinh</th>
                            <th>Mô tả bản thân</th>
                            <th>Vai trò</th>
                            <th>Khoá</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listUsers.map((user) => (
                            <tr key={user.id}>
                               <Image
                                    src={`data:image/png;base64,${user.avatar}`} // Assuming avatar is base64 encoded PNG
                                    rounded
                                    fluid
                                    style={{ maxWidth: "50px", maxHeight: "50px" }}
                                />
                                <td>{user.username}</td>
                                <td>{user.position}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.fullname}</td>
                                <td>{user.address}</td>
                                <td>{user.sex}</td>
                                <td>{user.birthday}</td>
                                <td>{user.subscribe}</td>
                                <td>{user.role}</td>
                                <td>{user.locked ? 'Có' : 'Không'}</td>


                                <td>
                                    <Button variant="success" onClick={() => handleChangeUserPassword(user)}
                                            className="me-2">
                                        Đổi mật khẩu
                                    </Button>
                                    <Button variant="warning" onClick={() => handleUpdateUser(user)}
                                            className="me-2">
                                        Update
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDeleteUser(user)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showChangePasswordModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{'Đổi mật khẩu'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ChangeUserPasswordForm userToUpdate={currentUser} onClose={handleCloseModal}/>
                </Modal.Body>
            </Modal>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{currentUser ? 'Chỉnh sửa thông tin người dùng' : 'Thêm người dùng Mới'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserForm userToUpdate={currentUser} onClose={handleCloseModal}/>
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
                    <Button variant="danger" onClick={confirmDeleteUser}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default UserTable;