import axios from './axios';


const loginApi = (email, password) => {
    return axios.post('/login', {email, password});
}

const verifyOTPApi = async (data) => {
    const response = await axios.post('/verifyOTP', data);
    return response;
  };


const forgotPasswordApi = async (data) => {
    const response = await axios.post('/forgot-password', data);
    return response;
    };

const verifyResetPasswordTokenApi = async (data) => {
    const response = await axios.post('/verify-reset-password-token', data);
    return response;
    };

const resetPasswordApi = async (data) => {
    const response = await axios.post('/reset-password', data);
    return response;
    };

const fetchAllUsers = async () => {
    try {
      let response = await axios.get('/admin/users');

        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


const registerApi = async (username, email, password, confirmPassword) => {
    const response = await axios.post('/register', {username, email, password, confirmPassword});
    return response.data;
};


const fetchUserById = async (userId) => {
    try {
      const response = await axios.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  };

// UserService.js
const updateUserProfile = async (userId, updatedData) => {
    try {
        const formData = new FormData();
        if (updatedData.avatar) {
            formData.append('avatar', updatedData.avatar);
        }
        formData.append('phone', updatedData.phone);
        formData.append('address', updatedData.address);
        formData.append('sex', updatedData.sex);
        formData.append('fullname', updatedData.fullname);
        formData.append('birthday', updatedData.birthday);
        formData.append('subscribe', updatedData.subscribe);

        const response = await axios.put(`/user/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

const fetchHistoryOrders = async () => {
    try {
      const response = await axios.get('/user/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching history orders:', error);
      throw error;
    }
  };


export {loginApi, forgotPasswordApi, verifyResetPasswordTokenApi, resetPasswordApi, verifyOTPApi, registerApi, fetchAllUsers, fetchUserById, updateUserProfile, fetchHistoryOrders };