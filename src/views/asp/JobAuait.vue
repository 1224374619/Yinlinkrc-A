<template>
  <div class="asp">
    <div class="asp-nav">职位审核</div>
    <div class="asp-content">
      <div class="asp-form">
        <el-form
          :inline="true"
          label-width="120px"
          :model="formInline"
          class="demo-form-inline"
          style="background:#ffffff;width:98%;margin:0 0 0 13px"
        >
          <div style="height:15px"></div>
          <el-form-item label="职位名称">
            <el-input v-model="formInline.PositionName" placeholder="职位名称"></el-input>
          </el-form-item>
          <el-form-item label="公司ID">
            <el-input v-model="formInline.Company" placeholder="公司ID"></el-input>
          </el-form-item>
          <el-form-item label="职位ID">
            <el-input v-model="formInline.CompanyId" placeholder="职位ID"></el-input>
          </el-form-item>
          <!-- <el-form-item label="未通过原因">
            <el-select v-model="formInline.Reason" placeholder="请选择未通过原因">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>-->
          <!-- <el-form-item label="提交时间段">
            <el-date-picker
              v-model="formInline.valueTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>-->
          <el-form-item style="margin:0 0 30px 890px">
            <el-button @click="Ressetting()">重置</el-button>
            <el-button type="primary" @click="Inquiry()">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="asp-table">
          <el-tabs
            v-model="activeName"
            type="card"
            @tab-click="handleClicktab"
            style="width:1084px;margin:20px auto"
          >
            <el-tab-pane label="待审核" name="first">
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="100"></el-table-column>
                <el-table-column prop="positionId" label="职位ID"></el-table-column>
                <el-table-column prop="positionName" label="职位名称"></el-table-column>
                <!-- <el-table-column prop="address" label="是否出现敏感词" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="createdTime" sortable label="提交时间" show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.createdTime | formatDate}}</template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <!-- <el-button type="text"  @click="DefineFirst(scope.row)" size="small">通过</el-button>
                    <el-tooltip class="item" effect="light" placement="bottom-start">
                      <div slot="content">
                        <span>
                          <i style="color:#faad14;margin:0 5px 0 0" class="el-icon-warning-outline"></i>
                        </span>
                        <span>请选择不通过的原因</span>
                        <div style="font-size:10px">
                          <el-checkbox-group v-model="checkList">
                            <el-checkbox label="含虚假信息"></el-checkbox>
                            <br />
                            <el-checkbox label="含违法信息"></el-checkbox>
                            <br />
                            <el-checkbox label="非法传销"></el-checkbox>
                            <br />
                            <el-checkbox label="涉黄"></el-checkbox>
                            <br />
                            <el-checkbox label="涉嫌诈骗"></el-checkbox>
                          </el-checkbox-group>
                          <br />
                          <el-button style="width:50px;height:20px;font-size:10px;padding:0 0">取消</el-button>
                          <el-button
                            style="width:50px;height:20px;font-size:10px;padding:0 0"
                            type="primary"
                            @click="Define(scope.row)"
                          >确认</el-button>
                        </div>
                      </div>
                      <el-button type="text" size="small">未通过</el-button>
                    </el-tooltip>-->
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
            </el-tab-pane>
            <el-tab-pane label="通过" name="second">
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="100"></el-table-column>
                <el-table-column prop="positionId" label="职位ID"></el-table-column>
                <el-table-column prop="positionName" label="职位名称"></el-table-column>
                <el-table-column prop="companyId" label="所属公司ID" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="address" label="是否出现敏感词" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="createdTime" sortable label="提交时间" show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.createdTime | formatDate}}</template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
            </el-tab-pane>
            <el-tab-pane label="不通过" name="third">
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="100"></el-table-column>
                <el-table-column prop="positionId" label="职位ID"></el-table-column>
                <el-table-column prop="positionName" label="职位名称"></el-table-column>
                <el-table-column prop="companyId" label="所属公司ID" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="address" label="是否出现敏感词" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="createdTime" sortable label="提交时间" show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.createdTime | formatDate}}</template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { log } from "util";
