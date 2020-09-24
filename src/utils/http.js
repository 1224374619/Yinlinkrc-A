// "use strict";

// import Vue from 'vue';
// import axios from "axios";
// import queryString from 'querystring'
// import store from '../store/index'
// import router from '../router/index.js'
// import Cookies from 'js-cookie'


// // application/x-www-from-urlencode mime
// // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// // axios.defaults.transformRequest = [function (data) {
// //     return queryString.stringify(data)
// // }]
// // 添加请求拦截器
// let config = {
//     //判断当前开发环境，切换代理配置
//     // baseURL: process.env.NODE_ENV === 'production' ? '/api/v1/' : '/api/',
//     baseURL: '/api/',
//     // headers: {
//     //     'Auth-Token': token
//     // },
//     timeout: 60 * 1000, // Timeout
//     withCredentials: true, // Check cross-site Access-Control
// };
// const _axios = axios.create(config);
// const _axioes = axios.create(config);
// // 添加request拦截器 
// _axios.interceptors.request.use(
    
//     function (config) {
//         console.log('1111111111111111111111')
//         let token = Cookies.get('Btoken')
//         if (token) {
//             router.push({
//                 name: 'login',
//                 query: {
//                   redirect: window.location.hash
//                 }
//               })
//             config.headers['Auth-Token'] = token;
//         }
//         return config
//     },
//     function (error) {
//         console.log('23232222222222222222222')
//         Promise.reject(error)
//     })
// // http response 拦截器
// _axios.interceptors.response.use(
//     response => {
//       console.log('1111111111111111111111')
//       let token = response.headers['auth-token']
//       if (token === undefined) {
//         Cookies.set("token", '');
//       } else {
//         Cookies.set("token", response.headers['auth-token']);
//       }
//       return response;
//     },
//     error => {
//       console.log('1111111111111111111111')
//       if (error.response.status === 403) {
//         Notification.error({
//           title: '错误',
//           message: '登录超时，请登录'
//         });
//         router.replace('/login');
//       }
//       return Promise.reject(error);
//     }
//   );
// // /api/v1/consumer-user
// const instance = axios.create({
//     // baseURL: process.env.NODE_ENV === 'production' ? '/api/v1/consumer-user' : '/api/',
//     baseURL: '/api/',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     transformRequest: [(data) => queryString.stringify(data)]
// })
// Vue.prototype.$_http = instance;
// const locals = axios.create({
//     baseURL: '/api/',
//     // headers:{'Auth-Token':store.state.token === ''?'':store.state.token},
//     timeout: 60 * 1000, // Timeout
//     withCredentials: true, // Check cross-site Access-Control
// })
// Vue.prototype.$locals = locals;
// // http response 拦截器
// // _axios.interceptors.response.use(
// //     response => {
// //         if (response.status === 200) {
// //         }
// //         return response;
// //     },
// //     error => {
// //         router.replace({
// //             path:'/login',
// //             query:{redirect:router.currentRoute.fullPath}
// //         })
// //         // if (error.response.status === 403) {
// //         //     Message.error({
// //         //         title: '错误',
// //         //         message: '请登录'
// //         //     });
// //         //     router.replace('/login');
// //         // }
// //         // router.replace('/login');
// //         // Message.error({
// //         //     title: '错误',
// //         //     message: error.response.data.message
// //         // });
// //         return Promise.reject(error);
// //     }
// // );
// // 添加request拦截器 
// _axioes.interceptors.request.use(
//     function (config) {
//         if (config.method === 'get') {
//             config.paramsSerializer = function (params) {
//                 return queryString.stringify(params, {
//                     arrayFormat: 'repeat'
//                 })
//             }
//         }
//         let token = Cookies.get('Btoken')
//         if (token) {
//             config.headers['Auth-Token'] = token;
//         }
//         return config
//     },
//     function (error) {
//         Promise.reject(error)
//     })

// Plugin.install = function (Vue, options) {
//     Vue.axios = _axios;
//     window.axios = _axios;
//     Object.defineProperties(Vue.prototype, {
//         http: {
//             get() {
//                 return _axios;
//             }
//         },
//         $http: {
//             get() {
//                 return _axios;
//             }
//         },
//         $local: {
//             get() {
//                 return _axioes;
//             }
//         },
//     });
// };
// Vue.use(Plugin)

// export default _axios;