// import '../App.scss';
// import {useState, useEffect} from 'react';
// import { toast } from 'react-toastify';
// import { loginApi } from '../services/UserService';
// import {useNavigate} from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEye, faEyeSlash, faSync, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
// import {useContext } from 'react';
// import {UserContext} from '../context/UserContext';


// const LoginForm = () => {
//   const navigate = useNavigate();
//   const {loginContext} = useContext(UserContext);
//   const[ email, setEmail] = useState('');
//   const[ password, setPassword] = useState('');
//   const[isShowPassword, setIsShowPassword] = useState(false);
//   const[loadingApi, setLoadingApi] = useState(false);

//   const handleGoBack = () => {
//     navigate('/');
//   }


//   useEffect(()=> { 
//         let token = localStorage.getItem('token');
//         if (token) {
//             navigate('/');
//         }
//     }, []);

//     const handleLogin = async (email, password) => {
//         if (!email || !password) {
//           toast.error('Email and password are required');
//           return;
//         }
//         setLoadingApi(true);
//         try {
//           const res = await loginApi(email, password);
//           if (res.data.success && res.data.data) {
//             const token = res.data.data;
//             localStorage.setItem('token', token);
//             console.log('Token received: ', token);
            
//             loginContext(email,token);
            

//             navigate('/');

//           } else {
//             toast.error('Email or password is incorrect');
//           }
//         } catch (error) {
//           console.error('Error during login:', error);
//           toast.error('An error occurred during login');
//         } finally {
//           setLoadingApi(false);
//         }
//       };

//   return (
//     <div>
//             <> 
//                 <div className="login-container col-12 col-sm-4">
//                     <div className="title">Log in</div>
//                     <div className="Text"> Email </div>
                    
//                     <input type= "type" 
//                         placeholder='Email ... ' 
//                         value ={email} 
//                         onChange={(event)=> setEmail(event.target.value)} 
//                     />
                    
//                     <div className= "input-2">
//                         <input type = {isShowPassword === true ? "Text" : "password"} 
//                             placeholder = "Password ..."
//                             value = {password}
//                             onChange = {(event)=> setPassword(event.target.value)}
//                         />

//                         <FontAwesomeIcon icon={isShowPassword ? faEyeSlash : faEye} onClick={() => setIsShowPassword(!isShowPassword)} />
//                     </div>  

//                         <button 
//                             className={email && password ? "button active" : "button"}
//                             disabled={!email || !password || loadingApi}
//                             onClick={() => handleLogin(email, password)}
//                             >
//                             {loadingApi && <FontAwesomeIcon icon={faSync} spin />}
//                             &nbsp; Login
//                         </button>
//                     <div className = "back"> 
//                         <FontAwesomeIcon icon={faChevronLeft} /> 
//                         <span onClick={()=> handleGoBack()} > Go Back </span>
//                     </div>
//                 </div>
//             </>
//     </div>
//   );
// }

// export default LoginForm;


import '../App.scss';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { loginApi } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSync } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import backgroundImage from '../assets/OIP.jpg'; // Đường dẫn tới hình nền

const LoginForm = () => {
  const navigate = useNavigate();
  const { loginContext } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []);

  const handleLogin = async (email, password) => {
    if (!email) {
      toast.error('Please enter your email ');
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
      if (res.data.success && res.data.data) {
        const token = res.data.data;
        localStorage.setItem('token', token);
        console.log('Token received: ', token);

        loginContext(email, token);

        navigate('/');
      } else {
        toast.error('Email or password is incorrect');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login');
    } finally {
      setLoadingApi(false);
    }
  };

  const handlePressEnter = (event) => {
    if (event.key === 'Enter') {
      handleLogin( email, password);
    }
  }

  return (
    <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-container">
        <div className="title">Log in</div>
        <div className="text">Email </div>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="input-2">Password 
          <input
            type={isShowPassword === true ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}

            onKeyDown= {(event) =>  handlePressEnter(event)}
          />
          <FontAwesomeIcon
            icon={isShowPassword ? faEyeSlash : faEye}
            onClick={() => setIsShowPassword(!isShowPassword)}
          />
        </div>
        <button
          className={email && password ? 'button active' : 'button'}
          disabled={!email || !password || loadingApi}
          onClick={() => handleLogin(email, password)}
        >
          {loadingApi && <FontAwesomeIcon icon={faSync} spin />}
          &nbsp; Login
        </button>
        <div className="back" onClick={() => navigate('/')}>
          &laquo; Go back
        </div>
      </div>
    </div>
  );
};

export default LoginForm;