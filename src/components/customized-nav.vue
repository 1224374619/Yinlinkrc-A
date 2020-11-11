<template>
  <div>
    <nav>
      <div class="nav-body">
        <img style="height:40px" @click="gotoHomeUI" :src="require('../assets/images/logo.png')" />
        <!-- <span v-if="!ctlHideMenus" style="margin:5px 0 0 27px;color:#327cf3;">上海<i class="el-icon-caret-bottom"></i></span> -->
        <div class="menu">
          <div class="group" v-if="this.status === 0">
            <!-- <router-link :to="{path: '/home' }" index="1">
              <span>首页</span>
            </router-link>

            <router-link :to="{path: '/resume' }" index="2">
              <span>简历管理</span>
            </router-link>

            <router-link :to="{path: '/position' }" index="3">
              <span>职位管理</span>
            </router-link>

            <router-link :to="{path: '/company' }" index="4">
              <span>企业中心</span>
            </router-link>-->
          </div>
          <div class="group" v-else>
            <router-link :to="{path: '/home' }" index="1">
              <span>首页</span>
            </router-link>

            <router-link :to="{path: '/resume' }" index="2">
              <span>简历管理</span>
            </router-link>

            <router-link :to="{path: '/position' }" index="3">
              <span>职位管理</span>
            </router-link>

            <router-link :to="{path: '/company' }" index="4">
              <span>企业中心</span>
            </router-link>
          </div>
          <div class="btn-set" v-if="!this.token">
            <router-link
              style="color:#838383;font-size:18px"
              tag="button"
              :to="{name:'login'}"
              index="1"
            >登录</router-link>
            <router-link tag="button" :to="{name:'register'}" index="2">注册</router-link>
          </div>
          <div class="user-operations" v-else>
            <el-dropdown trigger="hover" style="margin:0 10px 0 0">
              <el-badge
                :value="this.$store.state.value"
                class="item"
                size="mini"
                style="margin:10px 40px 0 0"
              >
                <img
                  style="width:22px;height:22px"
                  @click="tidings"
                  :src="require('../assets/images/ling.png')"
                />
              </el-badge>
              <el-dropdown-menu slot="dropdown" style="width:412px;height:258px;">
                <div
                  style="width:412px;height:210px;border-bottom:1px solid #fafafa;cursor:default;overflow:scroll;overflow-x:hidden;"
                >
                  <div class="badge" v-for="(item,index) in notificationlist" :key="index">
                    <span v-if="item.title.length>22" style="color:#6C6C6C;font-size:14px;margin-left:24px;">{{item.title.substring(0,22)}}</span>
                    <span v-else style="color:#6C6C6C;font-size:14px;margin-left:24px;">{{item.title}}</span>
                    <span style="color:#909090;font-size:12px;margin-right:25px;">
                      <el-badge
                        :is-dot="!item.isRead"
                        class="item"
                      >{{item.releaseTime|formatDateOne}}</el-badge>
                    </span>
                  </div>
                </div>
                <div
                  style="border: 1px solid rgba(244, 244, 244, 1);box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);height:60px"
                >
                  <el-button style="margin:7px 38%" @click="chorusle" type="primary">全部标为已读</el-button>
                  <!-- <span
                    style="font-size:14px;color:#373737;margin:0 auto;line-height:50px;cursor:pointer;border:1px solid red;width:100px"
                    
                  >全部标为已读</span>-->
                </div>
              </el-dropdown-menu>
            </el-dropdown>
            <span
              style="line-height:65px;color:#373737;margin:5px 20px 0 0;font-size:18px;"
            >{{$store.state.user === null?this.shortName:$store.state.user}}</span>
            <el-dropdown placement="bottom-start" class="ada">
              <!-- <img
                style="margin:10px 0 0 0;height:47px;width:47px"
                v-if="this.avatarUrl === ''"
                :src="require('../assets/images/156.png')"
              />-->
              <img
                style="margin:10px 0 0 0;height:47px;width:47px"
                v-if="this.status === 0"
                :src="require('../assets/images/mo.png')"
              />
              <img style="margin:10px 0 0 0;height:47px;width:47px" v-else :src="this.avatarUrl" />
              <el-dropdown-menu slot="dropdown" style="font-size:14px">
                <el-dropdown-item
                  id="personals"
                  v-if="this.status === 0"
                  disabled
                  @click.native="contact"
                >联系我们</el-dropdown-item>
                <el-dropdown-item id="personals" v-else @click.native="contact">联系我们</el-dropdown-item>
                <el-dropdown-item
                  id="personals"
                  v-if="this.status === 0"
                  disabled
                  style="margin:5px 0 0 0"
                  @click.native="account"
                >账号设置</el-dropdown-item>
                <el-dropdown-item
                  v-else
                  id="personals"
                  style="margin:5px 0 0 0"
                  @click.native="account"
                >账号设置</el-dropdown-item>
                <el-dropdown-item
                  id="personals"
                  style="margin:5px 0 0 0"
                  @click.native="detrusion"
                  command="logout"
                >退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookies from "js-cookie";
