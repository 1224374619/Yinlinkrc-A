<template>
  <div class="asp">
    <div class="asp-nav">消息详情</div>
    <div class="asp-content">
      <div class="asp-form">
        <div>消息标题：{{this.title}}</div>
        <div>接受对象：{{this.accept | size}}</div>
        <div>提醒方式：{{this.remindWay | level}}</div>
        <div>有效期：{{this.indateTime | formatDate}}</div>
        <div style="width:700px">
          消息内容：
          <span>{{this.content}}</span>
        </div>
        <div v-if="isshow">
          <!-- <el-button style="margin:0 0 0 550px" type="primary">返回</el-button> -->
          <el-button type="primary" @click="Back()">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      isshow: true,
      message: "1",
      title: "",
      accept: "",
      remindWay: "",
      indateTime: "",
      content: ""
    };
  },
  methods: {
    //返回
    Back() {
      this.$router.go(-1);
    },
    //详细信息
    Detail() {
      this.$http
        .get(`/cms-notification/sysmsg/${this.companId}`)
        .then(res => {
          if (res.data.code == 200) {
            let NewContent = res.data.data;
            this.title = NewContent.title;
            this.content = NewContent.content;
            this.accept = NewContent.accept;
            this.indateTime = NewContent.indateTime;
            this.remindWay = NewContent.remindWay;
          }
        })
        .catch(error => {
          
        });
    }
  },
  mounted: function() {},
  updated: function() {},
  created() {
    let token = Cookies.get("Atoken");
    this.companId = this.$route.query.thisId;
    if (token) {
      this.Detail();
    } else {
      this.$notify.info({
        title: "消息",
        message: "登陆超时，请重新登录"
      });
      this.$router.push({ path: "/login" });
    }

    if (this.message == "1") {
      this.isshow = true;
    } else {
      this.isshow = false;
    }
  },
  filters: {
    level(level) {
      const map = ["", "站内信"];
      return map[level];
    },
    size(size) {
      const map = ["企业用户", "C端用户", "全部用户"];
      return map[size];
    }
  }
};
</script>
<style scoped>
.asp {
  width: 100%;
}
.asp-nav {
  margin: 40px 0 0 20px;
  font-size: 18px;
  color: #2a2a2a;
  text-align: left;
}
.asp-content {
  width: 100%;
  margin: 20px 0 0 0;
  border: 1px solid #efeff3;
  background: #efeff3;
}
.asp-form {
  width: 98%;
  background: #ffffff;
  margin: 10px 0 10px 1%;
}
.asp-form div:nth-child(1) {
  padding: 50px 0 20px 50px;
}
.asp-form div {
  padding: 10px 0 20px 50px;
}
</style>