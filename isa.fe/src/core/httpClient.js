import axios from "axios";

export const Axios = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000,
    headers : {
        'Content-Type': 'application/json',
    }
})


export const get = async (url, params) => {
    return await Axios.get(url, {params})
}