export default {
  name: "customized-nav",
  data() {
    return {
      tok: this.$store.state.token,
      token: "",
      notificationlist: [],
      status: "",
      avatarUrl: "",
      shortName: ""
    };
  },
  computed: mapState({
    hasLogin(state) {
      return state.hasLogin;
    }
  }),
  methods: {
    initList() {
      this.myInterval = window.setInterval(() => {
        setTimeout(() => {
          this.notification(); //调用接口的方法
        }, 1);
      }, 5000);
    },
    //消息click
    // NewsDetail() {
    //   this.$router.push({ path: "/NewsDetail" });
    // },
    //全部标记
    chorusle() {
      this.$http
        .put("/business-notification/message/read")
        .then(res => {
          if (res.data.code == "200") {
            this.chorus = false;
            this.notification();
          } else {
          }
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.$notify.error({
              title: "错误",
              message: "页面丢失，请重新加载"
            });
          } else if (error.response.status === 403) {
            this.$notify.error({
              title: "错误",
              message: "登陆超时，请重新登录"
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: error.response.data.message
            });
          }
        });
    },
    //退出
    detrusion() {
      this.$http
        .get("/business-user/loggedOut")
        .then(res => {
          this.$store.commit("LOGOUT");
          this.$router.push({ path: "/login" });
        })
        .catch(error => {
          this.$store.commit("LOGOUT");
          this.$router.push({ path: "/login" });
          // this.$message({
          //       message:error.response.data.message,
          //       type: 'error'
          //     })
        });
    },
    gotoHomeUI() {
      if (this.status === 0) {
      } else {
        this.$router.push({ path: "/" });
      }
    },
    gotoLoginUI() {
      this.$router.push({ name: "login" });
    },
    gotoRegisterUI() {
      this.$router.push({ name: "register" });
    },
    contact() {
      this.$router.push({ path: "/contactus" });
    },
    account() {
      this.$router.push({ path: "/account" });
    },
    tidings() {
      this.$router.push({ path: "/tidings" });
    },
    personal() {
      this.$router.push({ path: "/personal" });
    },
    //当前用户信息
    state() {
      this.$http
        .get("/business-core/companyAccounts/user")
        .then(res => {
          if (res.data.code == "200") {
            this.status = res.data.data.details.companyId;
            if (this.status === 0) {
              return;
            } else {
              this.brief();
            }
          } else {
          }
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.$notify.error({
              title: "错误",
              message: "页面丢失，请重新加载"
            });
          } else if (error.response.status === 403) {
            this.$notify.error({
              title: "错误",
              message: "登陆超时，请重新登录"
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: error.response.data.message
            });
          }
        });
    },
    //用户通知
    notification() {
      let params = {
        isRead: null,
        pageNum: 1,
        pageSize: 10,
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .get("/business-notification/message", { params: params })
        .then(res => {
          if (res.data.code == "200") {
            let token = res.headers["auth-token"]
            Cookies.set("Btoken", token);
            this.notificationlist = res.data.data.list;
            let notificationlist = [];
            this.notificationlist.forEach(function(item, index) {
              if (item.isRead === false) {
                notificationlist.push(item.isRead);
              } else {
                return;
              }
            });
            this.$store.state.value = notificationlist.length;
          } else {
          }
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.$notify.error({
              title: "错误",
              message: "页面丢失，请重新加载"
            });
          } else if (error.response.status === 403) {
            this.$notify.error({
              title: "错误",
              message: "登陆超时，请重新登录"
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: error.response.data.message
            });
          }
        });
    },
    //获取简历简讯
    brief() {
      // const token = this.$store.state.token
      this.$http
        .get("/business-core/companyes/brief")
        .then(res => {
          if (res.data.code == "200") {
            // this.defaultResumeId = res.data.data.defaultResumeId;
            this.shortName = res.data.data.shortName;
            this.avatarUrl = res.data.data.logoUrl;
          }
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.$notify.error({
              title: "错误",
              message: "页面丢失，请重新加载"
            });
          } else if (error.response.status === 403) {
            this.$notify.error({
              title: "错误",
              message: "登陆超时，请重新登录"
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: error.response.data.message
            });
          }
        });
    }
  },
  //监听执行
  watch: {
    "$store.state.value": function(val) {
      console.log(val);
    }
  },
  created() {
    this.token = Cookies.get("Btoken");
    this.fullName = window.sessionStorage.getItem("username");
    if (this.token) {
      this.notification();
      this.state();
    } else {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="stylus">
nav {
  z-index: 400;
  font-family: PingFangSC-Regular;
  background-color: #ffffff;
  letter-spacing: 1.1;
  box-shadow: 0px 1px 9px #ccc;
  width: 100%;
  position: fixed;
  top: 0;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  height: 96px;
  align-content: center;
  align-items: center;

  .nav-body {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: auto;
    width: 1440px;
    min-width: 1024px;
    height: 100%;

    img {
      height: 40px;
      margin: 0 0 0 96px;
      cursor: pointer;
    }

    .menu {
      display: flex;
      flex: 1;
      height: 100%;
      justify-content: flex-end;
      align-items: center;

      .group {
        display: flex;
        height: 100%;
        flex: 1;
        margin: 0 0 0 140px;
        font-family: 'PingFangSC-Regular';

        a {
          width: 165px;
          color: #838383;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;

          &.router-link-active {
            color: #327cf3;
            font-family: 'PingFangSC-Medium';
            margin: 0 0 0 0;

            span {
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }

      .user-operations {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        margin: 0 96px 0 0;
      }

      .personals {
        background: red;
      }

      .badge {
        border: 1px solid red;
      }

      img {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        margin: 17px 0 0 0;
      }

      .btn-set {
        margin: 0 65px 0 0;

        button {
          cursor: pointer;
          font-size: 18px;
          background: none;
          border: none;
          padding: 0 38px;
          line-height: 20px;
          border-right: solid 2px lightgrey;
          height: 18px;
          color: #838383;

          &:last-child {
            border: none;
          }
        }
      }
    }
  }
}
</style>
<style lang="stylus">
.badge {
  height: 40px;
  line-height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.badge:hover {
  background: #fafafa;
}

.el-badge__content {
  margin: 15px 0 0 0;
}

.el-dropdown-menu__item {
  background: white;
}

.el-dropdown-menu__item:hover {
  background: red;
}

#personals:hover {
  background: #f4f4f4;
  color: #6C6C6C;
}

#personals {
  color: #6C6C6C;
}
</style>
