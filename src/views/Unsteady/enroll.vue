<template>
  <div class="unsteady">
    <div class="title">
      <div class="title-nav">2020北京科技大学招聘会</div>
    </div>
    <div class="content">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" v-if="verify">
        <el-form-item label="报名状态">
          <el-select style="width:150px" v-model="formInline.region" placeholder="请选择">
            <el-option label="全部" value="0"></el-option>
            <el-option label="已报名" value="1"></el-option>
            <el-option label="未报名" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-input placeholder="搜索活动名称" suffix-icon="el-icon-search" v-model="input1"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" v-else>
        <el-form-item label="审核状态">
          <el-select style="width:150px" v-model="formInline.region" placeholder="请选择">
            <el-option label="全部" value="0"></el-option>
            <el-option label="待审核" value="1"></el-option>
            <el-option label="审核通过" value="2"></el-option>
            <el-option label="审核未通过" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-input placeholder="搜索活动名称" suffix-icon="el-icon-search" v-model="input1"></el-input>
        </el-form-item>
      </el-form>
      <div class="excel">导处Excel</div>
      <div>
        <el-table
          :data="tableData"
          style="width: 923px;margin:10px 0 0 20px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="date" label="姓名"></el-table-column>
          <el-table-column prop="name" label="手机号"></el-table-column>
          <el-table-column prop="name" label="邮箱"></el-table-column>
          <el-table-column prop="date" show-overflow-tooltip label="性别"></el-table-column>
          <el-table-column prop="name" label="年龄"></el-table-column>
          <el-table-column prop="name" label="职位"></el-table-column>
          <el-table-column prop="date" label="毕业院校"></el-table-column>
          <el-table-column prop="name" label="专业院系"></el-table-column>
          <el-table-column prop="name" label="报名状态"></el-table-column>
          <el-table-column prop="name" v-if="verify" label="审核状态"></el-table-column>
        </el-table>
      </div>
      <div style="margin:30px 0 20px 0" v-if="verify">
        <button class="enroll-button" style="margin:0 0 0 60px" type="danger">审核不通过</button>
        <button class="enroll-buttons" type="primary">审核通过</button>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-sizes="page.pageSizeOpts"
        class="pagination"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      verify: false,
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
      ],
      page: {
        total: 0,
        pageSize: 5,
        current: 1,
        pageSizeOpts: [5, 10, 20]
      }
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      this.notification();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.notification();
    }
  },
  created() {}
};
</script>
<style lang="stylus">
.unsteady {
  margin: 30px 0 0 0;

  .title {
    width: 963px;
    height: 50px;
    background: #FAFAFA;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .title-nav {
      font-family: PingFangSC-Medium;
      color: #327CF3;
      font-size: 16px;
      margin: 17px 0 0 20px;
    }

    .title-content {
      font-family: PingFangSC-Medium;
      color: #737373;
      font-size: 14px;
      margin: 18px 20px 0 0;
    }
  }

  .content {
    width: 963px;
    height: auto;
    background: #FFFFFF;
    border: 1px solid rgba(246, 246, 246, 1);
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);

    .excel {
      display: flex;
      justify-content: flex-end;
      margin: 0 20px 0 0;
      font-family: PingFangSC-Regular;
      color: #FF9B26;
      font-size: 12px;
    }

    .enroll-button {
      background: #FC5454;
      border: 1px solid #FC5454;
      width: 80px;
      height: 28px;
      font-family: PingFangSC-Regular;
      color: #FFFFFF;
      font-size: 12px;
      border-radius: 5px;
    }

    .enroll-buttons {
      background: #327CF3;
      border: 1px solid #327CF3;
      width: 80px;
      height: 28px;
      font-family: PingFangSC-Regular;
      color: #FFFFFF;
      font-size: 12px;
      border-radius: 5px;
      margin: 0 0 0 20px;
    }
  }
}
</style>