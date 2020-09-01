<template>
  <div class="container">
    <div style="width:100%;height:30px;background:#f1f1f1;margin:0px 0 20px 0;">
      <div>
        <img
          style="height:30px;margin:0 0 0 0;float:left"
          :src="require('../assets/images/laba.png')"
        />
        <span
          style="font-family:PingFangSC-Regular;color: #373737;line-height:30px;float:left"
        >【公告】 建议使用谷歌浏览器或360浏览器最新版极速模式访问，以获得更佳体验！</span>
      </div>
    </div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>您的位置：首页</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <div class="nav">
        <div class="left">
          <div class="left-first">
            <div>简历看板</div>
            <div @click="moreResume" style="font-size:14px">更多》</div>
          </div>
          <div class="left-second">
            <ul>
              <li>
                <span>本日新增</span>
                <span style="color:#FF7152;font-size:24px">{{incrementDailys}}</span>
              </li>
              <li>
                <span>待处理</span>
                <span style="color:#FF7152;font-size:24px">{{toProcessNums}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="left">
          <div class="left-first">
            <div>职位看板</div>
            <div @click="morePosition" style="font-size:14px">更多》</div>
          </div>
          <div class="left-second">
            <ul>
              <li>
                <span>已上线</span>
                <span style="color:#FF7152;font-size:24px">{{onlineNums}}</span>
              </li>
              <li>
                <span>待上线</span>
                <span style="color:#FF7152;font-size:24px">{{editingNums}}</span>
              </li>
              <li>
                <span>审核中</span>
                <span style="color:#FF7152;font-size:24px">{{auditingNums}}</span>
              </li>
              <li>
                <span>审核未通过</span>
                <span style="color:#FF7152;font-size:24px">{{auditFailedNums}}</span>
              </li>
              <li>
                <span>已下线</span>
                <span style="color:#FF7152;font-size:24px">{{offlineNums}}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="left">
          <div class="left-first">
            <div>企业账单</div>
            <div style="font-size:14px">更多》</div>
          </div>
          <div class="left-second"></div>
        </div>-->
      </div>
      <div class="aside">
        <div class="right">
          <div class="right-first">
            <div>系统通知</div>
            <div style="font-size:14px">更多》</div>
          </div>
          <div class="right-second">
            <div class="notification">
              <div class="noti-head">
                <span>标题</span>
                <span>
                  <el-badge style="padding:0 0 10px 0" :value="200" :max="99"></el-badge>
                </span>
              </div>
              <div class="noti-content">
                敬请期待
                <!-- <span class="more">详情 &gt;</span> -->
              </div>
            </div>
            <div class="notification">
              <div class="noti-head">
                <span>标题</span>
                <span>
                  <el-badge style="padding:0 0 10px 0" :value="200" :max="99"></el-badge>
                </span>
              </div>
              <div class="noti-content">
                敬请期待
                <!-- <span class="more">详情 &gt;</span> -->
              </div>
            </div>
          </div>
        </div>
        <div class="right" style="height:180px">
          <div class="right-first">
            <div>企业摘要</div>
            <div style="font-size:14px">更多》</div>
          </div>
          <div class="right-second">
            <div class="enterprise">
              <div class="enter-head">
                <img :src="squareUrl" />
                <div>
                  <span>企业信息完整度</span>
                  <el-progress status="exception" :percentage="companyDetails.completedPercent"></el-progress>
                </div>
              </div>
              <div class="enter-content">
                <p>
                  企业名称：{{companyDetails.fullName}}
                  <span class="tag">{{ }}</span>
                </p>
                <p>企业简称：{{companyDetails.shortName}}</p>
                <p v-if="this.status === 'ONLINE'">企业审核：审核已通过</p>
                <p v-else-if="this.status === 'AUDIT_FAIL'">企业审核：审核未通过</p>
                <p v-else-if="this.status === 'AUDITING'">企业审核：审核中</p>
                <p v-else-if="this.status === 'OFFLINE'">企业审核：已下线</p>
                <p v-else>企业审核：未知</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      incrementDailys: "",
      toProcessNums: "",
      auditFailedNums: "",
      auditingNums: "",
      editingNums: "",
      offlineNums: "",
      onlineNums: "",
      companyID: "",
      companyDetails: {
        fullName: "",
        shortName: "",
        completedPercent: "",
        logoUrl: ""
      },
      status: ""
    };
  },
  methods: {
    //更多简历
    moreResume() {
      this.$router.push({
        path: "/resume/info"
      });
    },
    //更多职位
    morePosition() {
      this.$router.push({
        path: "/position/info"
      });
    },
    //公司状态
    state() {
      this.$http
        .get("/business-core/companyes/state")
        .then(res => {
          if (res.data.code == "200") {
            this.status = res.data.data;
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
    //简历看板
    resumeBoard() {
      this.$http
        .get("/business-core/dashboard/resume")
        .then(res => {
          // let response = res.data.data;
          if (res.data.code == "200") {
            this.incrementDailys = res.data.data.incrementDaily;
            this.toProcessNums = res.data.data.toProcessNum;
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
    //职位看板
    positionBoard() {
      this.$http
        .get("/business-core/dashboard/position")
        .then(res => {
          // let responses = res.data.data;
          if (res.data.code == "200") {
            this.auditFailedNums = res.data.data.auditFailedNum;
            this.auditingNums = res.data.data.auditingNum;
            this.editingNums = res.data.data.editingNum;
            this.offlineNums = res.data.data.offlineNum;
            this.onlineNums = res.data.data.onlineNum;
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
    //公司简历简讯
    companyBrief() {
      this.$http
        .get("/business-core/companyes/brief")
        .then(res => {
          if (res.data.code == "200") {
            this.companyID = res.data.data.id;
            this.companyDetails = res.data.data;
            this.squareUrl = res.data.data.logoUrl;
            this.positionBoard();
            this.resumeBoard();
            this.state()
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
    }
    // //公司详情
    // companyDetail() {
    //   this.$http
    //     .get(`/business-core/company/${this.companyID}`)
    //     .then(res => {
    //       if (res.data.code == "200") {
    //       } else {
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
  },
  created() {
    this.companyBrief();
  }
};
</script>


<style lang="stylus" scoped>
.container {
  display: flex;
  width: 1200px;
  height: 650px;
  background-color: white;
  padding: 20px;
  margin: 56px auto 0;
  flex-direction: column;

  .breadcrumb {
    width: 100%;
  }

  .content {
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    .nav {
      display: flex;
      flex-direction: column;

      .left:nth-child(2) {
        margin: 20px 0 0 0;
      }

      .left {
        background: #FFFFFF;
        border: 1px solid rgba(244, 244, 244, 1);
        box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);

        .left-first {
          width: 900px;
          height: 50px;
          background: #FAFAFA;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          line-height: 50px;

          div {
            margin: 0 20px 0 20px;
            font-size: 16px;
            color: #327cf3;
          }
        }

        .left-second {
          width: 900px;
          height: 80px;
          background: #ffffff;
          text-align: center;

          ul {
            margin: 0;
            list-style: none;
            display: flex;
            justify-content: space-around;
            padding: 0;
          }

          li {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin: 10px 0 0 0;

            span:first-child {
              line-height: 27px;
              color: #666;
              font-size: 14px;
            }

            span:last-child {
              line-height: 33px;
              font-size: 24px !important;
              color: #a3292e;
            }
          }
        }
      }
    }

    .aside {
      display: flex;
      flex-direction: column;
      margin: 0 0 0 20px;

      .right:nth-child(2) {
        margin: 20px 0 0 0;
      }

      .right {
        background: #FFFFFF;
        border: 1px solid rgba(244, 244, 244, 1);
        box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);

        .right-first {
          width: 280px;
          height: 50px;
          background: #FAFAFA;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          line-height: 50px;

          div {
            margin: 0 20px 0 20px;
            font-size: 16px;
            color: #373737;
          }
        }
      }

      .right-second {
        width: 280px;
        height: auto;
        border: 1px solid red;
        background: #ffffff;
        border: 1px solid rgba(244, 244, 244, 1);
        box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);

        .notification {
          padding: 0 20px 0 20px;
          cursor: pointer;

          &:first-child {
            border-bottom: solid 1px #eee;
          }

          .noti-head {
            display: flex;
            font-size: 16px;
            justify-content: space-between;
            align-items: center;
          }

          .noti-content {
            color: #666;
            font-size: 12px;
            text-align: left;
            margin: 0 0 15px 0;
          }

          .more {
            color: #ff7152;
          }
        }

        .enterprise {
          margin: 10px;

          .enter-head {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 0 0 10px;

            img {
              width: 50px;
              height: 50px;
            }

            div {
              margin-left: 20px;
              text-align: left;
              font-size: 12px;
              color: #999;
              flex: 1;

              span {
                margin-left: 20px;
              }
            }
          }
        }

        .enter-content {
          font-size: 12px;
          color: #333333;
          text-align: left;
          margin-top: 5px;
          margin: 0 0 0 10px;
        }
      }
    }
  }
}
</style>
<style>
.el-table th {
  background: #f1f1f1;
}
.pagination {
  margin: 20px 0 20px 0;
  text-align: center;
}
</style>
