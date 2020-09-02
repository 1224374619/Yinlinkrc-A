import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
// import Router from 'vue-router'
// import Vue from 'vue'
import resume from '../views/Resume/resume.vue'
import position from '../views/Position/position.vue'
import resumeInfo from '../views/Resume/resumeInfo.vue'
import talent from '../views/Resume/talent.vue'
import resumeDetail from '../views/Resume/ResumeDetail.vue'
import resumeCompany from '../views/Resume/resumeCompany.vue'
import ResumeDetailCompany from '../views/Resume/ResumeDetailCompany.vue'
import resumeList from '../views/Resume/resumeList.vue'
import positionlist from '../views/Position/positionList.vue'
import positionadd from '../views/Position/positionAdd.vue'
import editposition from '../views/Position/editPosition.vue'
import positionDetail from '../views/Position/positionDetail.vue'
import depot from '../views/Position/depot.vue'
import company from '../views/Company/company.vue'
import message from '../views/Company/message.vue'
import management from '../views/Company/management.vue'
import contactus from '../views/ContactUs/ContactUs.vue'
import companyDetail from '../views/ContactUs/companyDetail.vue'
import contact from '../views/ContactUs/contact.vue'
import audit from '../views/audit'
import error from '../views/error'
import tidings from '../views/tidings'
import enterpriseAudit from '../views/enterpriseAudit'
import account from '../views/Account/account.vue'
import base from '../views/Account/base.vue'
import repassword from '../views/Account/repassword.vue'
import resetpassword from '../views/ResetPassword.vue'
import resetresult from '../views/ResetResult.vue'
// Vue.use(Router);
// const router = new Router({})
let routes = [{
        path: '/',
        component: Home,
        redirect: '/home',
        name: '首页',
        hidden: true,
        children: [{
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                requireAuth: true // 在需要登录的路由的meta中添加响应的权限标识
            }
        }, ]
        // hidden: true
    },
    {
        path: '/register',
        component: Register,
        name: 'register',
        hidden: true
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        hidden: true
    },
    {
        path: '/resetpassword',
        component: resetpassword,
        name: 'resetpassword',
        hidden: true
    },
    {
        path: '/resetresult',
        component: resetresult,
        name: 'resetresult',
        hidden: true
    },
    {
        path: '/audit',
        component: audit,
        name: '',
        hidden: true
    },
    {
        path: '/error',
        component: error,
        name: '',
        hidden: true
    },
    {
        path: '/enterpriseAudit',
        component: enterpriseAudit,
        name: 'enterpriseAudit',
        meta: {
            requireAuth: true // 在需要登录的路由的meta中添加响应的权限标识
        }
    },
    {
        path: '/tidings',
        component: tidings,
        name: 'tidings',
        hidden: true,
        meta: {
            requireAuth: true // 在需要登录的路由的meta中添加响应的权限标识
        }
    },
    {
        path: '/resume',
        component: resume,
        iconCls: 'el-icon-user',
        name: '简历总览',
        redirect: '/resume/info',
        meta: {
            requireAuth: true // 在需要登录的路由的meta中添加响应的权限标识
        },
        item: 2,
        children: [{
            path: '/resume/info',
            iconCls: 'el-icon-user',
            component: resumeInfo,
            name: '简历看板'
        }, {
            path: '/resume/resumelist',
            iconCls: 'el-icon-user',
            component: resumeList,
            name: '职位详情',
            hidden: true,
        }]
    },
    {
        path: '/resume',
        component: resume,
        name: '平台人才库',
        item: 2,
        redirect: '/resume/talent',
        meta: {
            requireAuth: true // 在需要登录的路由的meta中添加响应的权限标识
        },
        iconCls: 'el-icon-document-copy',
        children: [{
                path: '/resume/talent',
                iconCls: 'el-icon-document-copy',
                component: talent,
                name: '人才列表',
            },
            {
                path: '/resume/talent/Detail',
                iconCls: 'el-icon-document-copy',
                component: resumeDetail,
                name: '人才列表 > 简历详情',
                hidden: true,
            }
        ]
    },
    {
        path: '/resume',
        component: resume,
        name: '企业人才库',
        item: 2,
        meta: {
            requireAuth: true // 在需要登录的路由的meta中添加响应的权限标识
        },
        redirect: '/resume/company',
        iconCls: 'el-icon-document-copy',
        children: [{
                path: '/resume/company',
                iconCls: 'el-icon-document-copy',
                component: resumeCompany,
                name: '人才列表',
            },
            {
                path: '/resume/company/Detail',
                iconCls: 'el-icon-document-copy',
                component: ResumeDetailCompany,
                name: '人才列表 > 简历详情',
                hidden: true,
            }
        ]
    },
    {
        path: '/position',
        component: position,
        iconCls: 'el-icon-tickets',
        name: '职位总览',
        redirect: '/position/info',
        item: 1,
        meta: {
            requireAuth: true // 在需要登录的路由的meta中添加响应的权限标识
        },
        children: [{
            path: '/position/info',
            iconCls: 'el-icon-tickets',
            component: positionlist,
            name: '职位列表'
        }, {
            path: '/position/editPosition',
            iconCls: 'el-icon-document-copy',
            component: editposition,
            name: '职位编辑',
            hidden: true,
        }, {
            path: '/position/positionDetail',
            iconCls: 'el-icon-document-copy',
            component: positionDetail,
            name: '职位详情',
            hidden: true,
        }]
    },
    {
        path: '/',
        component: position,
        name: '',
        iconCls: 'el-icon-circle-plus',
        item: 1,
        meta: {
            requireAuth: true // 在需要登录的路由的meta中添加响应的权限标识
        },
        leaf: true, //只有一个节点
        children: [{
            path: '/position/add',
            component: positionadd,
            name: '新增职位'
        }]
    },
    {
        path: '/',
        component: position,
        iconCls: 'el-icon-delete',
        name: '',
        item: 1,
        meta: {
            requireAuth: true // 在需要登录的路由的meta中添加响应的权限标识
        },
        leaf: true, //只有一个节点
        children: [{
            path: '/position/depot',
            component: depot,
            name: '回收站'
        }]
    },
    {
        path: '/company',
        component: company,
        iconCls: 'el-icon-office-building',
        name: '',
        item: 3,
        meta: {
            requireAuth: true // 在需要登录的路由的meta中添加响应的权限标识
        },
        redirect: '/company/message',
        leaf: true, //只有一个节点
        children: [{
            path: '/company/message',
            component: message,
            name: '企业信息管理'
        }, ]
    },
    {
        path: '/company',
        component: company,
        iconCls: 'el-icon-coordinate',
        name: '',
        item: 3,
        meta: {
            requireAuth: true // 在需要登录的路由的meta中添加响应的权限标识
        },
        redirect: '/company/message',
        leaf: true, //只有一个节点
        children: [{
            path: '/company/management',
            component: management,
            name: '用户管理'
        }]
    },
    {
        path: '/contactus',
        component: contactus,
        iconCls: 'el-icon-document-copy',
        name: '',
        item: 4,
        meta: {
            requireAuth: true // 在需要登录的路由的meta中添加响应的权限标识
        },
        redirect: '/contactus/companyDetail',
        leaf: true, //只有一个节点
        children: [{
            path: '/contactus/companyDetail',
            component: companyDetail,
            name: '公司介绍'
        }]
    },
    {
        path: '/contactus',
        component: contactus,
        iconCls: 'el-icon-document-copy',
        name: '',
        item: 4,
        meta: {
            requireAuth: true // 在需要登录的路由的meta中添加响应的权限标识
        },
        redirect: '/contactus/contact',
        leaf: true, //只有一个节点
        children: [{
            path: '/contactus/contact',
            component: contact,
            name: '联系我们'
        }]
    },
    {
        path: '/account',
        component: account,
        iconCls: 'el-icon-document-copy',
        name: '',
        item: 5,
        meta: {
            requireAuth: true // 在需要登录的路由的meta中添加响应的权限标识
        },
        redirect: '/account/base',
        leaf: true, //只有一个节点
        children: [{
            path: '/account/base',
            component: base,
            name: '基本信息'
        }]
    },
    {
        path: '/account',
        component: account,
        iconCls: 'el-icon-document-copy',
        name: '',
        item: 5,
        meta: {
            requireAuth: true // 在需要登录的路由的meta中添加响应的权限标识
        },
        redirect: '/account/repassword',
        leaf: true, //只有一个节点
        children: [{
            path: '/account/repassword',
            component: repassword,
            name: '重置密码'
        }]
    },

];

export default routes;