import axios from 'axios';
import authHeader from './auth-header';

export default new class LanguageService{
    SERVICE_URL = "http://localhost:8080/api/languages";
    config = { headers: authHeader()}

    getLanguages(page, pageSize){
        return axios.get(this.SERVICE_URL + '?pageNo=' + page + '&pageSize=' + pageSize, this.config)
    }

    getLanguagesListCount(){
        return axios.get(this.SERVICE_URL + '/count', this.config)
    }

    deleteLanguage(id){
        return axios.delete('http://localhost:8080/api/language/' + id, this.config)
    }

    getLanguagesWithoutPagination(){
        return axios.get(this.SERVICE_URL + "/withoutPagination")
    }

}