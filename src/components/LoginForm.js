import '../App.scss';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { loginApi, verifyOTPApi } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSync } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import backgroundImage from '../assets/OIG1.h.jpg';

const LoginForm = () => {
  const navigate = useNavigate();
  const { loginContext } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [otp, setOTP] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []);

  const handleLogin = async (email, password) => {
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    if (!password) {
      toast.error('Please enter your password');
      return;
    }

    if (password !== '' && password === password.toUpperCase()) {
      toast.warning('Caps Lock is on');
    }

    setLoadingApi(true);
    try {
      const res = await loginApi(email, password);
      console.log('Login API response:', res);
      if (res.data.success) {
        setIsOTPSent(true);
        setUserId(res.data.data.userId);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login');
    } finally {
      setLoadingApi(false);
    }
  };

  

  const handleVerifyOTP = async () => {
    setLoadingApi(true);
    try {
      const res = await verifyOTPApi({ otp, userId });
      console.log('Verify OTP API response:', res);
      if (res.data.success) {
        const { token, id, role, email } = res.data.data;
        localStorage.setItem('token', token);
        loginContext(email, token, id, role);
        navigate('/');
        window.location.reload();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      toast.error('An error occurred during OTP verification');
    } finally {
      setLoadingApi(false);
    }
  };
  

  const handlePressEnter = (event) => {
    if (event.key === 'Enter') {
      if (isOTPSent) {
        handleVerifyOTP();
      } else {
        handleLogin(email, password);
      }
    }
  };

  return (
    <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-container">
        <div className="title">Đăng Nhập</div>
        <div className="text">Địa Chỉ Email</div>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="input-2">
          Mật Khẩu
          <input
            type={isShowPassword === true ? 'text' : 'password'}
            placeholder="Nhập Mật Khẩu"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => handlePressEnter(event)}
          />
          <FontAwesomeIcon
            icon={isShowPassword ? faEyeSlash : faEye}
            onClick={() => setIsShowPassword(!isShowPassword)}
          />
        </div>
        {isOTPSent ? (
          <>
            <div className="text">Mã Xác Thực đOTP</div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(event) => setOTP(event.target.value)}
              onKeyDown={(event) => handlePressEnter(event)}
            />
            <button
              className={otp ? 'button active' : 'button'}
              disabled={!otp || loadingApi}
              onClick={handleVerifyOTP}
            >
              {loadingApi && <FontAwesomeIcon icon={faSync} spin />}
              &nbsp; Xác Thực OTP
            </button>
            

          </>
          
        ) : (
          <button
            className={email && password ? 'button active' : 'button'}
            disabled={!email || !password || loadingApi}
            onClick={() => handleLogin(email, password)}
          >
            
            {loadingApi && <FontAwesomeIcon icon={faSync} spin />}
            &nbsp; Đăng Nhập
          </button>
        )}
        <div className="back" onClick={() => navigate('/intro')}>
          &laquo; Quay lại trang chủ
        </div>
        <div className="forgot-password" onClick={() => navigate('/forgot-password')}>
             Quên Mật Khẩu ?
            </div>
      </div>
    </div>
  );
};

export default LoginForm;