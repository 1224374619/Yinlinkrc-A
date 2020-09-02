<template>
  <div>
    <el-dialog title :visible.sync="centerDialogVisible" :show-close="false" width="25%" center>
      <div style="text-align:center">
        <div class="loading">
          <i style="font-size:60px;color:#00C243;" class="el-icon-success"></i>
        </div>
        <div class="loading-text">提交成功</div>
        <div class="loading-texts">感谢您的建议，我们将会尽快处理并给予您反馈</div>
        <div style="text-align:center">
          <el-button
            style="width:200px;height:40px;line-height:0px;margin:35px 0 20px 0"
            type="primary"
            @click="centerDialogVisible = false"
          >确定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title :visible.sync="centerDialogVisibles" :show-close="false" width="25%" center>
      <div style="text-align:center">
        <div class="loading">
          <i style="font-size:60px;color:#faad14;" class="el-icon-warning"></i>
        </div>
        <div class="loadings-text">今天发言的机会已经用完了哦</div>
        <div style="text-align:center">
          <el-button
            style="width:200px;height:40px;line-height:0px;margin:35px 0 20px 0"
            type="primary"
            @click="centerDialogVisibles = false"
          >确定</el-button>
        </div>
      </div>
    </el-dialog>
    <div class="companyDetail">
      <div>
        <span>公司：上海银领网络科技有限公司</span>
      </div>
      <div>
        <span>地址：上海市静安区大众东朔空间1206</span>
      </div>
      <div>
        <span>邮编：200436</span>
      </div>
      <div>
        <span>电话：021 56057115</span>
      </div>
      <div>
        <span>邮箱：Nicole.yin@yinlinkrc.com</span>
      </div>
      <div style="display: flex;
  flex-direction: row;">
        <span>在此留言：</span>
        <el-input
          type="textarea"
          style="width:700px;margin:-30px 0 0 0"
          :rows="8"
          placeholder="请输入个人建议"
          v-model="ruleForm.textarea"
        ></el-input>
      </div>
      <div>
        <el-button
          type="primary"
          style="width:200px;height:40px;margin:20px 0 0 300px"
          :disabled="ruleForm.textarea === ''?true:false"
        >提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        textarea: ""
      },
      boole: false,
      rules: {
        textarea: [
          { required: true, message: "请输入个人建议", trigger: "blur" },
          { min: 0, max: 300, message: "长度在 0 到 150 个字", trigger: "blur" }
        ]
      },
      centerDialogVisible: false,
      centerDialogVisibles: false
    };
  }
};
</script>

<style lang="stylus" scoped>
.loading-text {
  font-family: PingFangSC-Medium;
  color: #111111;
  font-size: 24px;
  margin: 15px 0 0 0;
}

.loading-texts {
  font-family: PingFangSC-Regular;
  color: #999999;
  font-size: 18px;
  margin: 10px 0 0 0;
}

.loadings-text {
  font-family: PingFangSC-Regular;
  color: #1111 1;
  font-size: 20px;
  margin: 15px 0 0 0;
}

.companyDetail {
  margin: 0 0 0 40px;
  display: flex;
  flex-direction: column;

  div {
    padding: 30px 0 0 0;
    font-family: PingFangSC-Regular;
    color: #111111;
    font-size: 16px;

    span {
      font-family: PingFangSC-Regular;
      color: #333333;
      font-size: 16px;
    }
  }
}
</style>