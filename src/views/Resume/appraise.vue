<template>
  <div class="assess">
    <div class="assess-nav"></div>
    <div class="assess-aside">
      <div class="tab-operations">
        <div>
          职位筛选：
          <el-select size="medium" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span style="margin:0 0 0 20px">
            <el-checkbox v-model="checked">仅看自己招聘的岗位</el-checkbox>
          </span>
        </div>
      </div>
      <el-tabs
        v-model="activeName"
        style="width:90%;margin:15px 0 0 20px"
        type="card"
        @tab-click="handleClick"
      >
        <el-tab-pane label="未评价" name="first">
          <div v-for="(item,index) in this.noEvaluationList" :key="index">
            <div class="access-tabs">
              <div style="margin:10px 0 0 0">
                <img :src="item.avatar" alt />
              </div>
              <div>{{item.jobholder}}</div>
              <div v-if="item.positionName.length>10">{{item.positionName.substring(0,9)}}...</div>
              <div v-else>{{item.positionName}}</div>
              <div>{{item.age}}岁</div>
              <div>面试联系人：{{item.contactName}}</div>
              <div>{{item.interviewTime|formatDateTwo}}</div>
              <div style="cursor:pointer" @click="examing(item)">查看简历</div>
              <div style="cursor:pointer" @click="accessTabs(item)">评论</div>
            </div>
            <div v-if="!accessTextarea" class="access-line"></div>
            <div v-if="item.isReply === true" style="margin:15px 0 0 0">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="textarea2"
              ></el-input>
              <div class="access-button">
                <el-button>取消</el-button>
                <el-button @click="addevaluation(item)" type="primary">发送</el-button>
              </div>
            </div>
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            class="pagination"
            :page-sizes="page.pageSizeOpts"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="已评价" name="second">
          <div v-for="(item,index) in this.haveEvaluationList" :key="index">
            <div class="access-tabs">
              <div style="margin:10px 0 0 0">
                <img :src="item.avatar" alt />
              </div>
              <div>{{item.jobholder}}</div>
              <div v-if="item.positionName.length>10">{{item.positionName.substring(0,9)}}...</div>
              <div v-else>{{item.positionName}}</div>
              <div>{{item.age}}岁</div>
              <div>面试联系人：{{item.contactName}}</div>
              <div>{{item.interviewTime|formatDateTwo}}</div>
            </div>
            <div class="access-content">[面试回复] {{item.content}}</div>
            <div class="access-footer">
              <div style="display: flex;flex-direction: row;margin:20px 35px 0 0" @click="like(item)">
                <img style="width:25px;height:25px" src="../../assets/images/zan.png" />
                <span style="line-height:25px;font-size:14px">1820</span>
              </div>
              <div style="display: flex;flex-direction: row;margin:20px 0 0 0">
                <img
                  style="width:25px;height:25px"
                  @click="appraise()"
                  src="../../assets/images/book.png"
                />
                <span style="line-height:25px;font-size:14px">2</span>
              </div>
            </div>
          </div>
          <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.current"
              class="pagination"
              :page-sizes="page.pageSizeOpts"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="应聘者面试评价" name="third">
          <div v-for="(item,index) in this.candidatesList" :key="index" style="margin:20px 0 0 0">
            <div class="access-tabes">
              <div>
                <img :src="item.avatar" alt />
              </div>
              <div v-if="item.isAnonymous">{{item.appraiser}}</div>
              <div v-else>匿名用户</div>
              <div style="display: flex;flex-direction: row;">
                面试体验：
                <el-rate
                  style="margin:15px 0 0 0"
                  v-model="item.interviewExperience"
                  :colors="colors"
                ></el-rate>
              </div>
              <div>面试职位：{{item.positionName}}</div>
              <div>{{item.createdTime|formatDate}}</div>
            </div>
            <div class="station-appraise-select">
              <el-radio-group
                v-model="radio1"
                size="medium"
                v-for="(list,index) in item.evaluationInterviewLabelBodes"
                :key="index"
              >
                <el-radio-button style="padding:0 0 0 15px">{{list.interviewLabel|level}}</el-radio-button>
              </el-radio-group>
            </div>
            <div class="access-content">[面试过程] {{item.content}}</div>
            <div class="access-footer">
              <div style="display: flex;flex-direction: row;margin:20px 35px 0 0" @click="like(item)">
                <img style="width:25px;height:25px" src="../../assets/images/zan.png" />
                <span style="line-height:25px;font-size:14px">{{item.likeNum}}</span>
              </div>
              <div
                style="display: flex;flex-direction: row;margin:20px 0 0 0"
                @click="accessTabes(item)"
              >
                <img
                  style="width:25px;height:25px"
                  @click="appraise()"
                  src="../../assets/images/book.png"
                />
                <span style="line-height:25px;font-size:14px">{{item.replyNum}}</span>
              </div>
            </div>
            <div v-if="item.isReply === true" style="margin:15px 0 0 0">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="textarea3"
              ></el-input>
              <div class="access-button">
                <el-button @click="addevaluation(item)" type="primary">发表</el-button>
              </div>
            </div>
            <!-- <div class="access-back" v-else>
              <span>企业回复：</span>
              <span>问个问题问个问题问个问题问个问题问个问题问个问题问个问题问个问题问个问题问个问题问个问题问个问题问</span>
              <div>08月23日 14:21</div>
            </div>-->
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            class="pagination"
            :page-sizes="page.pageSizeOpts"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      noEvaluationList: [],
      candidatesList: [],
      haveEvaluationList: [],
      checked: "",
      activeName: "first",
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      page: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      options: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "传媒/艺术/设计"
        },
        {
          value: "2",
          label: "生产/制造"
        },
        {
          value: "3",
          label: "能源/农业/科研"
        },
        {
          value: "4",
          label: "IT/互联网/通信"
        },
        {
          value: "5",
          label: "项目/质量/管理"
        },
        {
          value: "6",
          label: "其他"
        }
      ],
      textarea2: "",
      textarea3: "",
      value: "",
      accessTextarea: false,
      tabname: "",
      params:{}
    };
  },
  methods: {
    //点赞
    like(list) {
      this.$http
        .post(`/business-core/evaluation/like/${list.id}`)
        .then(res => {
        })
        .catch(error => {});
    },
    //新增评论
    addevaluation(item) {
      if (this.tabname === "first") {
        this.params = {
          content: this.textarea2,
          interviewExperience: null,
          isAnonymous: false,
          parentId: item.evaluationId,
          positionId: null
        };
      } else {
        this.params = {
          content: this.textarea3,
          interviewExperience: null,
          isAnonymous: false,
          parentId: item.id,
          positionId: null
        };
      }
      this.$http
        .post(`/business-core/evaluation`, this.params)
        .then(res => {
          if (res.data.code == "200") {
            if (this.tabname === "first") {
              this.noEvaluations();
              item.isReply = !item.isReply;
            } else {
              this.candidates();
              item.isReply = !item.isReply;
              
            }
            this.noEvaluations();
          } else {
          }
        })
        .catch(error => {});
    },
    //查看简历
    examing(tab) {
      this.$router.push({
        path: "/resume/talent/Detail",
        query: {
          resumeId: tab.resumeId
        }
      });
    },
    //未评价列表
    noEvaluations() {
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        positionIds: [],
        sortBy: null,
        sortOrder: null,
        codes: null
      };
      this.$http
        .post(`/business-core/evaluation/noEvaluations`, params)
        .then(res => {
          if (res.data.code == "200") {
            this.noEvaluationList = res.data.data.list;
            this.page.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {});
    },
    //已评价列表
    haveEvaluations() {
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        positionIds: [],
        sortBy: null,
        sortOrder: null,
        codes: null
      };
      this.$http
        .post(`/business-core/evaluation/haveEvaluations`, params)
        .then(res => {
          if (res.data.code == "200") {
            this.haveEvaluationList = res.data.data.list;
            this.page.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {});
    },
    //应聘者评价列表
    candidates() {
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        positionIds: [],
        sortBy: null,
        sortOrder: null,
        codes: null
      };
      this.$http
        .post(`/business-core/evaluation/candidates`, params)
        .then(res => {
          if (res.data.code == "200") {
            this.candidatesList = res.data.data.evaluations.list;
            this.page.total = res.data.data.evaluations.total;
          } else {
          }
        })
        .catch(error => {});
    },
    handleClick(tab, event) {
      this.tabname = tab.name;
      if (tab.name === "first") {
        this.noEvaluations();
      } else if (tab.name === "second") {
        this.haveEvaluations();
      } else {
        this.candidates();
      }
    },
    //评论切换
    accessTabs(item) {
      item.isReply = !item.isReply;
    },
    //评论切换
    accessTabes(item) {
      item.isReply = !item.isReply;
    },
    //回复
    appraise() {
      this.accessTextarea = !this.accessTextarea;
    },
    //分页
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      if ((this.tabname = "first")) {
        this.noEvaluations();
      } else if ((this.tabname = "second")) {
        this.haveEvaluations();
      } else {
        this.candidates();
      }
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.noEvaluations();
    }
  },
  created() {
    this.noEvaluations();
  },
  filters: {
    level(level) {
      var a;
      switch (level) {
        case "THE_BENEFITS_PACKAGE_IS_FANTASTIC":
          a = "福利待遇特别棒";
          break;
        case "THE_INTERVIEWER_IS_DANIEL":
          a = "面试官是大牛";
          break;
        case "THE_ENVIRONMENT_IS_VERY_GOOD":
          a = "环境非常nice";
          break;
        case "THE_INTERVIEWER_IS_VERY_KIND":
          a = "面试官很和善";
          break;
        case "INTERVIEW_EFFICIENCY_IS_VERY_HIGH":
          a = "面试效率很高";
          break;
        case "THE_SALARY_DOES_NOT_MATCH_THE_LABEL":
          a = "薪资跟标注不符";
          break;
        case "THE_INTERVIEWER_IS_TOO_DEMANDING":
          a = "面试官太苛刻";
          break;
        case "THE_ENVIRONMENT_IS_SO_SO":
          a = "环境一般般";
          break;
        case "THE_INTERVIEWER_IS_VERY_SERIOUS":
          a = "面试官很严肃";
          break;
        case "WHEN_THE_SEAS_RUN_DRY_AND_THE_ROCKS_CRUMBLE":
          a = "等到海枯石烂";
          break;
      }
      return a;
    }
  }
};
</script>


