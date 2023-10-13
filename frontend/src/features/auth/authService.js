import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    const userWithExpiration = {
      data: response.data,
      expiration: Date.now() + 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
    };
    localStorage.setItem('user', JSON.stringify(userWithExpiration));
  }
  return response.data;
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "userlogin", userData);
  if (response.data) {
    const userWithExpiration = {
      data: response.data,
      expiration: Date.now() + 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
    };
    localStorage.setItem('user', JSON.stringify(userWithExpiration));
  }
  return response.data;
}


// Logout user
const logout = async () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  login,
  logout,
}

export default authService