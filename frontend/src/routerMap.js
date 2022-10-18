/**
 * 定义路由组件，将 auth 设置为 true，表示该路由需要权限校验
 */

import Feeding from "./page/Feeding";
import History from "./page/Feeding_History";
import Login from "./page/Login";
import Register from './page/Register'
import NotFound from './page/NotFound'
import Home from './page/Home'

export const routerMap = [
    {path: "/feeding", name: "Feeding", component: Feeding, auth: true},
    {path: "/History", name: "History", component: History, auth: true},
    {path: "/", name: "home", component: Home},
    {path: "/login", name: "Login", component: Login},
    {path: "/register", name: "Register", component: Register},
    {path: "/404", name: "NotFound", component: NotFound},
];