<style lang="stylus">
.assess {
  .assess-nav {
    width: 963px;
    height: 50px;
    background: #FAFAFA;
    margin: 20px 0 0 0;
  }

  .assess-aside {
    width: 963px;
    height: auto;
    background: #FFFFFF;
    border: 1px solid rgba(246, 246, 246, 1);
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);

    .access-tabs {
      display: flex;
      flex-direction: row;
      line-height: 70px;

      div:nth-child(2) {
        font-family: PingFangSC-Medium;
        color: #373737;
        font-size: 17px;
        width: 55px;
        margin: 0 0 0 15px;
      }

      div:nth-child(3) {
        font-family: PingFangSC-Medium;
        color: #373737;
        font-size: 17px;
        width: 160px;
        margin: 0 0 0 15px;
      }

      div:nth-child(4) {
        font-family: PingFangSC-Regular;
        color: #333333;
        font-size: 16px;
        width: 40px;
        margin: 0 0 0 20px;
      }

      div:nth-child(5) {
        font-family: PingFangSC-Regular;
        color: #373737;
        font-size: 16px;
        width: 180px;
        margin: 0 0 0 15px;
      }

      div:nth-child(6) {
        font-family: PingFangSC-Medium;
        color: #373737;
        font-size: 14px;
        width: 160px;
        margin: 0 0 0 20px;
      }

      div:nth-child(7) {
        font-family: PingFangSC-Regular;
        color: #327CF3;
        font-size: 14px;
        width: 60px;
        margin: 0 0 0 15px;
      }

      div:nth-child(8) {
        font-family: PingFangSC-Regular;
        color: #327CF3;
        font-size: 14px;
        width: 30px;
        margin: 0 0 0 15px;
      }

      img {
        width: 50px;
        height: 50px;
      }
    }

    .access-tabes {
      display: flex;
      flex-direction: row;
      line-height: 50px;

      div:nth-child(2) {
        font-family: PingFangSC-Medium;
        color: #373737;
        font-size: 17px;
        margin: 0 0 0 17px;
      }

      div:nth-child(3) {
        font-family: PingFangSC-Medium;
        color: #373737;
        font-size: 17px;
        margin: 0 0 0 40px;
      }

      div:nth-child(4) {
        font-family: PingFangSC-Regular;
        color: #333333;
        font-size: 16px;
        margin: 0 0 0 40px;
      }

      div:nth-child(5) {
        font-family: PingFangSC-Regular;
        color: #888888;
        font-size: 16px;
        margin: 0 0 0 40px;
      }

      img {
        width: 50px;
        height: 50px;
      }
    }

    .access-back {
      width: 926px;
      height: 83px;
      background: #F9F9F9;
      padding: 16px 0 0 0;

      span:nth-child(1) {
        margin: 0 0 0 16px;
        font-family: PingFangSC-Regular;
        color: #327CF3;
        font-size: 16px;
      }

      span:nth-child(2) {
        font-family: PingFangSC-Regular;
        color: #424242;
        font-size: 16px;
      }

      div {
        font-family: PingFangSC-Regular;
        color: #373737 100%;
        font-size: 16px;
        margin: 0 0 0 16px;
      }
    }

    .station-appraise-select {
      display: flex;
      flex-direction: row;
      margin: -10px 30px 30px 0;

      .el-radio-button--medium .el-radio-button__inner {
        padding: 2px 10px;
        font-size: 14px;
        border-radius: 20px;
        height: 20px;
      }

      .el-radio-button__inner {
        line-height: 1;
        white-space: nowrap;
        vertical-align: middle;
        background: #fff;
        border: 1px solid #dcdfe6;
        font-weight: 500;
        border-left: 1;
        margin: 0 0 0 20px;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        margin: 0;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 20px;
        heigth: 20px;
      }

      .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        color: #272822;
        background-color: #fff;
        border-color: #dee1e6;
        box-shadow: -1px 0 0 0 #409eff;
      }
    }

    .access-content {
      font-family: PingFangSC-Regular;
      color: #686868;
      font-size: 16px;
      margin: -15px 0 20px 0;
    }

    .access-footer {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin: -15px 0 20px 0;
    }

    .access-line {
      width: 100%;
      border: 0.5px solid #f1f3f4;
      margin: -20px 0 0 0;
    }

    .access-button {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin: 14px 0 0 0;

      .el-button {
        font-size: 14px;
        border-radius: 4px;
        width: 59px;
        height: 26px;
        padding: 0px 0px;
      }
    }

    .tab-operations {
      position: absolute;
      margin: 10px 0 0 450px;
      z-index: 200;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: #333333;

      .el-input__inner {
        width: 190px;
      }
    }
  }
}
</style>

