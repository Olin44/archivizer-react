import axios from 'axios';
import authHeader from './auth-header';

export default new class UserService{
    USER_SERVICE_URL = "http://localhost:8080/api/users1";
    getUsers(page, pageSize){
        return axios.get(this.USER_SERVICE_URL + '?pageNo=' + page + '&pageSize=' + pageSize, { headers: authHeader()})

    }
}