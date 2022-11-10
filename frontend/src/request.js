import axios from "axios";
import {Navigate} from 'react-router-dom'


export function request(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:8888',
        timeout: 5000
    });

    //前置拦截，我们在这里统一将token设置到请求头中
    instance.interceptors.request.use(handle => {
        console.log("我request11了！！")
        //seesionStorage中的数据当页面关闭就会消失
        const token = sessionStorage.getItem("token");
        handle.headers.Authorization = token;
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