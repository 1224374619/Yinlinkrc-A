<template>
  <div class="unsteady">
    <div class="title"></div>
    <div class="content">
      <div class="tab-operations">
        <el-input placeholder="搜索活动名称" suffix-icon="el-icon-search" v-model="supervise"></el-input>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="card">
        <el-tab-pane name="first">
          <span slot="label">全部</span>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="活动封面"></el-table-column>
            <el-table-column prop="name" label="活动名称"></el-table-column>
            <el-table-column prop="address" label="报名人数"></el-table-column>
            <el-table-column prop="date" label="活动开始时间"></el-table-column>
            <el-table-column prop="name" label="活动截止时间"></el-table-column>
            <el-table-column prop="address" label="发布时间"></el-table-column>
            <el-table-column prop="address" label="活动状态"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClickdetail(scope.row)" type="text" size="small">报名详情</el-button>
                <el-button type="text" size="small">分享</el-button>
                <el-button type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
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
        </el-tab-pane>
        <el-tab-pane label="待审核" name="second">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="活动封面"></el-table-column>
            <el-table-column prop="name" label="活动名称"></el-table-column>
            <el-table-column prop="address" label="报名人数"></el-table-column>
            <el-table-column prop="date" label="活动开始时间"></el-table-column>
            <el-table-column prop="name" label="活动截止时间"></el-table-column>
            <el-table-column prop="address" label="发布时间"></el-table-column>
            <el-table-column prop="address" label="活动状态"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small">报名详情</el-button>
                <el-button type="text" size="small">分享</el-button>
                <el-button type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane name="third">
          <template slot="label">
            <el-dropdown>
              <span class="el-dropdown-link">审核通过</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus">全部</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus">报名未开始</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus-outline">报名进行中</el-dropdown-item>
                <el-dropdown-item icon="el-icon-check">报名已截至</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="活动封面"></el-table-column>
            <el-table-column prop="name" label="活动名称"></el-table-column>
            <el-table-column prop="address" label="报名人数"></el-table-column>
            <el-table-column prop="date" label="活动开始时间"></el-table-column>
            <el-table-column prop="name" label="活动截止时间"></el-table-column>
            <el-table-column prop="address" label="发布时间"></el-table-column>
            <el-table-column prop="address" label="活动状态"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small">报名详情</el-button>
                <el-button type="text" size="small">分享</el-button>
                <el-button type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="审核未通过" name="fourth">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="活动封面"></el-table-column>
            <el-table-column prop="name" label="活动名称"></el-table-column>
            <el-table-column prop="address" label="报名人数"></el-table-column>
            <el-table-column prop="date" label="活动开始时间"></el-table-column>
            <el-table-column prop="name" label="活动截止时间"></el-table-column>
            <el-table-column prop="address" label="发布时间"></el-table-column>
            <el-table-column prop="address" label="活动状态"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small">报名详情</el-button>
                <el-button type="text" size="small">分享</el-button>
                <el-button type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      supervise: "",
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //查看详情
    handleClickdetail(row) {
      this.$router.push({
        path: "/unsteady/promotionalDetail"
      });
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

<style lang="stylus" scoped>
.unsteady {
  margin: 30px 0 0 0;

  .title {
    width: 963px;
    height: 50px;
    background: #FAFAFA;
  }

  .content {
    width: 963px;
    height: auto;
    background: #FFFFFF;
    border: 1px solid rgba(246, 246, 246, 1);
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);

    .card {
      width: 923px;
      margin: 30px 0 0 20px;
    }

    .tab-operations {
      position: absolute;
      margin: 25px 0 0 700px;
      z-index: 999;
    }
  }
}
</style>