import Cookies from "js-cookie";
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
        PositionName: "",
        Company: "",
        CompanyId: "",
        valueTime: "",
        Reason: ""
      },
      options: [
        {
          value: "选项1",
          label: "含虚假信息"
        },
        {
          value: "选项2",
          label: "含违法信息"
        },
        {
          value: "选项3",
          label: "非法传销"
        },
        {
          value: "选项4",
          label: "涉黄"
        },
        {
          value: "选项5",
          label: "涉嫌诈骗"
        },
        {
          value: "选项6",
          label: "其他"
        }
      ],
      checkList: [],
      dialogVisible: false,
      activeName: "first",
      currentPage: 4,
      tableData: [],
      multipleSelection: [],
      positionId: "",
      id: "",
      reviewedState: "PROCESSING"
    };
  },
  methods: {
    //未审核未通过
    Define(tab, event) {
      this.$http
        .put(
          `/review-center/reviewed/position/${tab.positionId}/position/${tab.id}/notPass`,
          { reason: this.checkList[0] }
        )
        .then(res => {
          if (res.data.code == 200) {
            this.ReviewCompany();
          }
        })
        .catch(error => {
          
        });
    },
    //未审核通过
    DefineFirst(tab, event) {
      this.$http
        .put(
          `/review-center/reviewed/position/${tab.positionId}/position/${tab.id}/pass`
        )
        .then(res => {
          if (res.data.code == 200) {
            this.ReviewCompany();
          }
        })
        .catch(error => {
          
        });
    },
    //tabs 查看
    handleClicktab(tab, event) {
      let tabValue = tab.name;
      if (tabValue === "first") {
        this.reviewedState = "PROCESSING";
        this.ReviewCompany();
      } else if (tabValue === "second") {
        this.reviewedState = "PASSED";
        this.ReviewCompany();
      } else {
        this.reviewedState = "NOT_PASSED";
        this.ReviewCompany();
      }
    },
    //职位审核
    ReviewCompany() {
      let params = {
        reviewedState: this.reviewedState,
        companyId: this.formInline.Company ? this.formInline.Company : null,
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        positionId: this.formInline.CompanyId
          ? this.formInline.CompanyId
          : null,
        positionName: this.formInline.PositionName
          ? this.formInline.PositionName
          : null
      };
      this.$http
        .get("/review-center/reviewed/position/info", {
          params: params
        })
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.page.total = res.data.data.total;
          }
        })
        .catch(error => {
          
        });
    },
    //弹框确认
    DialogAffirm() {
      this.$http
        .put(
          `/review-center/reviewed/position/${this.companyId}/position/${this.id}/rePass`,
          { reason: this.textarea }
        )
        .then(res => {
          if (res.data.code == 200) {
            this.dialogVisible = false;
            this.$http
              .get("/reviewed/company/cert", { params: { reviewedState: 3 } })
              .then(res => {
                if (res.data.code == 200) {
                  this.tableData = res.data.data.list;
                  this.page.total = res.data.data.total;
                }
              })
              .catch(error => {
                
              });
          } else {
          }
        })
        .catch(error => {
          
        });
    },
    handleClick(tab, event) {
      this.$router.push({
        path: "/JobDetail",
        query: {
          thisId: tab.id,
          thatId: tab.positionId
        }
      });
    },
    //重置
    Ressetting() {
      this.formInline.PositionName = "";
      this.formInline.Company = "";
      this.formInline.CompanyId = "";
      this.formInline.Reason = "";
      this.formInline.valueTime = "";
    },
    //查询
    Inquiry() {
      this.ReviewCompany();
    },
    keep() {
      this.dialogVisible = true;
    },
    handle(tab, event) {
      console.log(tab, event);
      this.$router.push({ path: "/Bteam/Enterdetail" });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      this.ReviewCompany();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.ReviewCompany();
    }
  },
  mounted: function() {},
  updated: function() {},
  created() {
    let token = Cookies.get("Atoken");
    if (token) {
      this.ReviewCompany();
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
<style scoped>
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
  width: 100%;
  margin: 10px 0 0 0;
  border: 1px solid #f8f8f8;
}
.el-form-item {
  padding: 10px 0 0 20px;
}
.el-select {
  width: 203px;
}
.asp-table {
  width: 98%;
  background: #ffffff;
  margin: 10px 0 0 1%;
}
.el-pagination {
  text-align: center;
  margin: 30px auto 0;
}
.el-checkbox__label {
  font-size: 10px;
}
.el-checkbox {
  margin: 10px 0 0 20px;
}
</style>
