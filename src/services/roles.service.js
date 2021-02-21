import axios from 'axios';
import authHeader from './auth-header';

export default new class UserService {
    USER_SERVICE_URL = "http://localhost:8080/api/";
    config = {headers: authHeader()}

    getRoles() {
        return axios.get(this.USER_SERVICE_URL + 'roles', this.config);
    }

}

