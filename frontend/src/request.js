import axios from "axios";
import {createBrowserHistory} from 'history'

const history = createBrowserHistory();

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


    //后置拦截，对各种错误进行处理
    instance.interceptors.response.use(handle => {

        //服务器响应正确的数据
        if(handle.data.code === 200) {
            console.log(111,handle.data); 
            return handle.data;
        }else if(handle.data.code === 6004) {
            //未登录
            history.push("/login");
            history.go();
        }
        else if(handle.data.code === -999) {
            //非法进入详情页
            history.push('/login');
            history.go();
        }
        else {
            return handle.data.msg;
        }
    },error => {
        return '连接异常';
    })

    return instance(config);
}