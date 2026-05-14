import api from './api';

const authService = {
  login: async ({ username, password }) => {
    const response = await api.post('/auth/login', { username, password });
    if (response?.data?.token) {
      localStorage.setItem('kognivexToken', response.data.token);
    }
    return response.data;
  }
};

export default authService;
