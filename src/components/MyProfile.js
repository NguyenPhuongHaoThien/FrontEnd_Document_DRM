import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { fetchUserById, updateUserProfile } from '../services/UserService';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { FaUserCircle, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaMars, FaVenus, FaCalendarAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = () => {
    const { user } = useContext(UserContext);
    const [userProfile, setUserProfile] = useState(null);
    const [updatedProfile, setUpdatedProfile] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user && user.id) {
                try {
                    const userData = await fetchUserById(user.id);
                    setUserProfile(userData);
                    setUpdatedProfile({ ...userData }); // Khởi tạo updatedProfile từ dữ liệu người dùng hiện tại
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            }
        };

        fetchUserProfile();
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUpdatedProfile((prevState) => ({ ...prevState, avatar: file }));
        setPreviewAvatar(URL.createObjectURL(file));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUserProfile(user.id, updatedProfile);
            setUserProfile(updatedUser);
            setPreviewAvatar(null); // Reset the preview after successful update
            toast.success('Cập nhật thông tin thành công!'); // Hiển thị thông báo thành công
        } catch (error) {
            console.error('Error updating user profile:', error);
            toast.error('Có lỗi xảy ra khi cập nhật thông tin!'); // Hiển thị thông báo thất bại
        }
    };

    return (
        <Container>
            {userProfile ? (
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h2 className="mb-4">
                            <FaUserCircle className="me-2" />
                           Hồ Sơ Nhân Viên
                        </h2>
                        <Form onSubmit={handleUpdateProfile}>
                            <Form.Group controlId="formAvatar" className="mb-3">
                                <Form.Label>
                                    <FaUserCircle className="me-2" />
                                    Hình Đại Diện
                                </Form.Label>
                                <div className="d-flex align-items-center">
                                    <Image
                                        src={previewAvatar || `data:image/jpeg;base64,${userProfile.avatar}`}
                                        roundedCircle
                                        width="100"
                                        height="100"
                                        className="me-3"
                                    />
                                    <Form.Control type="file" name="avatar" onChange={handleFileChange} />
                                </div>
                            </Form.Group>

                            <Form.Group controlId="formUsername" className="mb-3">
                                <Form.Label>
                                    <FaUserCircle className="me-2" />
                                    Username
                                </Form.Label>
                                <Form.Control type="text" value={userProfile.username} disabled />
                            </Form.Group>

                            <Form.Group controlId="formUsername" className="mb-3">
                                <Form.Label>
                                    <FaUserCircle className="me-2" />
                                    Chức Vụ
                                </Form.Label>
                                <Form.Control type="text" value={userProfile.position} disabled />
                            </Form.Group> 

                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>
                                    <FaEnvelope className="me-2" />
                                    Địa Chỉ Email
                                </Form.Label>
                                <Form.Control type="email" value={userProfile.email} disabled />
                            </Form.Group>

                            <Form.Group controlId="formPhone" className="mb-3">
                                <Form.Label>
                                    <FaPhoneAlt className="me-2" />
                                    Số Điện Thoại
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={updatedProfile.phone || ''}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formFullname" className="mb-3">
                                <Form.Label>Họ Tên Nhân Viên</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullname"
                                    value={updatedProfile.fullname || ''}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formAddress" className="mb-3">
                                <Form.Label>
                                    <FaMapMarkerAlt className="me-2" />
                                    Địa Chỉ Nhân Viên
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={updatedProfile.address || ''}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formSex" className="mb-3">
                                <Form.Label>
                                    <FaMars className="me-2 text-primary" />
                                    <FaVenus className="me-2 text-danger" />
                                    Giới Tính
                                </Form.Label>
                                <Form.Select
                                    name="sex"
                                    value={updatedProfile.sex || ''}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Chọn</option>
                                    <option value="Male">Nam</option>
                                    <option value="Female">Nữ</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId="formBirthday" className="mb-3">
                                <Form.Label>
                                    <FaCalendarAlt className="me-2" />
                                    Ngày Sinh
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    name="birthday"
                                    value={updatedProfile.birthday || ''}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="subscribe">
                                <Form.Label>Mô tả về bản thân của nhân viên</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập mô tả về bản thân"
                                    name="subscribe"
                                    value={updatedProfile.subscribe || ''}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Cập Nhật Hồ Sơ Nhân Viên
                            </Button>
                        </Form>
                    </Col>
                </Row>
            ) : (
                <div>Loading...</div>
            )}
            <ToastContainer /> {/* Thêm ToastContainer để hiển thị thông báo */}
        </Container>
    );
};

export default MyProfile;