import axios from "axios"
//доп настройки axios 

// стандартный путь для отправки запросов 
const instance = axios.create({
    //url
    baseURL: "https://admin-vodoley.terexov.ru/api/"
})

// добавляет токен в хедер запросов 
instance.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem('VodoleyToken')
    return config;
})

export default instance