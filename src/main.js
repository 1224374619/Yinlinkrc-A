import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import 'theme/index.css';
import './utils/http'
import ElementUI from 'element-ui';
import App from './App.vue';
import qs from 'qs'
// import router from './router';
import routes from './router/index.js'
import VueRouter from 'vue-router'
import store from './store';
import scroll from 'vue-seamless-scroll'
// import Cookies from 'js-cookie'
import Moment from 'moment'
import {
  Message
} from 'element-ui'
import {
  CodeToTag
} from './cookie';
import cookie from 'vue-cookie';
import Cookies from 'js-cookie'
import 'babel-polyfill';
import './assets/iconfont/iconfont.css'
import VueAMap from 'vue-amap';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '../node_modules/swiper/dist/css/swiper.css'
import VueFullpage from 'vue-fullpage.js'
Vue.use(VueFullpage)
Vue.use(VueAwesomeSwiper)
Vue.use(VueRouter);
Vue.use(VueAMap);
Vue.use(Cookies);
VueAMap.initAMapApiLoader({
  key: '594f89b2e0fb82adadc7113372876925',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation'],
  v: '1.4.4'
})
Vue.use(scroll)
import vuescroll from 'vuescroll';
// import BaiduMap from 'vue-baidu-map'
Vue.use(ElementUI);
// Vue.prototype.$Cookies=Cookies;
Vue.prototype.$moment = Moment;
Vue.prototype.$qs = qs; //qs全局挂载在vue实例上
Vue.prototype.$message = Message
Vue.prototype.$cookie = cookie;
Vue.prototype.$CodeToTag = {
  CodeToTag
}

// 定义全局时间戳过滤器
Vue.filter('formatDate', function (value) {
  var timestamp = (new Date()).getTime() - 24 * 60 * 60 * 1000
  var timestampOne = (new Date()).getTime() - 48 * 60 * 60 * 1000
  if (value > timestamp) {
    return Moment(value).format('今天' + 'HH:mm');
  } else if (value > timestampOne && value < timestamp) {
    return Moment(value).format('昨天' + 'HH:mm');
  } else {
    return Moment(value).format('YYYY/MM/DD');
  }
});
Vue.filter('formatDateOne', function (value) {
  return Moment(value).format('YYYY-MM-DD')
})
Vue.filter('formatDateTwo', function (value) {
  return Moment(value).format('YYYY-MM-DD HH:mm')
})
Vue.filter('formatDateThree', function (value) {
  return Moment(value).format('YYYY-MM-DD HH:mm')
})
Vue.config.productionTip = false;
Vue.use(vuescroll, {
  ops: {
    bar: {
      onlyShowBarOnScroll: false,
      background: '#c1c1c1',
    }
  },
  name: 'Scroll'
});
const router = new VueRouter({
  routes
})

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')
  const status = Cookies.get('status')
  if (to.name === 'login' || to.name === 'register' || to.name === 'resetpassword') {
    store.state.hasLogin = false
  } else {
    store.state.hasLogin = true
  }
  // console.log(to.path)
  // if (to.name === 'home') {
  //   if (status === "0") {
  //     next({
  //       path: '/enterpriseAudit'
  //     })
  //   } else {
  //     next()
  //   }
  // } else if (to.path === '/resume/info') {
  //   if (status === "0") {
  //     next({
  //       path: '/enterpriseAudit'
  //     })
  //   } else {
  //     next()
  //   }
  // } else if (to.path === '/position/info') {
  //   if (status === "0") {
  //     next({
  //       path: '/enterpriseAudit'
  //     })
  //   } else {
  //     next()
  //   }
  // } else if (to.path === '/company/message') {
  //   if (status === "0") {
  //     next({
  //       path: '/enterpriseAudit'
  //     })
  //   } else {
  //     next()
  //   }
  // }

  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (token) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      // Message({
      //     message: '请先登录！',
      //     type: 'error',
      //     duration: 1 * 1000
      // })
      setTimeout(() => next({
        path: '/login'
        // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      }), 1000)

    }
  } else {
    next()
  }
})
// Vue.use(BaiduMap, {
//   // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//   ak: 'oGGWwB8nLwKnSrVveDmVrCcoBNB8E1Th'
// })


export default new Vue({
  Message,
  router,
  store,
  render: h => h(App)
}).$mount('#app');