import React, { useState } from 'react';
import axios from "../services/axios";
import { Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { Person, Envelope, Telephone, House, Calendar3, PenFill, CardImage, LockFill } from 'react-bootstrap-icons';

const UserForm = ({ userToUpdate, onClose }) => {
    const [newUser, setNewUser] = useState(userToUpdate || {
        username: '',
        position: '', 
        email: '',
        phone: '',
        fullname: '',
        address: '',
        sex: '',
        birthday: '',
        subscribe: '',
        avatar: null,
        role: '',
        isLocked: false, // Sử dụng trường locked thay vì isLocked hoặc status
    });

    const handleFormChange = (e) => {
        const { name, value, checked, type } = e.target;
        setNewUser(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const [isUpdating, setIsUpdating] = useState(!!userToUpdate);


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        // Thêm các trường thông tin người dùng vào formData
        Object.keys(newUser).forEach(key => {
            if (key !== 'avatar') { // Loại bỏ avatar vì sẽ xử lý riêng
                formData.append(key, newUser[key]);
            }
        });
    
        // Thêm file ảnh đại diện vào FormData nếu có
        if (newUser.avatar) {
            formData.append('avatar', newUser.avatar);
        }
    
        // Xác định URL dựa trên việc đây là tạo mới hay cập nhật người dùng
        const url = newUser.id ? '/admin/update-user' : '/admin/create-user';
    
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.status === 200 || response.status === 201) {
                console.log(newUser.id ? 'Cập nhật người dùng thành công' : 'Tạo người dùng thành công');
                onClose();
            } else {
                console.error(newUser.id ? 'Cập nhật người dùng thất bại' : 'Tạo người dùng thất bại');
            }
        } catch (error) {
            console.error('Đã có lỗi xảy ra', error);
        }
    };
        
    


    



    return (
        <Form onSubmit={handleFormSubmit}>
            <h1>{userToUpdate ? 'Cập nhật Người dùng' : 'Tạo Người dùng Mới'}</h1>

            <Form.Group as={Row} className="mb-3" controlId="formUsername">
                <Form.Label column sm={2}>Tên người dùng:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><Person/></InputGroup.Text>
                        <FormControl type="text" name="username" value={newUser.username} onChange={handleFormChange} disabled={isUpdating} />
                    </InputGroup>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPosition">
            <Form.Label column sm={2}>Position:</Form.Label>
            <Col sm={10}>
                <InputGroup>
                <InputGroup.Text><PenFill/></InputGroup.Text>
                <FormControl type="text" name="position" value={newUser.position} onChange={handleFormChange} />
                </InputGroup>
            </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formEmail">
                <Form.Label column sm={2}>Email:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><Envelope/></InputGroup.Text>
                        <FormControl type="email" name="email" value={newUser.email} onChange={handleFormChange} disabled={isUpdating}/>
                    </InputGroup>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPhone">
                <Form.Label column sm={2}>Số điện thoại:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><Telephone/></InputGroup.Text>
                        <FormControl type="text" name="phone" value={newUser.phone} onChange={handleFormChange} />
                    </InputGroup>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formFullname">
                <Form.Label column sm={2}>Họ và tên:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><Person/></InputGroup.Text>
                        <FormControl type="text" name="fullname" value={newUser.fullname} onChange={handleFormChange} />
                    </InputGroup>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formAddress">
                <Form.Label column sm={2}>Địa chỉ:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><House/></InputGroup.Text>
                        <FormControl type="text" name="address" value={newUser.address} onChange={handleFormChange} />
                    </InputGroup>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formSex">
                <Form.Label column sm={2}>Giới tính:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><Person/></InputGroup.Text>
                        <Form.Select name="sex" value={newUser.sex} onChange={handleFormChange}>
                            <option value="">Chọn giới tính</option>
                            <option value="Male">Nam</option>
                            <option value="Female">Nữ</option>
                            <option value="Orther">Khác</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formBirthday">
                <Form.Label column sm={2}>Ngày sinh:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><Calendar3/></InputGroup.Text>
                        <FormControl type="date" name="birthday" value={newUser.birthday} onChange={handleFormChange} />
                    </InputGroup>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formSubscribe">
                <Form.Label column sm={2}>Mô tả bản thân:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><PenFill/></InputGroup.Text>
                        <FormControl as="textarea" name="subscribe" value={newUser.subscribe} onChange={handleFormChange} />
                    </InputGroup>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formAvatar">
                <Form.Label column sm={2}>Ảnh đại diện:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><CardImage/></InputGroup.Text>
                        <FormControl type="file" name="avatar" onChange={(e) => {
                            // Tôi muốn admin upload file được lên luôn khi tạo mới hoặc cập nhật người dùng
                            // Tôi sẽ không kiểm tra file ở đây, nhưng bạn có thể thêm điều kiện kiểm tra file ở đây
                            setNewUser(prevState => ({
                                ...prevState,
                                avatar: e.target.files[0]
                            }));
                            console.log(e.target.files[0]);

                        }} />
                    </InputGroup>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formRole">
                <Form.Label column sm={2}>Vai trò:</Form.Label>
                <Col sm={10}>
                    <Form.Select
                    name="role"
                    value={newUser.role}
                    onChange={handleFormChange}
                    >
                    <option value="ROLE_USER">Người dùng</option>
                    <option value="ROLE_ADMIN">Quản trị viên</option>
                    </Form.Select>
                </Col>
            </Form.Group>



            <Form.Group as={Row} className="mb-3" controlId="formIsLocked">
                <Form.Label column sm={2}>Khóa:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Checkbox name="isLocked" checked={newUser.isLocked} onChange={handleFormChange} />
                    </InputGroup>
                </Col>
            </Form.Group>


            <Button variant="primary" type="submit">
                {userToUpdate ? 'Cập nhật' : 'Tạo'}
            </Button>
        </Form>
    );
};

export default UserForm;