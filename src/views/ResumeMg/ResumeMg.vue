<template>
  <div class="asp">
    <div class="asp-nav">简历库</div>
    <div class="asp-content">
      <el-dialog
        title
        :show-close="false"
        :append-to-body="true"
        :visible.sync="dialogVisiblels"
        width="25%"
      >
        <div>
          <div class="loading">
            <i style="font-size:60px;color:#20A0ff;" class="el-icon-loading"></i>
          </div>
          <div class="loading-text">下载中...</div>
        </div>
      </el-dialog>
      <el-dialog
        title="下载简历"
        :show-close="true"
        :append-to-body="true"
        :visible.sync="dialogVisibleDialog"
        width="25%"
      >
        <div>
          <div>
            <el-radio style="margin:0 0 0 38%;" v-model="radio" label="1">已选简历(0)</el-radio>
            <br />
            <el-radio style="margin:20px 0 0 38%;" v-model="radio" label="2">全部简历(100)</el-radio>
          </div>
        </div>
        <div style="text-align:center;margin:30px 0 20px 0">
          <el-button
            style="width:93px;height:33px;line-height:0px"
            @click="dialogVisibleDialog = false"
          >取 消</el-button>
          <el-button
            style="width:93px;height:33px;line-height:0px;margin:0 0 0 30px"
            type="primary"
            @click="dialogVisibleDialog = false"
          >确 定</el-button>
        </div>
      </el-dialog>
      <div class="asp-form">
        <el-form
          :inline="true"
          :model="formInline"
          label-width="120px"
          ref="formInline"
          class="demo-form-inline"
          style="background:#ffffff;"
        >
          <div style="height:20px"></div>
          <el-form-item label="企业">
            <el-input v-model="formInline.company" placeholder="企业"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="formInline.position" placeholder="职位"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.state" placeholder="状态">
              <el-option label="未下载" value="0"></el-option>
              <el-option label="已下载" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="formInline.valueTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item style="margin:0 90px 0 0;display: flex;justify-content:flex-end">
            <el-button style="margin:0 0 30px 0" @click="resetForm()">重置</el-button>
            <el-button type="primary" @click="submitForms()">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="asp-table">
          <div style="margin:30px 0 30px 30px">
            <el-button @click="uploadFile">批量下载简历</el-button>
          </div>
          <div>
            <el-table
              :data="tableData"
              tooltip-effect="dark"
              style="width:1084px;margin:0 auto"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="60"></el-table-column>
              <el-table-column prop="resumeId" label="简历ID"></el-table-column>
              <el-table-column prop="userFullName" label="姓名" show-overflow-tooltip></el-table-column>
              <el-table-column prop="companyFullName" label="企业名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="positionName" label="职位名称" show-overflow-tooltip></el-table-column>
              <el-table-column label="状态" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.downloadState | level}}</template>
              </el-table-column>
              <el-table-column label="投递时间" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.createdTime | formatDate}}</template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" @click="upload(scope.row)" size="small">下载</el-button>
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
      <el-dialog
        title="个人简历"
        :visible.sync="dialogVisible"
        style="margin-top:-2%"
        width="45%"
      >
        <div class="lines"></div>
        <div class="test-1" style="height:620px;overflow-y:scroll;overflow-x:hidden">
          <div class="resume" v-if="this.resumeDeta.base !== underfined">
            <div class="block">
              <el-avatar
                style="border-radius:50px"
                shape="square"
                :size="100"
                :src="resumeDeta.base.avatarUrl"
              ></el-avatar>
            </div>
            <div class="infor">
              <div
                style="font-size:20px;margin:0 0 0 10px;color:#373737"
              >{{resumeDeta.base.fullName}}</div>
              <div style="margin:15px 0 0 0">
                <span>{{resumeDeta.base.city}}</span>
                <span>|</span>
                <span>{{resumeDeta.base.degree}}</span>
                <span>|</span>
                <span>{{resumeDeta.base.workAge}}年工作经验</span>
                <span>|</span>
                <span>{{resumeDeta.base.age}}岁</span>
                <span>|</span>
                <span>{{resumeDeta.base.politicalStatus}}</span>
              </div>
              <div style="margin:5px 0 0 0">
                <span>
                  <i class="el-icon-mobile-phone" style="margin:0 5px 0 0"></i>
                  {{resumeDeta.base.phone}}
                </span>
                <span>|</span>
                <span>
                  <i class="el-icon-message" style="margin:0 5px 0 0"></i>
                  {{resumeDeta.base.email}}
                </span>
              </div>
            </div>
          </div>
          <div class="resume" v-else>
            <div class="title" style="margin-bottom:10px">基本信息</div>
          </div>
          <div class="jotension">
            <div class="title">求职意向</div>
            <div v-if="this.resumeDeta.target !== underfined">
              <div class="jotension-content">
                <div>职位类型：{{resumeDeta.target.positionCatalogs[0].third}}</div>
                <div>工作城市：{{resumeDeta.target.cities[0].province}}</div>
              </div>
              <div class="jotension-content">
                <div>企业行业：{{resumeDeta.target.industries[0].secondary}}</div>
                <div style>薪资范围：{{resumeDeta.target.salaryMin}}-{{resumeDeta.target.salaryMax}}k</div>
              </div>
              <div class="jotension-content">
                <div>求职状态：{{resumeDeta.target.jobSearchStatus}}</div>
                <div style>工作类型：{{resumeDeta.target.jobType}}</div>
              </div>
            </div>
          </div>
          <div class="jotension">
            <div class="title">教育经历</div>
            <div v-for="(item,index) in resumeDeta.eduXps" :key="index">
              <div class="jotension-content">
                <div>{{item.school}}</div>
                <div>{{item.beginTime|formatDate}}-{{item.endTime|formatDate}}</div>
              </div>
              <div class="jotension-content">
                <div>{{item.major}} | {{item.degree}} | {{ item.isUnified ? '统招' : '非统招'}}</div>
              </div>
            </div>
          </div>
          <div class="jotension">
            <div class="title">工作经历</div>
            <div v-for="(item,index) in resumeDeta.workXps" :key="index">
              <div class="jotension-content">
                <div>{{item.company}}</div>
                <div>{{item.beginTime|formatDate}}-{{item.endTime|formatDate}}</div>
              </div>
              <div class="jotension-content">
                <div>{{item.position}} | {{item.salaryBeforeTax}}k</div>
              </div>
              <div class="jotension-content">
                <div>工作内容：{{item.description}}</div>
              </div>
            </div>
          </div>
          <div class="jotension">
            <div class="title">项目经历</div>
            <div v-for="(item,index) in resumeDeta.projects" :key="index">
              <div class="jotension-content">
                <div>{{item.project}} | {{item.company}}</div>
                <div>{{item.beginTime|formatDate}}-{{item.endTime|formatDate}}</div>
              </div>
              <div class="jotension-content">
                <div>个人职责：{{item.duty}}</div>
              </div>
              <div class="jotension-content">
                <div>项目介绍：{{item.description}}</div>
              </div>
            </div>
          </div>
          <div class="jotension">
            <div class="title">培训经历</div>
            <div class="train-content" v-for="(item,index) in resumeDeta.trainings" :key="index">
              <div>{{item.lesson}}</div>
              <div>{{item.institution}}</div>
              <div
                style="margin:0 0 0 100px"
              >{{item.beginTime|formatDate}}-{{item.endTime|formatDate}}</div>
            </div>
          </div>
          <div class="jotension">
            <div class="title">职称等级</div>
            <div
              class="train-content"
              v-for="(item,index) in resumeDeta.qualifications"
              :key="index"
            >
              <div>{{item.qual}}</div>
            </div>
          </div>
          <div class="jotension">
            <div class="title">专业技能</div>
            <div class="train-content" v-for="(item,index) in resumeDeta.skills" :key="index">
              <div>{{item.skill}}</div>
              <div>{{item.level|level}}</div>
              <!-- <div>证书附件，点击查看大图</div> -->
              <!-- <div>{{item.beginTime|formatDate}}-{{item.endTime|formatDate}}</div> -->
            </div>
          </div>
          <div class="jotension">
            <div class="title">荣誉奖项</div>
            <div class="jotension-content" v-for="(item,index) in resumeDeta.awards" :key="index">
              <div>{{item.award}}</div>
              <!-- <div>{{item.}}</div>
              <div>证书附件，点击查看大图</div>-->
              <div>{{item.acquiredTime|formatDate}}</div>
            </div>
          </div>
          <div class="jotension">
            <div class="title">自我评价</div>
            <div class="train-content" v-if="this.resumeDeta.evaluation !== underfined">
              <div style="width:700px;">{{resumeDeta.evaluation.content}}</div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import qs from "qs";
