import axios from "axios";
import {createBrowserHistory} from 'history'

const history = createBrowserHistory();

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:8888',
        timeout: 5000
    });

    instance.interceptors.request.use(handle => {
        const token = sessionStorage.getItem("token");
        handle.headers.Authorization = token;
        return handle;
    }, error => {
        return Promise.reject(error);
    })


    instance.interceptors.response.use(handle => {

        if(handle.data.code === 200) {
            return handle.data;
        }else if(handle.data.code === 6004) {
            history.push("/login");
            history.go();
        }
        else if(handle.data.code === -999) {
            history.push('/login');
            history.go();
        }
        else {
            return handle.data;
        }
    },error => {
        return 'Hello';
    })

    return instance(config);
}