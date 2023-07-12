import axios from "axios"
//доп настройки axios 

// стандартный путь для отправки запросов 
const instance = axios.create({
    baseURL: "http://localhost:5000/api/"
})

// добавляет токен в хедер запросов 
instance.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config;
})

export default instance