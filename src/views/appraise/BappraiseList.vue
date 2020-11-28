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
            <el-option label="待审核" value="PROCESSING"></el-option>
            <el-option label="审核通过" value="HAVE_PUBLISHED"></el-option>
            <el-option label="审核不通过" value="NOT_PASSED"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item>
          <el-button style="margin:0 0 0 700px" plian @click="result">重置</el-button>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <!-- <div class="button">
        <button>发布活动</button>
      </div>-->
      <div class="table">
        <el-table :data="tableData" style="width: 1070px">
          <el-table-column prop="id" label="ID" width="70"></el-table-column>
          <el-table-column label="活动封面">
            <template slot-scope="scope">
              <img :src="scope.row.activityPosterUrl" style="height:52px;width:91px" class="head_pic" />
            </template>
          </el-table-column>
          <el-table-column prop="activityName" label="活动名称"></el-table-column>
          <el-table-column label="活动方式">
            <template slot-scope="scope">{{scope.row.activityMode|levels}}</template>
          </el-table-column>
          <el-table-column label="报名人数">
            <template slot-scope="scope">
              <span
                @click="handlenumber(scope.row)"
                size="small"
              >{{scope.row.registeredNum}}/{{scope.row.registrationNum}}</span>
            </template>
          </el-table-column>
          <el-table-column label="审核状态">
            <template slot-scope="scope">{{scope.row.activityState|level}}</template>
          </el-table-column>
          <el-table-column sortable width="120" label="发布时间">
            <template slot-scope="scope">{{scope.row.createdTime|formatDateOne}}</template>
          </el-table-column>
          <el-table-column width="130" sortable label="活动开始时间">
            <template slot-scope="scope">{{scope.row.activityStartTime|formatDateOne}}</template>
          </el-table-column>
          <el-table-column width="130" sortable label="活动结束时间">
            <template slot-scope="scope">{{scope.row.activityEndTime|formatDateOne}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" @click="appraiseEdit(scope.row)" size="small">编辑</el-button>
              <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
              <el-button
                v-if="scope.row.activityState === 'PROCESSING'"
                type="text"
                @click="appraiseAudit(scope.row)"
                size="small"
              >活动审核</el-button>
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
      tableData: []
    };
  },
  methods: {
    //重置
    result() {
      this.formInline = {
        keyword: "",
        state: "",
        street: ""
      };
    },
    //删除
    handleDelete(res) {
      this.$http
        .delete(`/review-center/activity/${res.id}/${res.activityId}`)
        .then(res => {
          if (res.data.code == 200) {
            this.appraiseList();
          } else {
          }
        })
        .catch(error => {});
    },
    //获取活动列表
    appraiseList() {
      let params = {
        activityName: this.formInline.keyword ? this.formInline.keyword : null,
        activityMode: this.formInline.street ? this.formInline.street : null,
        activityRegistrationState: null,
        activityState: this.formInline.state ? this.formInline.state : null,
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .post(`/review-center/activity/list`, params)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.page.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {});
    },
    //查看
    handleClick(res) {
      this.$router.push({
        path: "/BappraiseEdit",
        query: {
          id: res.id,
          activityId: res.activityId,
          activityState: res.activityState
        }
      });
    },
    //编辑
    appraiseEdit(res) {
      this.$router.push({
        path: "/BappraiseEdit",
        query: {
          id: res.id,
          activityId: res.activityId,
          activityState: res.activityState
        }
      });
    },
    //活动审核
    appraiseAudit(res) {
      this.$router.push({
        path: "/BappraiseEdit",
        query: {
          id: res.id,
          activityId: res.activityId,
          activityState: res.activityState
        }
      });
    },
    //人数点击
    handlenumber(res) {
      console.log(res);
      this.$router.push({
        path: "/BenrollVerify",
        query: {
          activityId: res.activityId
        }
      });
    },
    onSubmit() {
      this.appraiseList();
    },
    //分页
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      this.appraiseList();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.appraiseList();
    }
  },
  created() {
    this.appraiseList();
  },
  filters: {
    level(level) {
      var a;
      switch (level) {
        case "NOT_KNOWN":
          a = "未知";
          break;
        case "PROCESSING":
          a = "待审核";
          break;
        case "HAVE_PUBLISHED":
          a = "已发布";
          break;
        case "NOT_PASSED":
          a = "未通过";
          break;
        default:
          a = "已下线";
          break;
      }
      return a;
    },
    levels(levels) {
      var a;
      switch (levels) {
        case 0:
          a = "线上活动";
          break;
        case 1:
          a = "线下活动";
          break;
      }
      return a;
    }
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
      margin: 0 0 0 30px;
      padding: 30px 0 0 0;
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