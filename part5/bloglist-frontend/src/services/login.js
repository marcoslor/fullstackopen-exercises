import axios from 'axios';

const baseUrl = '/api/login';

const login = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password });
  if (response.data?.token) {
    return response.data;
  }
  if (response.data?.error) {
    throw new Error(response.data.error);
  }
};

export default { login }