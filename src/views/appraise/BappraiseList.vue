<template>
  <div class="aspe">
    <div class="aspe-nav">B端活动列表</div>
    <div class="aspe-contents">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="关键字">
          <el-input v-model="formInline.keyword" placeholder="请输入活动名称/ID"></el-input>
        </el-form-item>
        <el-form-item label="活动方式">
          <el-select v-model="formInline.street" placeholder="请选择活动方式">
            <el-option label="线上" value="0"></el-option>
            <el-option label="线下" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="formInline.state" placeholder="请选择审核状态">
            <el-option label="审核通过" value="0"></el-option>
            <el-option label="审核不通过" value="1"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item>
          <el-button style="margin:0 0 0 700px" plian @click="onSubmit">重置</el-button>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <div class="button">
        <button>发布活动</button>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 1070px">
          <el-table-column prop="date" width="70" label="ID"></el-table-column>
          <el-table-column prop="name" label="活动封面"></el-table-column>
          <el-table-column prop="address" label="活动名称"></el-table-column>
          <el-table-column prop="date" label="活动方式"></el-table-column>
          <el-table-column prop="name" label="报名人数">
            <template slot-scope="scope">
              <span @click="handlenumber(scope.row)" size="small">5/100</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="活动审核状态"></el-table-column>
          <el-table-column prop="date" sortable width="120" label="发布时间"></el-table-column>
          <el-table-column prop="name" sortable width="130" label="活动开始时间"></el-table-column>
          <el-table-column prop="address" sortable width="130" label="活动结束时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" @click="BappraiseEdit()" size="small">编辑</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
              <el-button type="text" @click="appraiseAudit(scope.row)" size="small">活动审核</el-button>
            </template>
          </el-table-column>
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
        keyword: "",
        state: "",
        street: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    //获取活动列表
    appraiseList() {
      let params = {
        activityName: this.formInline.keyword ? this.formInline.keyword : null,
        activityProceedState: "HAVE_NOT_STARTED",
        activityRegistrationState: "REGISTRATION_NOT_STARTED",
        activityState: "NOT_KNOWN",
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .put(`/consumer-core/activity/registration`, params)
        .then(res => {
          if (res.data.code == 200) {
            this.dialogVisibles = false;
            this.textarea = "";
            this.enroll();
          } else {
          }
        })
        .catch(error => {});
    },
    //编辑
    BappraiseEdit() {
      this.$router.push({ path: "/BappraiseEdit" });
    },
    //活动审核
    appraiseAudit(res) {
      this.$router.push({ path: "/appraiseAudit" });
    },
    //人数点击
    handlenumber(res) {
      console.log(res);
      this.$router.push({ path: "/BenrollVerify" });
    },
    onSubmit() {
      console.log("submit!");
    },
    handleClick() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  created() {
    // this.appraiseList();
  }
};
</script>
<style lang="scss" >
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
  .aspe-contents {
    width: 1130px;
    margin: 30px 0 20px 20px;
    height: 182px;
    background: #ffffff;
    .demo-form-inline {
      text-align: center;
      padding: 30px 0 20px 0;
    }
  }
  .footer {
    width: 1130px;
    margin: 15px 0 20px 20px;
    height: auto;
    background: #ffffff;
    .button {
      button {
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
  }
}
</style>