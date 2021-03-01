import axios from 'axios';
import authHeader from './auth-header';

export default new class QualificationsService{
    SERVICE_URL = "http://localhost:8080/api/qualifications";
    SERVICE_URL2 = "http://localhost:8080/api/qualification/";
    config = { headers: authHeader()}

    getAllWithPagination(page, pageSize){
        return axios.get(this.SERVICE_URL + '?pageNo=' + page + '&pageSize=' + pageSize, this.config)
    }

    getCount(){
        return axios.get(this.SERVICE_URL + '/count', this.config)
    }

    deleteById(id){
        return axios.delete(this.SERVICE_URL2  + id, this.config)
    }

    update(id, body){
        return axios.post(this.SERVICE_URL2 + id, body)
    }

    get(id){
        return axios.get(this.SERVICE_URL2 + id)
    }

    create(body){
        return axios.post(this.SERVICE_URL2, body)
    }

    getQualificationWithoutPagination(){
        return axios.get(this.SERVICE_URL + "/withoutPagination")
    }
}