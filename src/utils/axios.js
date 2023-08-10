import axios from "axios"
//доп настройки axios 

// стандартный путь для отправки запросов 
const instance = axios.create({
    //url
    baseURL: "https://admin-vodoley.terexov.ru/api/"
    // baseURL: "http://localhost:4000/api/"
})

// добавляет токен в хедер запросов 
instance.interceptors.request.use(config => {
    const myToken = window.localStorage.getItem('VodoleyToken');
    const token = `token ${myToken}`
    if (myToken) {
        config.headers.Authorization = token;
    }
})

export default instance