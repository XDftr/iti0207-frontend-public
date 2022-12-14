import axios from 'axios';

export default axios.create({
    baseURL: "http://parkla.ddns.net/"
})

export function getToken() {
    return window.sessionStorage.getItem("token")
}