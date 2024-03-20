import React, { useState } from 'react';
import axios from "../services/axios";
import { Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { Lock } from 'react-bootstrap-icons';

const ChangeUserPasswordForm = ({ userToUpdate, onClose }) => {
    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmNewPassword: '',
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmNewPassword) {
            console.error('Mật khẩu mới và xác nhận mật khẩu mới không khớp');
            return;
        }
        try {
            userToUpdate.password = passwords.newPassword;
            let response = await axios.post(`/admin/change-user-password/`, userToUpdate);

            if (response.status === 200) {
                console.log('Đổi mật khẩu thành công');
                onClose();
            } else {
                console.error('Đổi mật khẩu thất bại');
            }
        } catch (error) {
            console.error('Đã có lỗi xảy ra', error);
        }
    };

    return (
        <Form onSubmit={handleFormSubmit}>
            <h1>Đổi mật khẩu</h1>

            <Form.Group as={Row} className="mb-3" controlId="formNewPassword">
                <Form.Label column sm={2}>Mật khẩu mới:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><Lock/></InputGroup.Text>
                        <FormControl type="password" name="newPassword" value={passwords.newPassword} onChange={handleFormChange} />
                    </InputGroup>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formConfirmNewPassword">
                <Form.Label column sm={2}>Xác nhận mật khẩu mới:</Form.Label>
                <Col sm={10}>
                    <InputGroup>
                        <InputGroup.Text><Lock/></InputGroup.Text>
                        <FormControl type="password" name="confirmNewPassword" value={passwords.confirmNewPassword} onChange={handleFormChange} />
                    </InputGroup>
                </Col>
            </Form.Group>

            <Button variant="primary" type="submit">
                Đổi mật khẩu
            </Button>
        </Form>
    );
};

export default ChangeUserPasswordForm;