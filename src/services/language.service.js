import axios from 'axios';
import authHeader from './auth-header';
import authHeader2 from './auth-header2';

var headers = {
    'Content-Type': 'application/json'
}

export default new class LanguageService{
    SERVICE_URL = "http://localhost:8080/api/language/";
    config = { headers: authHeader()}

    getLanguage(id){
        return axios.get(this.SERVICE_URL + id, this.config)
    }

    updateLanguage(id, body){
        return axios.post(this.SERVICE_URL + id, body)
    }

    create(body){
        return axios.post(this.SERVICE_URL, body)
    }

}