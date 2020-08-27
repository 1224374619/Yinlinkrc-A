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
              <el-badge :value="this.value" class="item" size="mini" style="margin:5px 40px 0 0">
                <img
                  style="width:22px;height:22px"
                  @click="tidings"
                  :src="require('../assets/images/ling.png')"
                />
              </el-badge>
              <el-dropdown-menu slot="dropdown" style="width:412px;height:258px;">
                <div
                  style="width:412px;height:210px;border-bottom:1px solid #fafafa;cursor:default"
                >
                  <div
                    class="badge"
                    v-for="(item,index) in notificationlist"
                    :key="index"
                    @click="NewsDetail"
                  >
                    <span style="color:#6C6C6C;font-size:14px;margin-left:35px;">{{item.title}}</span>
                    <span
                      style="color:#909090;font-size:12px;margin-right:35px;"
                    >{{item.releaseTime|formatDate}}</span>
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
              style="line-height:65px;color:#373737;margin:0 20px 0 0;font-size:18px;"
            >{{$store.state.user === null?this.fullName:$store.state.user}}</span>
            <el-dropdown placement="bottom-start" class="ada">
              <img
                style="margin:10px 0 0 0;height:47px;width:47px"
                v-if="this.avatarUrl === ''"
                :src="require('../assets/images/156.png')"
              />
              <img style="margin:10px 0 0 0;height:47px;width:47px" v-else :src="this.avatarUrl" />
              <el-dropdown-menu slot="dropdown" style="font-size:14px">
                <el-dropdown-item
                  id="personals"
                  v-if="this.status === 0"
                  disabled
                  @click.native="contact"
                >联系我们</el-dropdown-item>
                <el-dropdown-item id="personals" v-else disabled @click.native="contact">联系我们</el-dropdown-item>
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
      value: "",
      notificationlist: [],
      status: ""
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
    NewsDetail() {
      this.$router.push({ path: "/NewsDetail" });
    },
    //全部标记
    chorusle() {
      this.$http
        .get("/business-notification/message/read")
        .then(res => {
          if (res.data.code == "200") {
            this.chorus = false;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //退出
    detrusion() {
      this.$http
        .get("/logout?returnUrl=http://localhost:8080/login")
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
            // if (res.data.data.details.companyId === 0) {
            //   this.$router.push({ path: "/enterpriseAudit" });
            // }else {
            //   this.$router.push({ path: "/home" });
            // }
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //用户通知
    notification() {
      let params = {
        isRead: false,
        pageNum: 1,
        pageSize: 10,
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .get("/business-notification/message", { params: params })
        .then(res => {
          if (res.data.code == "200") {
            this.notificationlist = res.data.data.list;
            this.value = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    // //获取简历简讯
    // brief() {
    //   // const token = this.$store.state.token
    //   this.$http.get("/business-user/account").then(res => {
    //     if (res.data.code == 200) {
    //       // this.defaultResumeId = res.data.data.defaultResumeId;
    //       // this.fullName = res.data.data.base.fullName;
    //       // this.avatarUrl = res.data.data.avatarUrl;
    //     }
    //   });
    //   // .catch(error => {});
    // }
  },
  //监听执行
  watch: {
    "$store.state.value": function(val) {
      console.log(val);
    }
  },
  created() {
    this.token = Cookies.get("token");
    // this.initList();
    this.fullName = window.sessionStorage.getItem("username");
    this.notification();
    this.state();
    // this.brief();
  }
};
</script>

<style lang="stylus">
nav {
  z-index: 100;
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
        margin: 0 0 0 124px;
        font-family: 'PingFangSC-Regular';

        a {
          width: 115px;
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
