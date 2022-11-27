import axios from "axios";
import {Navigate} from 'react-router-dom'


export function request(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:8888',
        timeout: 5000
    });

    //interceptors before request
    instance.interceptors.request.use(handle => {
        console.log("I am making a request！！",handle.url)
        if(handle.url==="/user/login"){
            return handle;
        }
        //seesionStorage will lost after closing the page
        const token = sessionStorage.getItem("USER_LOGIN_TOKEN");
        console.log("get token from storage and add it to request head")
        // handle.headers.Authorization = token;
        handle.headers.USER_LOGIN_TOKEN = token;
        console.log("handle",handle);
        return handle;
    }, error => {
        return Promise.reject(error);
    })


    //todo the only use is handle request error like network error
    //need I keep this?
    // instance.interceptors.response.use(handle => {
    //     //todo if 200 green msg else red msg
    //     return handle.data;
    // },error => {
    //     // console.log(error);
    //     return error.message;
    // })

    return instance(config);
}