const timeUtil = require("../../timeUtil.js");
import Cookies from "js-cookie";
export default {
  data() {
    return {
      formInline: {
        state: "",
        valueTime: [],
        position: "",
        company: ""
      },
      dialogVisiblels: false,
      page: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      radio: "",
      dialogVisibleDialog: false,
      dialogVisible: false,
      currentPage: 4,
      tableData: [],
      multipleSelection: [],
      awards: [],
      skills: [],
      evaluation: "",
      qualifications: [],
      trainings: [],
      projects: [],
      workXps: [],
      target: [],
      base: "",
      targetCity: "",
      targetPosition: "",
      targetIndustry: "",
      arrResume: [],
      arrPosition: [],
      startMin: "",
      startMax: "",
      resumeDeta: {},
      offlineStartTime: "",
      offlineEndTime: ""
    };
  },
  methods: {
    //下载简历
    handleSelectionChange(val) {
      this.arrResume = [];
      this.arrPosition = [];
      this.multipleSelection = val;
      this.multipleSelection.forEach((item, index, array) => {
        this.arrResume.push(item.resumeId);
        this.arrPosition.push(item.positionId);
      });
    },
    //下载
    upload(tab) {
      this.arrResume = [];
      this.arrResume.push(tab.resumeId);
      this.uploadFile();
    },
    //下载
    uploadFile() {
      // let params = {
      //   resumeIds: this.arrResume,
      //   positionIds: this.arrPosition
      // };
      // let resumeList = qs.stringify(
      //   { resumeIds: this.arrResume },
      //   { arrayFormat: "repeat" }
      // );
      // let positionList = qs.stringify(
      //   { positions: this.arrPosition },
      //   { arrayFormat: "repeat" }
      // );
      let resumeList = {
        resumeIds: this.arrResume,
        positionIds: this.arrPosition
      };
      this.dialogVisiblels = true;
      this.$localo
        .post(`/backend-manager/resumes/databases/batchPackageDownloadLong`,resumeList, {
          responseType: "blob"
        })
        .then(res => {
          this.dialogVisiblels = false;
          const disposition = res.headers["content-disposition"];
          let fileName = disposition.substring(
            disposition.indexOf("filename=") + 9,
            disposition.length
          );
          // iso8859-1的字符转换成中文
          fileName = decodeURI(escape(fileName));
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
          if (error.response.status === 404) {
            this.$notify.error({
              message: "页面丢失，请重新加载",
              type: "error"
            });
          } else if (error.response.status === 403) {
            this.$notify.error({
              message: "登陆超时，请重新登录",
              type: "error"
            });
          } else {
            this.$notify.error({
              message: error.response.data.message,
              type: "error"
            });
          }
        });
    },
    //重置
    resetForm() {
      this.formInline = {
        state: "",
        valueTime: [],
        position: "",
        company: ""
      };
    },
    //查询
    submitForm() {
      let params = {
        companyFullName: null,
        downloadState: null,
        endTime: null,
        pageNum: 1,
        pageSize: 10,
        positionName: null,
        sortBy: null,
        sortOrder: null,
        startTime: null,
        userFullName: null
      };
      this.$http
        .post("/backend-manager/resumes/databases/search", params)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res);
            this.tableData = res.data.data.list;
            this.page.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.$notify.error({
              message: "页面丢失，请重新加载",
              type: "error"
            });
          } else if (error.response.status === 403) {
            this.$notify.error({
              message: "登陆超时，请重新登录",
              type: "error"
            });
          } else {
            this.$notify.error({
              message: error.response.data.message,
              type: "error"
            });
          }
        });
    },
    //查询
    submitForms() {
      console.log(this.formInline.valueTime);
      if (this.formInline.valueTime.length !== 0) {
        this.offlineStartTime = this.formInline.valueTime[0].getTime();
        this.offlineEndTime = this.formInline.valueTime[1].getTime();
      } else {
        this.offlineStartTime = null;
        this.offlineEndTime = null;
      }
      let params = {
        companyFullName: this.formInline.company
          ? this.formInline.company
          : null,
        endTime: this.offlineEndTime ? this.offlineEndTime : null,
        pageNum: 1,
        pageSize: 10,
        positionName: this.formInline.position
          ? this.formInline.position
          : null,
        downloadState: this.formInline.state ? this.formInline.state : null,
        sortBy: null,
        sortOrder: null,
        startTime: this.offlineStartTime ? this.offlineStartTime : null,
        userFullName: null
      };
      this.$http
        .post("/backend-manager/resumes/databases/search", params)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res);
            this.tableData = res.data.data.list;
            this.page.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.$notify.error({
              message: "页面丢失，请重新加载",
              type: "error"
            });
          } else if (error.response.status === 403) {
            this.$notify.error({
              message: "登陆超时，请重新登录",
              type: "error"
            });
          } else {
            this.$notify.error({
              message: error.response.data.message,
              type: "error"
            });
          }
        });
    },
    toggleSelection() {
      this.$refs.multipleTable.toggleAllSelection();
    },
    handleClick(tab, event) {
      this.$http
        .get(`/backend-manager/resumes/databases/${tab.resumeId}`)
        .then(res => {
          let response = res.data.data;
          if (res.data.code == "200") {
            this.resumeDeta = response;
            this.dialogVisible = true;
            // this.awards = res.data.data.awards;
            // this.skills = res.data.data.skills;
            // this.evaluation = res.data.data.evaluation;
            // this.qualifications = res.data.data.qualifications;
            // this.trainings = res.data.data.trainings;
            // this.projects = res.data.data.projects;
            // this.workXps = res.data.data.workXps;
            // this.target = res.data.data.target;
            // this.base = res.data.data.base;
            // this.targetPosition = res.data.data.target.positionCatalogs[0];
            // this.targetCity = res.data.data.target.cities[0];
            // this.targetIndustry = res.data.data.target.industries[0];
          } else {
          }
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.$notify.error({
              message: "页面丢失，请重新加载",
              type: "error"
            });
          } else if (error.response.status === 403) {
            this.$notify.error({
              message: "登陆超时，请重新登录",
              type: "error"
            });
          } else {
            this.$notify.error({
              message: error.response.data.message,
              type: "error"
            });
          }
        });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      let params = {
        companyFullName: null,
        endTime: null,
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        positionName: null,
        processedState: null,
        sortBy: null,
        sortOrder: null,
        startTime: null,
        userFullName: null
      };
      this.$http
        .post("/backend-manager/resumes/databases/search", params)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
          } else {
          }
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.$notify.error({
              message: "页面丢失，请重新加载",
              type: "error"
            });
          } else if (error.response.status === 403) {
            this.$notify.error({
              message: "登陆超时，请重新登录",
              type: "error"
            });
          } else {
            this.$notify.error({
              message: error.response.data.message,
              type: "error"
            });
          }
        });
    },
    handleCurrentChange(val) {
      this.page.current = val;
      let params = {
        companyFullName: null,
        endTime: null,
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        positionName: null,
        processedState: null,
        sortBy: null,
        sortOrder: null,
        startTime: null,
        userFullName: null
      };
      this.$http
        .post("/backend-manager/resumes/databases/search", params)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
          } else {
          }
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.$notify.error({
              message: "页面丢失，请重新加载",
              type: "error"
            });
          } else if (error.response.status === 403) {
            this.$notify.error({
              message: "登陆超时，请重新登录",
              type: "error"
            });
          } else {
            this.$notify.error({
              message: error.response.data.message,
              type: "error"
            });
          }
        });
    }
  },
  mounted: function() {},
  updated: function() {},
  created() {
    let token = Cookies.get("Atoken");
    if (token) {
      this.submitForm();
    }else {
      this.$notify.error({
        title: "错误",
        message: "登陆超时，请重新登录"
      });
      this.$router.push({ path: "/login" });
    }
    
  },
  filters: {
    level(level) {
      var a;
      switch (level) {
        case "NOTDownloaded":
          a = "未下载";
          break;
        case "Downloaded":
          a = "已下载";
          break;
      }
      return a;
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

.line {
  width: 98%;
  border: 0.5px solid #e5e5e5;
  margin: 20px 0 0 1%;
}
.lines {
  width: 105%;
  border: 0.5px solid #e5e5e5;
  margin: -30px 0 10px -18px;
}
.title {
  font-size: 20px;
  font-weight: bold;
  margin: 25px 0 0 35px;
}
.jotension {
  font-size: 15px;
  display: flex;
  flex-direction: column;
  margin: 0 0 20px 0;
}
.jotension-content {
  margin: 20px 0 0 35px;
  display: flex;
  flex-direction: row;
}
.jotension-content div:nth-child(1) {
  font-size: 20px;
  width: 600px;
}
.jotension-content div:nth-child(2) {
  font-size: 20px;
  width: 300px;
}
.train-content {
  margin: 20px 0 0 35px;
  display: flex;
  flex-direction: row;
}
.train-content div:nth-child(1) {
  width: 150px;
  font-size: 20px;
}
.train-content div:nth-child(2) {
  margin: 0 0 0 0;
  width: 150px;
  font-size: 20px;
}
.train-content div:nth-child(3) {
  margin: 0 0 0 0;
  font-size: 20px;
}
.train-content div:nth-child(4) {
  margin: 0 0 0 100px;
  font-size: 20px;
}
.block {
  margin: 25px 0 0 25px;
}
.loading {
  text-align: center;
  margin: -20px 0 0 0;
}
.loading-text {
  font-size: 24px;
  color: #222222;
  text-align: center;
  margin: 30px 0 30px 0;
}
.resume {
  display: flex;
  flex-direction: row;
}
.infor {
  margin: 12px 0 0 20px;
}
.infor div {
  padding: 8px 0 0 0;
  font-size: 20px;
}
.infor div:nth-child(2) span {
  padding: 0 0 0 10px;
}
.infor div:nth-child(3) span {
  padding: 0 0 0 10px;
}
.el-icon-close:before {
  content: "\e6db";
  color: #333333;
  font-size: 20px;
}
.test-1::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.test-1::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #d5d5d5;
}
.test-1::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #f3f3f3;
}
.el-dialog__header {
  padding: 20px;
  padding-bottom: 10px;
  height: 30px;
}
</style>