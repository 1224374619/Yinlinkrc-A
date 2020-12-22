<template>
  <div class="aspe">
    <div class="aspe-nav">B端报名人员列表</div>
    <el-dialog
      title
      :show-close="false"
      :append-to-body="true"
      :visible.sync="dialogVisibles"
      width="25%"
    >
      <div>
        <div class="loading">
          <i style="font-size:60px;color:#20A0ff;" class="el-icon-loading"></i>
        </div>
        <div class="loading-text">下载中...</div>
      </div>
    </el-dialog>
    <div class="aspe-content">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="活动名称">
          <el-input :disabled="true" v-model="formInline.verifyId" placeholder="活动名称"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <div class="button">
        <button @click="uploadFile()">导 出</button>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 1070px" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            v-for="(item,index) in this.formAttributes"
            :key="index"
            :label="item.chineseName"
            v-if="item.englishName === 'surname'"
            prop="registrations.surname"
          ></el-table-column>
          <el-table-column
            v-for="(item,index) in this.formAttributes"
            :key="index"
            :label="item.chineseName"
            v-if="item.englishName === 'email'"
            prop="registrations.email"
          ></el-table-column>
          <el-table-column
            v-for="(item,index) in this.formAttributes"
            :key="index"
            :label="item.chineseName"
            v-if="item.englishName === 'phone'"
            prop="registrations.phone"
          ></el-table-column>
          <el-table-column
            v-for="(item,index) in this.formAttributes"
            :key="index"
            :label="item.chineseName"
            v-if="item.englishName === 'sex'"
            prop="registrations.sex"
          ></el-table-column>
          <el-table-column
            v-for="(item,index) in this.formAttributes"
            :key="index"
            :label="item.chineseName"
            v-if="item.englishName === 'age'"
            prop="registrations.age"
          ></el-table-column>
          <el-table-column
            v-for="(item,index) in this.formAttributes"
            :key="index"
            :label="item.chineseName"
            v-if="item.englishName === 'position'"
            prop="registrations.position"
          ></el-table-column>
          <el-table-column
            v-for="(item,index) in this.formAttributes"
            :key="index"
            :label="item.chineseName"
            v-if="item.englishName === 'record'"
            prop="registrations.record"
          ></el-table-column>
          <el-table-column
            v-for="(item,index) in this.formAttributes"
            :key="index"
            :label="item.chineseName"
            v-if="item.englishName === 'school'"
            prop="registrations.school"
          ></el-table-column>
          <el-table-column
            v-for="(item,index) in this.formAttributes"
            :key="index"
            :label="item.chineseName"
            v-if="item.englishName === 'major'"
            prop="registrations.major"
          ></el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.current"
          :page-sizes="page.pageSizeOpts"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      formInline: {
        verifyId: ""
      },
      textarea: "",
      dialogVisibles: false,
      tableData: [],
      arrActivity: [],
      multipleSelection: [],
      formAttributes: [],
      activityId: ""
    };
  },
  methods: {
    //下载
    uploadFile() {
      let activityList = {
        activityId: this.activityId,
        registrationIds: this.arrActivity
      };
      this.dialogVisibles = true;
      this.$localo
        .post("/review-center/activity/registration/export", activityList, {
          responseType: "blob"
        })
        .then(res => {
          console.log(res.headers);
          this.dialogVisibles = false;
          const disposition = res.headers["content-disposition"];
          console.log(disposition);
          let fileName = disposition.substring(
            disposition.indexOf("filename=") + 9,
            disposition.length
          );
          console.log(fileName.split(";"));

          // iso8859-1的字符转换成中文
          console.log(escape(fileName));
          fileName = decodeURI(fileName.split(";")[0]);
          console.log(fileName);
          // 去掉双引号
          fileName = fileName.replace(/\"/g, "");
          const content = res.data;
          let blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
          });
          console.log(blob);
          if (window.navigator.msSaveOrOpenBlob) {
            // console.log(2)
            navigator.msSaveBlob(blob, fileName);
          } else {
            // console.log(3)
            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            //释放内存
            window.URL.revokeObjectURL(link.href);
          }
        })
        .catch(error => {
          this.dialogVisibles = false;
          this.$notify.info({
            title: "消息",
            message: "数据导出失败"
          });
        });
    },
    //列表
    registrationList() {
      let params = {
        activityId: this.activityId,
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        sortBy: null,
        sortOrder: null,
        registrationReview: null,
        registrationStatus: null
      };
      this.$http
        .post("/review-center/activity/registration/list", params)
        .then(res => {
          if (res.data.code == "200") {
            this.formInline.verifyId = res.data.data.activityName;
            this.tableData = res.data.data.activityRegistrationRowVO.list;
            this.formAttributes = res.data.data.formAttributes;
            this.page.total = res.data.data.activityRegistrationRowVO.total;
            this.textarea = res.data.data.remark;
          } else {
          }
        })
        .catch(error => {});
    },
    handleSelectionChange(val) {
      this.arrActivity = [];
      this.multipleSelection = val;
      this.multipleSelection.forEach((item, index, array) => {
        this.arrActivity.push(item.id);
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    handleClick() {},
    //分页
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      this.registrationList();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.registrationList();
    }
  },
  created() {
    this.activityId = this.$route.query.activityId;
    this.registrationList();
  }
};
</script>
<style lang="scss">
.aspe {
  width: 100%;
  background: #f8f8f8;
  border: 1px solid #f8f8f8;
  .aspe-nav {
    margin: 40px 0 0 20px;
    font-size: 18px;
    color: #2a2a2a;
    text-align: left;
    font-family: PingFangSC-Medium;
    color: #2a2a2a;
  }
  .aspe-content {
    width: 1130px;
    margin: 30px 0 20px 20px;
    height: 142px;
    background: #ffffff;
    .demo-form-inline {
      text-align: left;
      padding: 30px 0 0 15px;
    }
  }
  .footer {
    width: 1130px;
    margin: 15px 0 20px 20px;
    height: auto;
    background: #ffffff;
    .button {
      button:nth-child(1) {
        width: 106px;
        height: 38px;
        background: #20a0ff;
        font-family: PingFangSC-Medium;
        color: #ffffff;
        font-size: 14px;
        border: 1px solid #20a0ff;
        border-radius: 5px;
        margin: 30px 0 0 32px;
      }
    }
    .table {
      margin: 30px 0 0 30px;
      .el-table th {
        white-space: nowrap;
        overflow: hidden;
        user-select: none;
        background: #f0f0f0;
      }
    }
    .demo-input-suffix {
      display: flex;
      flex-direction: row;
      margin: 0 0 0 30px;
    }
  }
}
</style>