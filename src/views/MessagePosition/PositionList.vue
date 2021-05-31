<template>
  <div class="asp">
    <div class="asp-nav">职位列表</div>
    <div class="asp-content">
      <el-dialog
        title
        :show-close="false"
        :append-to-body="true"
        :visible.sync="dialogVisible"
        width="25%"
        
      >
        <div>
          <div class="loading">
            <i style="font-size:60px;color:#20A0ff;" class="el-icon-loading"></i>
          </div>
          <div class="loading-text">正在导入中...</div>
        </div>
      </el-dialog>
      <el-dialog
        title
        :show-close="false"
        :append-to-body="true"
        :visible.sync="dialogVisibleOut"
        width="25%"
        
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
        :visible.sync="dialogVisibleSuccess"
        width="25%"
        
      >
        <div>
          <div class="loading">
            <i style="font-size:60px;color:#00C243;" class="el-icon-success"></i>
          </div>
          <div class="loading-text">公司/职位导入成功</div>
          <div style="text-align:center">
            <el-button
              style="width:93px;height:33px;line-height:0px"
              @click="dialogVisibleSuccess = false"
              type="primary"
            >确定</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        title="导入失败"
        :show-close="false"
        :append-to-body="true"
        :visible.sync="dialogVisibles"
        width="25%"
        
      >
        <div>
          <div>
            <i style="font-size:19px;color:#ff503b" class="el-icon-circle-close"></i>
            <span style="color:#373737;font-size:16px;margin:0 0 0 6px">以下公司职位导入失败：</span>
          </div>
          <div class="outcompany">
            <div style="font-size:16px">1.腾讯公司</div>
            <div style="font-size:16px">2.腾讯公司</div>
            <div style="font-size:16px">3.腾讯公司</div>
            <div style="font-size:16px">4.腾讯公司</div>
          </div>
          <div style="text-align:center;margin:30px 0 0 0">
            <el-button style="width:93px;height:33px;line-height:0px" type="primary">确定</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        title
        :show-close="false"
        :append-to-body="true"
        :visible.sync="dialogVisibleDelete"
        width="25%"
        
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
              <el-option label="已下线" value="0" class="option">
                <!-- <span style="float: left">已上线</span>
                <span class="span-hover" style="float: right; color: #8492a6; font-size: 13px">编辑</span>-->
              </el-option>
              <el-option label="招聘中" value="1"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="发布人">
          <el-select filterable v-model="formInline.popName" placeholder="发布人">-->
          <!-- <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>-->
          <!-- </el-select>
          </el-form-item>-->
          <el-form-item label="公司ID">
            <el-input v-model="formInline.companyName" placeholder="公司ID"></el-input>
          </el-form-item>
          <el-form-item label="薪资范围">
            <el-select v-model="formInline.salary" placeholder="薪资范围">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin:0 90px 0 0;display: flex;justify-content:flex-end">
            <el-button style="margin:0 0 30px 0" @click="resetForm()">重置</el-button>
            <el-button type="primary" @click="submitForm()">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="asp-table">
          <div style="margin:30px 0 30px 30px">
            <el-upload
              class="avatar-upload"
              action="#"
              style="margin-left:0px"
              :show-file-list="false"
              :http-request="uploadFile"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            >
              <el-button type="primary">导入职位</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传Excel文件</div> -->
            </el-upload>
          </div>
          <div>
            <el-table
              :data="tableData"
              tooltip-effect="dark"
              style="width:1084px;margin:0 auto"
              @selection-change="handleSelectionChange"
            >
              <!-- <el-table-column type="selection" width="60"></el-table-column> -->
              <!-- <el-table-column label="日期" width="100">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>-->
              <!-- <el-table-column prop="name" label="姓名"></el-table-column> -->
              <el-table-column prop="positionName" label="职位名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="jobType" label="工作性质" show-overflow-tooltip></el-table-column>
              <el-table-column prop="company.fullName" label="公司名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="workAddress.detail" label="工作地点" show-overflow-tooltip></el-table-column>
              <el-table-column label="薪资范围" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.salaryMin }}K-{{scope.row.salaryMax}}K</template>
              </el-table-column>
              <el-table-column prop="resumeNum" label="投递数量" show-overflow-tooltip></el-table-column>
              <el-table-column prop="positionState" label="状态" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.positionState | stateDate}}</template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button
                    style="color:#FF4F4E"
                    @click="position(scope.row)"
                    type="text"
                    size="small"
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
      dialogVisibles: false,
      dialogVisibleSuccess: false,
      dialogVisibleOut: false,
      dialogVisibleDelete: false,
      formInline: {
        positionName: "",
        state: "",
        popName: "",
        companyName: "",
        salary: ""
      },
      currentPage: 4,
      tableData: [],
      id: "",
      options: [
        {
          value: "0",
          label: "1K以下"
        },
        {
          value: "1",
          label: "1K-2K"
        },
        {
          value: "2",
          label: "2K-4K"
        },
        {
          value: "3",
          label: "4K-6K"
        },
        {
          value: "4",
          label: "6K-8K"
        },
        {
          value: "5",
          label: "8K-10K"
        },
        {
          value: "6",
          label: "10K-15K"
        },
        {
          value: "7",
          label: "15K-25K"
        },
        {
          value: "8",
          label: "25K-35K"
        },
        {
          value: "9",
          label: "35K以上"
        }
      ],
      page: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      multipleSelection: []
    };
  },
  methods: {
    //上架状态删除 确定
    keep() {
      this.dialogVisibleOut = false;
    },
    //重置
    resetForm() {
      this.formInline.positionName = "";
      this.formInline.state = "";
      this.formInline.popName = "";
      this.formInline.companyName = "";
      this.formInline.salary = "";
    },
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
          
        });
    },
    //查询
    submitForm() {
      let salaryMin;
      let salaryMax;
      switch (this.formInline.salary) {
        case "0":
          salaryMin = 0;
          salaryMax = 1;
          break;
        case "1":
          salaryMin = 1;
          salaryMax = 2;
          break;
        case "2":
          salaryMin = 2;
          salaryMax = 4;
          break;
        case "3":
          salaryMin = 4;
          salaryMax = 6;
          break;
        case "4":
          salaryMin = 6;
          salaryMax = 8;
          break;
        case "5":
          salaryMin = 8;
          salaryMax = 10;
          break;
        case "6":
          salaryMin = 10;
          salaryMax = 15;
          break;
        case "7":
          salaryMin = 15;
          salaryMax = 25;
          break;
        case "8":
          salaryMin = 25;
          salaryMax = 35;
          break;
        case "9":
          salaryMin = 35;
          salaryMax = null;
          break;
      }
      let params = {
        companyId: this.formInline.companyName
          ? this.formInline.companyName
          : null,
        keywords: null,
        pageNum: 1,
        pageSize: 10,
        positionName: this.formInline.positionName
          ? this.formInline.positionName
          : null,
        positionState: this.formInline.state ? this.formInline.state : null,
        salaryMax: salaryMax,
        salaryMin: salaryMin,
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
          
        });
    },
    toggleSelection() {
      this.dialogVisibles = true;
      this.$refs.multipleTable.toggleAllSelection();
    },
    //删除确认
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
          
        });
    },
    position(tab, event) {
      this.id = tab.id;
      if (tab.positionState === "ONLINE") {
        this.dialogVisibleOut = true;
      } else {
        this.dialogVisibleDelete = true;
      }
    },
    handleClick(tab, event) {
      this.$router.push({
        path: "/JobDetail",
        query: {
          positionID: tab.id
        }
      });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      let params = {
        companyId: null,
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
          
        });
    },
    handleCurrentChange(val) {
      this.page.current = val;
      let params = {
        companyId: null,
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
          
        });
    },
    // 自定义上传 导入数据
    uploadFile(item) {
      const formData = new FormData();
      formData.append("file", item.file);
      console.log(item.file);
      formData.append("sheetId", 0);
      formData.append("startNum", 2);
      console.log(formData);
      this.dialogVisible = true;
      this.$http
        .post("/backend-manager/positions/import", formData)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.submitForm(); //导入成功刷新列表
            this.dialogVisible = false;
            this.dialogVisibleSuccess = true;
          } else {
            this.$message({
              type: "error",
              message: data.msg
            });
          }
        })
        .catch(err => {});
    }
  },
  mounted: function() {},
  updated: function() {},
  created() {
    let token = Cookies.get("Atoken");
    if (token) {
      this.submitForm();
    } else {
      this.$notify.info({
        title: "消息",
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
.loading {
  text-align: center;
  margin: -40px 0 0 0;
}
.loading-text {
  font-size: 24px;
  color: #222222;
  text-align: center;
  margin: 30px 0 30px 0;
  font-weight: bold;
}
.el-dialog__header {
  padding: 20px 20px 10px;
  text-align: center;
  color: #222;
  font-size: 22px;
  font-weight: bold;
}
.outcompany {
  height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 20px 0 0 0;
  overflow-x: hidden;
}
.outcompany div {
  padding: 10px 0 0 10px;
}
.span-hover {
  color: #373737;
  font-size: 16px;
  opacity: 0;
}
.option:hover span {
  opacity: 1;
}
</style>