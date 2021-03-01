import axios from 'axios';
import authHeader from './auth-header';

export default new class UserService{
    USER_SERVICE_URL = "http://localhost:8080/api/users";
    config = { headers: authHeader()}

    getUsers(page, pageSize){
        return axios.get(this.USER_SERVICE_URL + '?pageNo=' + page + '&pageSize=' + pageSize, this.config)
    }

    activateUsersAccounts(usersIdList){
        console.log(usersIdList);
        return axios.post(this.USER_SERVICE_URL + "/activateAccounts", {list_of_id_to_activate: usersIdList}, this.config)
    }

    getUsersListCount(){
        return axios.get(this.USER_SERVICE_URL + '/count', this.config)
    }

    getUsersDetails(id){
        return axios.get(this.USER_SERVICE_URL + '/' + id + '/details', this.config)
    }

    getUsersWithoutPagination() {
        return axios.get ("http://localhost:8080/api/usersWithoutPagination", this.config);
    }
}