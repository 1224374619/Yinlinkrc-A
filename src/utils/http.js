"use strict";

import Vue from 'vue';
import axios from "axios";
import queryString from 'querystring'
import store from '../store/index'
import router from '../router'
import Cookies from 'js-cookie'
import {
    Message
} from 'element-ui';

// application/x-www-from-urlencode mime
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = [function (data) {
//     return queryString.stringify(data)
// }]
// 添加请求拦截器
let config = {
    //判断当前开发环境，切换代理配置
    // baseURL: process.env.NODE_ENV === 'production' ? '/api/v1/' : '/api/',
    baseURL: '/api/',
    // headers: {
    //     'Auth-Token': token
    // },
    timeout: 60 * 1000, // Timeout
    withCredentials: true, // Check cross-site Access-Control
};
const _axios = axios.create(config);
const _axioes = axios.create(config);
// 添加request拦截器 
_axios.interceptors.request.use(
    function (config) {
        let token = Cookies.get('token')
        if (token) {
            config.headers['Auth-Token'] = token;
        }
        return config
    },
    function (error) {

        Promise.reject(error)
    })

// /api/v1/consumer-user
const instance = axios.create({
    // baseURL: process.env.NODE_ENV === 'production' ? '/api/v1/consumer-user' : '/api/',
    baseURL: '/api/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [(data) => queryString.stringify(data)]
})
Vue.prototype.$_http = instance;
const locals = axios.create({
    baseURL: '/api/',
    // headers:{'Auth-Token':store.state.token === ''?'':store.state.token},
    timeout: 60 * 1000, // Timeout
    withCredentials: true, // Check cross-site Access-Control
})
Vue.prototype.$locals = locals;
// 添加request拦截器 
_axioes.interceptors.request.use(
    function (config) {
        if (config.method === 'get') {
            config.paramsSerializer = function (params) {
                return queryString.stringify(params, {
                    arrayFormat: 'repeat'
                })
            }
        }
        let token = Cookies.get('token')
        if (token) {
            config.headers['Auth-Token'] = token;
        }
        return config
    },
    function (error) {
        Promise.reject(error)
    })

// // http response 拦截器
// _axios.interceptors.response.use(
//     response => {
//         let token = Cookies.get('token')
//         if (!token) {
//             Message({
//                 showClose: true,
//                 message: '登录超时，请重新登录',
//                 type: 'error'
//             });
//             router.replace('/home');
//         }
//         return response;
//     },
//     error => {
//         router.replace({
//             path:'/login',
//             query:{redirect:router.currentRoute.fullPath}
//         })
//         // if (error.response.status === 403) {
//         //     Message.error({
//         //         title: '错误',
//         //         message: '请登录'
//         //     });
//         //     router.replace('/login');
//         // }
//         // router.replace('/login');
//         // Message.error({
//         //     title: '错误',
//         //     message: error.response.data.message
//         // });
//         return Promise.reject(error);
//     }
// );
Plugin.install = function (Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        http: {
            get() {
                return _axios;
            }
        },
        $http: {
            get() {
                return _axios;
            }
        },
        $local: {
            get() {
                return _axioes;
            }
        },
    });
};
Vue.use(Plugin)

export default _axios;