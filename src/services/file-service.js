import authHeader from "./auth-header";
import axios from "axios";

export default new class FileService{
    SERVICE_URL = "http://localhost:8080/api/file";
    config = { headers: authHeader() }

    get(id){
        return axios.get(this.SERVICE_URL + "/" + id, this.config)
    }

    update(id, body){
        return axios.post(this.SERVICE_URL + "/" + id, body)
    }

    create(body){
        console.log('dupa' + body);
        return axios.post(this.SERVICE_URL, body)}


}