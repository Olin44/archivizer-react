import axios from 'axios';
import authHeader from './auth-header';

export default new class FilesService{
    SERVICE_URL = "http://localhost:8080/api/files";
    config = { headers: authHeader()}
    user = JSON.parse(localStorage.getItem('user'));


    getListCount(){
        return axios.get(this.SERVICE_URL + '/count' + '?roles=' + this.user.roles.toString(), this.config)
    }

    deleteLanguage(id){
        return axios.delete('http://localhost:8080/api/language/' + id, this.config)
    }

    getAll(page, pageSize){
        console.log(this.roles);
        return axios.get(this.SERVICE_URL + '?pageNo=' + page + '&pageSize=' + pageSize + '&roles=' + this.user.roles.toString(),  this.config)
    }

}