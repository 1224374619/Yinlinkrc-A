<template>
  <div class="asp">
    <div class="asp-nav">设置</div>
    <div class="asp-content">
      <div class="asp-form">
        <div class="asp-tables">
          <div style="margin:20px 0 0 0">
            <el-form ref="form" :model="form" label-width="80px">
              <!-- <el-form-item label="允许登录">
                <el-radio v-model="form.radio1" label="1" border>允许</el-radio>
                <el-radio v-model="form.radio1" label="2" border>禁止</el-radio>
              </el-form-item>-->
              <el-form-item label="线上展示">
                <el-radio v-model="form.radio1" @change="changList" label="1" border>允许</el-radio>
                <el-radio v-model="form.radio1" @change="changList" label="2" border>禁止</el-radio>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        radio1: ''
      },
      companyState: '',
      companyID:''
    };
  },
  methods: {
    //切换
    changList(tab) {
      let params = {
        ids: [this.companyID]
      };
      if (tab === "1") {
        this.$http
          .put("/backend-manager/companies/online", params)
          .then(res => {
            if (res.data.code == 200) {
              this.$router.go(-1)
            } else {
            }
          })
          .catch(error => {
          
        });
      } else {
        this.$http
          .put("/backend-manager/companies/offline", params)
          .then(res => {
            if (res.data.code == 200) {
              this.$router.go(-1)
            } else {
            }
          })
          .catch(error => {
          
        });
      }
    }
  },
  mounted: function() {},
  updated: function() {},
  created() {
    this.companyState = this.$route.query.companyState;
    this.companyID = this.$route.query.companyID;
    if (this.companyState === "OFFLINE") {
      this.form.radio1 = '2'
    }else {
      this.form.radio1 = '1'
    }
  }
};
</script>
<style lang="scss">
.asp {
  width: 100%;
  background: #f8f8f8;
  border: 1px solid #f8f8f8;
}
.asp-nav {
  margin: 40px 0 0 20px;
  font-size: 18px;
  color: #2a2a2a;
  text-align: left;
}
.asp-content {
  width: 100%;
  margin: 20px 0 20px 0;
  background: #f8f8f8;
}
.asp-form {
  width: 98%;
  margin: 10px 0 0 1%;
  border: 1px solid #f8f8f8;
}
.asp-tables {
  width: 100%;
  height: 400px;
  border: 1px solid #f8f8f8;
  background: #ffffff;
  margin: 10px 0 0 0;
}
.el-radio {
  height: 30px;
  width: 110px;
  text-align: center;
}
</style>