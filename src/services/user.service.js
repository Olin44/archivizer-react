import axios from 'axios';
import authHeader from './auth-header';

const API_URL2 = 'http://localhost:8080/api/test/';
const API_URL = 'http://localhost:8080/api/user/';


class UserService {
  getPublicContent() {
    return axios.get(API_URL2 + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL2 + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL2 + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL2 + 'admin', { headers: authHeader() });
  }

  deleteUser(id){
    return axios.delete(API_URL + id, { headers: authHeader() })
  }

  updateUser(id, body) {
    return axios.post(API_URL + id, body, {headers: authHeader() })
  }
}

export default new UserService();
