import Vue from 'vue';
import Vuex from 'vuex';
import { DONE_LOGOUT, DONE_LOGIN } from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    companyID:'',
    hasLogin:true,
    hasLogins:true,
    user: window.sessionStorage.getItem('username'),
    token: '',
    username: window.sessionStorage.getItem('user'),
  },
  mutations: {
    [DONE_LOGIN] (state) {
      state.hasLogin = true;
    },
    [DONE_LOGOUT] (state) {
      state.hasLogin = false;
    },
    SET_TOKEN: (state, data) => {
      state.token = data
      window.sessionStorage.setItem('token', data) 
    },
    SET_List: (state, data) => {
      state.lsitOne = data
      window.sessionStorage.setItem('lsitOne', data) 
    },
    //获取用户名
    GET_USER: (state, data) => {
      // 把用户名存起来
      state.user = data
      window.sessionStorage.setItem('user', data)
    },
    //获取用户名
    GET_USERNAME: (state, data) => {
      // 把用户名存起来
      state.user = data
      window.sessionStorage.setItem('username', data)
    },
    //登出
    LOGOUT: (state) => {
      // 登出的时候要清除token
      state.token = null
      state.user = null
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('user')
    }
  }
});
