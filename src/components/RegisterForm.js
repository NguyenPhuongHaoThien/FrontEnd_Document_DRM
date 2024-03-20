import { useState, useContext } from 'react';
import { registerApi, loginApi } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { loginContext } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const data = await registerApi(username, email, password, confirmPassword);
      console.log('Registration response:', data);
  
      if (data === 'User created successfully') {
        toast.success('Registration successful!');
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error('Error registering user:', err);
      toast.error('Registration failed. Please try again.');
    }
  }

  return (
    <div className="login-container">
      <div className="title">Register</div>
      <div className="text" style={{ textAlign: 'left' }}>Username</div>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <div className="text" style={{ textAlign: 'left' }}>Email</div>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <div className="text" style={{ textAlign: 'left' }}>Password</div>
      <div className="input-2">
        <input
          type={isShowPassword ? 'text' : 'password'}
          placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <FontAwesomeIcon
          icon={isShowPassword ? faEyeSlash : faEye}
          onClick={() => setIsShowPassword(!isShowPassword)}
        />
      </div>
      <div className="text" style={{ textAlign: 'left' }}>Confirm Password</div>
      <div className="input-2">
        <input
          type={isShowPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <FontAwesomeIcon
          icon={isShowPassword ? faEyeSlash : faEye}
          onClick={() => setIsShowPassword(!isShowPassword)}
        />
      </div>
      <button
        className={username && email && password && confirmPassword ? 'button active' : 'button'}
        disabled={!username || !email || !password || !confirmPassword}
        onClick={handleRegister}
      >
        Register
      </button>
      <div className="back" onClick={() => navigate('/login')}>
        &laquo; Go back
      </div>
    </div>
  );
}

export default RegisterForm;