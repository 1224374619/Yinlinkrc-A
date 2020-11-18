<template>
  <div class="aspe">
    <div class="aspe-nav">后台报名人员列表</div>
    <div class="aspe-content">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="活动ID">
          <el-input v-model="formInline.verifyId" placeholder="请输入活动ID"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <div class="button">
        <button>导 出</button>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 1070px" @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="date" label="姓名"></el-table-column>
          <el-table-column prop="name" label="手机号"></el-table-column>
          <el-table-column prop="address" label="邮箱"></el-table-column>
          <el-table-column prop="date" label="性别"></el-table-column>
          <el-table-column prop="name" label="年龄"></el-table-column>
          <el-table-column prop="address" label="职位"></el-table-column>
          <el-table-column prop="date" label="学历"></el-table-column>
          <el-table-column prop="name" label="毕业院校"></el-table-column>
          <el-table-column prop="address" label="专业院系"></el-table-column>
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
  created() {}
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