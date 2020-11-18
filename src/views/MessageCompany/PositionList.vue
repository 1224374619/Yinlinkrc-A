<template>
  <div class="asp">
    <div class="asp-nav">职位</div>
    <div class="asp-content">
      <el-dialog
        title
        :show-close="false"
        :append-to-body="true"
        :visible.sync="dialogVisible"
        width="25%"
        :before-close="handleClose"
      >
        <div>
          <div class="loading">
            <i style="font-size:60px;color:#ffbf27;" class="el-icon-warning-outline"></i>
          </div>
          <div class="loading-text">该职位为在招职位，请先下线!</div>
          <div style="text-align:center">
            <el-button
              style="width:93px;height:33px;line-height:0px"
              @click="keep()"
              type="primary"
            >确定</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        title
        :show-close="false"
        :append-to-body="true"
        :visible.sync="dialogVisibleDelete"
        width="25%"
        :before-close="handleClose"
      >
        <div>
          <div style="margin:-30px 0 0 0" class="loading-text">是否删除该职位？</div>
          <div style="text-align:center;margin:50px 0 30px 0">
            <span slot="footer" class="dialog-footer">
              <el-button
                style="width:93px;height:33px;line-height:0px;margin:0 40px 0 0"
                @click="dialogVisibleDelete = false"
              >取 消</el-button>
              <el-button
                style="width:93px;height:33px;line-height:0px"
                type="primary"
                @click="keepDelete()"
              >确 定</el-button>
            </span>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        title
        :show-close="false"
        :append-to-body="true"
        :visible.sync="dialogVisibleOut"
        width="25%"
        :before-close="handleClose"
      >
        <div>
          <div style="margin:-30px 0 0 0" class="loading-text">确定下架该职位吗？</div>
          <div style="text-align:center;margin:50px 0 30px 0">
            <span slot="footer" class="dialog-footer">
              <el-button
                style="width:93px;height:33px;line-height:0px;margin:0 40px 0 0"
                @click="dialogVisibleOut = false"
              >取 消</el-button>
              <el-button
                style="width:93px;height:33px;line-height:0px"
                type="primary"
                @click="dialogVisibleOut = false"
              >确 定</el-button>
            </span>
          </div>
        </div>
      </el-dialog>
      <div class="asp-form">
        <el-form
          :inline="true"
          :model="formInline"
          label-width="130px"
          ref="formInline"
          class="demo-form-inline"
          style="background:#ffffff;"
        >
          <div style="height:20px"></div>

          <el-form-item label="职位名称">
            <el-input v-model="formInline.positionName" placeholder="职位名称"></el-input>
          </el-form-item>
          <el-form-item label="职位状态">
            <el-select v-model="formInline.state" placeholder="职位状态">
              <el-option label="已下线" value="0"></el-option>
              <el-option label="招聘中" value="1"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="发布人">
            <el-select v-model="formInline.popName" placeholder="发布人">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item style="margin:0 90px 0 0;display: flex;justify-content:flex-end">
            <el-button style="margin:0 0 30px 0" @click="resetForm()">重置</el-button>
            <el-button type="primary" @click="submitForms()">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="asp-table">
          <!-- <div style="margin:30px 0 30px 30px">
            <el-button type="primary" @click="toggleSelection()">新增职位</el-button>
          </div> -->
          <div>
            <el-table :data="tableData" tooltip-effect="dark" style="width:1084px;margin:0 auto">
              <!-- <el-table-column type="selection" width="60"></el-table-column> -->
              <!-- <el-table-column label="日期" width="100">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>-->
              <!-- <el-table-column prop="name" label="姓名"></el-table-column> -->
              <el-table-column prop="positionName" label="职位名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="jobType" label="职位性质" show-overflow-tooltip></el-table-column>
              <el-table-column prop="workAddress.detail" label="工作地点" show-overflow-tooltip></el-table-column>
              <el-table-column label="薪资范围" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.salaryMin }}K-{{scope.row.salaryMax}}K</template>
              </el-table-column>
              <el-table-column prop="resumeNum" label="投递数量" show-overflow-tooltip></el-table-column>
              <el-table-column prop="manager" label="负责人" show-overflow-tooltip></el-table-column>
              <el-table-column prop="positionState" label="状态" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.positionState | stateDate}}</template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button
                    style="color:#FF4F4E"
                    type="text"
                    size="small"
                    @click="deletepositon(scope.row)"
                  >删除</el-button>
                  <el-button
                    style="color:#FF4F4E"
                    type="text"
                    size="small"
                    @click="offline(scope.row)"
                    v-if="scope.row.positionState === 'ONLINE'"
                  >下线</el-button>
                  <el-button
                    style="color:#FF4F4E"
                    type="text"
                    size="small"
                    @click="online(scope.row)"
                    v-else
                  >上线</el-button>
                </template>
              </el-table-column>
            </el-table>
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
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisibleDelete: false,
      dialogVisibleOut: false,
      formInline: {
        positionName: "",
        state: "",
        popName: ""
      },
      currentPage: 4,
      tableData: [],
      page: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      companyID: "",
      id: ""
    };
  },
  methods: {
    //上线
    online(tab) {
      let params = {
        ids: [tab.id]
      };
      this.$http
        .put("/backend-manager/positions/online", params)
        .then(res => {
          if (res.data.code == 200) {
            this.submitForm();
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
    //下线
    offline(tab) {
      let params = {
        ids: [tab.id]
      };
      this.$http
        .put("/backend-manager/positions/offline", params)
        .then(res => {
          if (res.data.code == 200) {
            this.submitForm();
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
    //上架状态删除 确定
    keep() {
      this.dialogVisible = false;
    },
    keepDelete() {
      this.$http
        .delete(`/backend-manager/positions/${this.id}`)
        .then(res => {
          if (res.data.code == 204) {
            this.submitForm();
            this.dialogVisibleDelete = false;
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
    deletepositon(tab) {
      this.id = tab.id;
      if (tab.positionState === "ONLINE") {
        this.dialogVisible = true;
      } else {
        this.dialogVisibleDelete = true;
      }
    },
    //重置
    resetForm() {
      this.formInline.positionName = "";
      this.formInline.state = "";
      this.formInline.popName = "";
    },
    //查询
    resetForm() {
      this.formInline.positionName = "";
      this.formInline.state = "";
      this.formInline.popName = "";
      this.formInline.companyName = "";
      this.formInline.salary = "";
    },
    //created
    submitForm() {
      let params = {
        companyId: this.companyID,
        keywords: null,
        pageNum: 1,
        pageSize: 10,
        positionName: null,
        positionState: null,
        salaryMax: null,
        salaryMin: null,
        sortBy: null,
        sortOder: null
      };
      this.$http
        .post("/backend-manager/positions/search", params)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.page.total = res.data.data.total;
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
    //查询
    submitForms() {
      let params = {
        companyId: this.companyID,
        keywords: null,
        pageNum: 1,
        pageSize: 10,
        positionName: this.formInline.positionName
          ? this.formInline.positionName
          : null,
        positionState: this.formInline.state ? this.formInline.state : null,
        salaryMax: null,
        salaryMin: null,
        sortBy: null,
        sortOder: null
      };
      this.$http
        .post("/backend-manager/positions/search", params)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.page.total = res.data.data.total;
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
    toggleSelection() {
      this.$router.push({
        path: "/AddPosition",
        query: { companyID: this.companyID }
      });
      // if (rows) {
      //   rows.forEach(row => {
      //     alert(1121)
      //     this.$refs.multipleTable.toggleAllSelection(row);
      //   });
      // } else {
      //   alert(11211)
      //   this.$refs.multipleTable.clearSelection();
      // }
    },
    handleClick(tab, event) {
      this.$router.push({
        path: "/JobDetail",
        query: {
          positionID: tab.id,
        }
      });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      let params = {
        companyId: this.companyID,
        keywords: null,
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        positionName: null,
        positionState: null,
        salaryMax: null,
        salaryMin: null,
        sortBy: null,
        sortOder: null
      };
      this.$http
        .post("/backend-manager/positions/search", params)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
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
    handleCurrentChange(val) {
      this.page.current = val;
      let params = {
        companyId: this.companyID,
        keywords: null,
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        positionName: null,
        positionState: null,
        salaryMax: null,
        salaryMin: null,
        sortBy: null,
        sortOder: null
      };
      this.$http
        .post("/backend-manager/positions/search", params)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
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
  },
  mounted: function() {},
  updated: function() {},
  created() {
    let token = Cookies.get("Atoken");
    this.companyID = this.$route.query.companyID;
    if (token) {
      this.submitForm();
    }else {
      this.$notify.error({
        title: "错误",
        message: "登陆超时，请重新登录"
      });
      this.$router.push({ path: "/login" });
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
.el-form-item {
  padding: 10px 0 0 20px;
}
.el-select {
  width: 203px;
}
.asp-table {
  width: 100%;
  border: 1px solid #f8f8f8;
  background: #ffffff;
  margin: 10px 0 0 0;
  .el-table th {
    background: #f0f0f0;
  }
}
.el-pagination {
  margin: 20px 0 0 0;
  padding: 0 0 20px 0;
  text-align: center;
}
.loading-text {
  font-size: 22px;
  color: #222222;
  text-align: center;
  margin: 30px 0 30px 0;
  font-weight: bold;
}
</style>