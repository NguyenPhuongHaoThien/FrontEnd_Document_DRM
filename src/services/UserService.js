import axios from './axios'; 


const loginApi = (email, password) => {
  return axios.post('/login', { email, password });
}

const fetchData = async () => {
  try {
    const response = await axios.get('/some-api-endpoint');
    console.log('API response:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


const registerApi = async (username, email, password, confirmPassword) => {
  const response = await axios.post('/register', { username, email, password , confirmPassword});
  return response.data;
};

export { loginApi, registerApi,fetchData };