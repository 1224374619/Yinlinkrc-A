<template>
  <div class="assess">
    <div class="assess-nav"></div>
    <div class="assess-aside">
      <div class="tab-operations">
        <div>
          岗位筛选：
          <el-select size="medium" v-model="value" placeholder="请选择" @change="changevalue">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span style="margin:0 0 0 20px">
            <el-checkbox @change="changeisMine" v-model="isMine">仅看自己招聘的岗位</el-checkbox>
          </span>
        </div>
      </div>
      <el-tabs
        v-model="activeName"
        style="width:90%;margin:15px 0 0 20px"
        type="card"
        @tab-click="handleClick"
      >
        <el-tab-pane label="HR未评价" name="first">
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
              <div style="cursor:pointer" @click="accessTabs(item)">评价</div>
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
                <el-button @click="addappraise(item)" type="primary">发送</el-button>
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
        <el-tab-pane label="HR已评价" name="second">
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
            <div class="access-content">[面试评价] {{item.content}}</div>
            <!-- <div class="access-footer">
              <div
                style="display: flex;flex-direction: row;margin:20px 35px 0 0"
                @click="like(item)"
              >
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
            </div>-->
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
        <el-tab-pane label="应聘者面试评价回复" name="third">
          <div v-for="(item,index) in this.candidatesList" :key="index" style="margin:20px 0 0 0">
            <div class="access-tabes">
              <div>
                <img :src="item.avatar" alt />
              </div>
              <div>{{item.appraiser}}</div>
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
              <div
                style="display: flex;flex-direction: row;margin:20px 35px 0 0"
                @click="like(item)"
              >
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
            <div v-else>
              <div v-if="item.sublist !== null" class="access-back">
                <span>企业回复：</span>
                <span>{{item.sublist[0].content}}</span>
                <div>{{item.sublist[0].createdTime|formatDateOne}}</div>
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
      activeName: "first",
      radio1: "",
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
      params: {},
      sublistcontent: "",
      sublistcreatedTime: "",
      isMine: false,
      selVallist: null
    };
  },
  methods: {
    changeisMine() {
      if (this.tabname === "first") {
        this.noEvaluations();
      } else if (this.tabname === "second") {
        this.haveEvaluations();
      } else {
        this.candidates();
      }
    },
    changevalue(selVal) {
      switch (selVal) {
        case "0":
          this.selVallist = null;
          break;
        case "1":
          this.selVallist = [
            90101,
            90102,
            90103,
            90104,
            90105,
            90106,
            90107,
            90108,
            90109,
            90110,
            90111,
            90112,
            90113,
            90114,
            90115,
            90116,
            90117,
            90118,
            90119,
            90120,
            90121,
            90122,
            90123,
            90124,
            90201,
            90202,
            90203,
            90204,
            90205,
            90206,
            90207,
            90208,
            90209,
            90210,
            90211,
            90212,
            90213,
            90214,
            90215,
            90216,
            90217,
            90218,
            90219,
            90220,
            90221,
            90222
          ];
          break;
        case "2":
          this.selVallist = [
            80101,
            80102,
            80103,
            80104,
            80105,
            80106,
            80107,
            80108,
            80109,
            80110,
            80111,
            80112,
            80113,
            80114,
            80115,
            80116,
            80117,
            80201,
            80202,
            80203,
            80204,
            80205,
            80206,
            80207,
            80208,
            80209,
            80210,
            80211,
            80212,
            80213,
            80214,
            80215,
            80216,
            80217,
            80218,
            80219,
            80220,
            80221,
            80222,
            80223,
            80224,
            80225,
            80226,
            80227,
            80228,
            80229,
            80230,
            80231,
            80232,
            80233,
            80301,
            80302,
            80303,
            80304,
            80305,
            80306,
            80307,
            80308,
            80309,
            80310,
            80401,
            80402,
            80403,
            80404,
            80405,
            80406,
            80407,
            80408,
            80409,
            80410,
            80501,
            80502,
            80503,
            80504,
            80505,
            80506,
            80507,
            80508,
            80509,
            80510,
            80511,
            80512,
            80513,
            80514,
            80515,
            80516,
            80517,
            80518,
            80519,
            80520,
            80521,
            80522,
            80523,
            80524,
            80525,
            80526,
            80601,
            80602,
            80603,
            80604,
            80605,
            80606,
            80607,
            80608,
            80609,
            80610,
            80611,
            80612,
            80701,
            80702,
            80703,
            80704,
            80705,
            80706,
            80707,
            80708,
            80709,
            80710,
            80711,
            80801,
            80802,
            80803,
            80804,
            80805,
            80806,
            80807,
            80808,
            80809,
            80810,
            80811,
            80812,
            80813,
            80814,
            80815,
            80816,
            80817,
            80818,
            80819,
            80820,
            80821,
            80822,
            80823,
            80824,
            80901,
            80902,
            80903,
            80904,
            80905,
            80906,
            80907,
            80908,
            80909,
            80910,
            80911
          ];
          break;
        case "3":
          this.selVallist = [
            120101,
            120102,
            120103,
            120104,
            120105,
            120106,
            120107,
            120108,
            120201,
            120202,
            120203,
            120204,
            120205,
            120206,
            120207,
            120208,
            120209,
            120301,
            120302,
            120303,
            120304,
            120305,
            120306,
            120307,
            120308,
            120401,
            120402,
            120403,
            120404
          ];
          break;
        case "4":
          this.selVallist = [
            40101,
            40102,
            40103,
            40104,
            40105,
            40106,
            40107,
            40108,
            40109,
            40110,
            40111,
            40112,
            40113,
            40114,
            40115,
            40116,
            40117,
            40118,
            40119,
            40120,
            40121,
            40122,
            40201,
            40202,
            40203,
            40204,
            40301,
            40302,
            40303,
            40304,
            40305,
            40306,
            40307,
            40308,
            40309,
            40401,
            40402,
            40403,
            40404,
            40405,
            40406,
            40407,
            40408,
            40501,
            40502,
            40503,
            40504,
            40505,
            40506,
            40507,
            40508,
            40509,
            40510,
            40511,
            40512,
            40513,
            40514,
            40515,
            40516,
            40601,
            40602,
            40603,
            40604,
            40605,
            40606,
            40607,
            40701,
            40702,
            40703,
            40704,
            40705,
            40706,
            40707,
            40708,
            40709,
            40710,
            40711,
            40712
          ];
          break;
        case "5":
          this.selVallist = [
            30101,
            30102,
            30103,
            30104,
            30105,
            30106,
            30107,
            30108,
            30109,
            30110,
            30111,
            30112,
            30113,
            30114,
            30115,
            30116,
            30117,
            30118,
            30119,
            30120,
            30121,
            30122,
            30123,
            30201,
            30202,
            30203,
            30204,
            30205,
            30206,
            30207,
            30208,
            30209,
            30210,
            30211,
            30212,
            30301,
            30302,
            30303,
            30304,
            30305,
            30306,
            30307,
            30308,
            30309,
            30310,
            30311,
            30312,
            30313,
            30314
          ];
          break;
        default:
          this.selVallist = [
            10101,
            10102,
            10103,
            10104,
            10105,
            10106,
            10107,
            10108,
            10109,
            10110,
            10111,
            10112,
            10113,
            10201,
            10202,
            10203,
            10204,
            10205,
            10206,
            10207,
            10208,
            10209,
            10210,
            10211,
            10212,
            10213,
            10214,
            10215,
            10301,
            10302,
            10303,
            10304,
            10305,
            10306,
            10307,
            10308,
            10309,
            10401,
            10402,
            10403,
            10404,
            10405,
            10406,
            10407,
            10408,
            10409,
            10410,
            10501,
            10502,
            10503,
            10504,
            10505,
            10506,
            10507,
            10508,
            10509,
            10510,
            10511,
            10512,
            10513,
            10514,
            10515,
            10516,
            10517,
            10518,
            10519,
            10520,
            10521,
            10522,
            10523,
            10524,
            10525,
            10526,
            10527,
            10528,
            10601,
            10602,
            10603,
            10604,
            10605,
            10606,
            10607,
            10608,
            10701,
            10702,
            10703,
            10704,
            10705,
            10706,
            10707,
            10708,
            10709,
            10710,
            10711,
            10712,
            10713,
            10714,
            10715,
            10716,
            20101,
            20102,
            20103,
            20104,
            20105,
            20106,
            20107,
            20108,
            20109,
            20110,
            20111,
            20112,
            20113,
            20114,
            20115,
            20116,
            20117,
            20118,
            20119,
            20120,
            20121,
            20122,
            20201,
            20202,
            20203,
            20204,
            20205,
            20206,
            20207,
            20208,
            20209,
            20210,
            20211,
            20212,
            20213,
            20214,
            20215,
            20216,
            20217,
            20301,
            20302,
            20303,
            20304,
            20305,
            20306,
            20307,
            20308,
            20309,
            50101,
            50102,
            50103,
            50104,
            50105,
            50106,
            50107,
            50108,
            50109,
            50110,
            50111,
            50112,
            50201,
            50202,
            50203,
            50204,
            50205,
            50206,
            50207,
            50208,
            50209,
            50210,
            50211,
            50212,
            50213,
            50214,
            50215,
            50216,
            50217,
            50218,
            50219,
            50220,
            50221,
            50222,
            50223,
            50224,
            50225,
            50301,
            50302,
            50303,
            50304,
            50305,
            50306,
            50307,
            60101,
            60102,
            60103,
            60104,
            60105,
            60106,
            60107,
            60108,
            60109,
            60110,
            60111,
            60112,
            60113,
            60114,
            60115,
            60116,
            60117,
            60118,
            60119,
            60120,
            60121,
            60201,
            60202,
            60203,
            60204,
            60205,
            60206,
            60207,
            60208,
            60209,
            60210,
            60211,
            60212,
            60213,
            60214,
            60215,
            60216,
            60217,
            60218,
            60301,
            60302,
            60303,
            60304,
            60305,
            60306,
            60307,
            60308,
            60309,
            60310,
            60311,
            60312,
            60313,
            60314,
            60401,
            60402,
            60403,
            60404,
            60405,
            60406,
            70101,
            70102,
            70103,
            70104,
            70105,
            70106,
            70107,
            70108,
            70109,
            70110,
            70111,
            70201,
            70202,
            70203,
            70204,
            70205,
            70206,
            70207,
            70208,
            70209,
            70210,
            70211,
            70301,
            70302,
            70303,
            70304,
            70305,
            70306,
            70307,
            70308,
            70309,
            70310,
            70311,
            70312,
            70313,
            70314,
            70315,
            70316,
            70317,
            100101,
            100102,
            100103,
            100104,
            100105,
            100106,
            100107,
            100108,
            100109,
            100110,
            100201,
            100202,
            100203,
            100204,
            100205,
            100206,
            100207,
            100208,
            100209,
            100210,
            100211,
            100212,
            100213,
            100214,
            100215,
            100216,
            100217,
            100218,
            100219,
            100220,
            100221,
            100222,
            100223,
            100301,
            100302,
            100303,
            100304,
            100305,
            100306,
            100307,
            100308,
            100309,
            100401,
            100402,
            100403,
            100404,
            100405,
            100406,
            100407,
            100408,
            100409,
            100410,
            100411,
            110101,
            110102,
            110103,
            110104,
            110105,
            110106,
            110107,
            110108,
            110109,
            110110,
            110111,
            110112,
            110113,
            110114,
            110115,
            110116,
            110117,
            110118,
            110119,
            110120,
            110121,
            110201,
            110202,
            110203,
            110204,
            110205,
            110206,
            110207,
            110301,
            110302,
            110303,
            110304,
            110305,
            110306,
            110307,
            110308,
            110401,
            110402,
            110403,
            110404,
            110405,
            110406,
            110407,
            110408,
            110501,
            110502,
            110503,
            110504,
            110505,
            110506,
            110507,
            110508,
            110509,
            110510,
            110511,
            110512,
            110513,
            110514,
            110515,
            110516,
            110517,
            110518,
            110519,
            110520,
            110601,
            110602,
            110603,
            110604,
            110605,
            110606,
            110607,
            110608,
            110609,
            130101,
            130102,
            130103,
            130104,
            130201,
            130202,
            130203,
            130301,
            130302,
            130303,
            130401
          ];
          break;
      }
      if (this.tabname === "first") {
        this.noEvaluations();
      } else if (this.tabname === "second") {
        this.haveEvaluations();
      } else {
        this.candidates();
      }
    },
    //点赞
    like(list) {
      this.$http
        .post(`/business-core/evaluation/like/${list.id}`)
        .then(res => {
          this.candidates();
        })
        .catch(error => {});
    },
    //未评价新增
    addappraise(item) {
      let params = {
        content: this.textarea2,
        interviewExperience: null,
        isAnonymous: false,
        parentId: null,
        toUserId: item.userId,
        toUserName: item.contactName,
        positionId: null,
        toUserType: item.userType
      };
      this.$http
        .put(
          `/business-core/interview/evaluation/${item.interviewId}`,
          params
        )
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
    //新增评论
    addevaluation(item) {
      if (this.tabname === "first") {
        this.params = {
          content: this.textarea2,
          interviewExperience: null,
          isAnonymous: false,
          parentId: item.evaluationId,
          toUserId: item.userId,
          toUserName: item.appraiser,
          positionId: null,
          toUserType: item.userType
        };
      } else {
        this.params = {
          content: this.textarea3,
          interviewExperience: null,
          isAnonymous: false,
          parentId: item.id,
          toUserId: item.appraiserId,
          positionId: null,
          toUserType: item.isEnterpriseReply === false ? 0 : 1
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
        codes: this.selVallist,
        isMine: this.isMine
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
        codes: this.selVallist,
        isMine: this.isMine
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
        sortBy: "created_time",
        sortOrder: "asc",
        codes: this.selVallist,
        isMine: this.isMine
      };
      this.$http
        .post(`/business-core/evaluation/candidates`, params)
        .then(res => {
          if (res.data.code == "200") {
            this.candidatesList = res.data.data.evaluations.list;
            this.page.total = res.data.data.evaluations.total;
            this.candidatesList.forEach((item, index, array) => {
              let params = {
                pageNum: 1,
                pageSize: 10,
                sortBy: null,
                sortOrder: null
              };
              this.$http
                .post(`/business-core/evaluation/sublist/${item.id}`, params)
                .then(res => {
                  if (res.data.code == "200") {
                    this.sublistcontent = res.data.data.list[0].content;
                    this.sublistcreatedTime = res.data.data.list[0].createdTime;
                  } else {
                  }
                })
                .catch(error => {});
            });
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

