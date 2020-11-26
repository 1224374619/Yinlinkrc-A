<template>
  <div class="enterdetail">
    <div class="asp-nav">企业详情</div>
    <el-radio-group v-model="tabPosition" @change="clicktab" style="margin:30px 0 0 20px">
      <el-radio-button label="top">企业详情</el-radio-button>
      <el-radio-button label="right">企业审核资料</el-radio-button>
    </el-radio-group>
    <el-dialog
      title="职位基本信息编辑"
      :show-close="false"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="32%"
    >
      <div>
        <el-form ref="form" :model="form" label-width="90px" class="formDatt">
          <el-form-item label="公司简称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="企业规模">
            <el-select v-model="form.scale" placeholder="请选择企业规模">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="企业性质">
            <el-select v-model="form.nature" placeholder="请选择企业性质">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="所属行业">
            <el-cascader
              style="width:203px;"
              :options="industryList"
              :props="propsOne"
              v-model="form.industry"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="工作地点">
            <el-cascader
              style="width:203px;"
              :options="cityList"
              :props="propsOne"
              v-model="form.city"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input style="width:360px" type="textarea" v-model="form.addressDetail"></el-input>
          </el-form-item>
          <el-form-item label="企业LOGO">
            <el-upload
              class="avatar-upload"
              :action="uploadUrl"
              :data="uploadData"
              :headers="myHeaders"
              style="margin-left:0px"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="this.form.imageUrl" :src="this.form.imageUrl" class="avatar" />
              <i
                v-else
                style="border:1px solid #dcdfe6;margin:0 200px 0 0"
                class="el-icon-plus avatar-uploader-icon"
              ></i>
              <div class="el-upload__tip">支持图片格式：png、jpg、jpeg，最大不超过 3M。</div>
              <div class="el-upload__tip">为了尽快通过审核，请上传真实合法且清晰的执照图片。</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="企业简介">
            <el-input style="width:360px" type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width:93px;height:33px;line-height:0px;margin:0 20px 0 40px"
              @click="dialogVisible = false"
            >取消</el-button>
            <el-button
              style="width:93px;height:33px;line-height:0px;margin:0 0 0 40px"
              type="primary"
              @click="submitForm('ruleForm')"
            >确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog
      title="企业资质审核"
      :show-close="false"
      :append-to-body="true"
      :visible.sync="dialogVisibles"
      width="32%"
    >
      <div>
        <el-form
          ref="forminline"
          :rules="rules"
          :model="forminline"
          label-width="120px"
          class="formDatt"
        >
          <el-form-item label="企业注册地" prop="registeredAddress">
            <el-input v-model="forminline.registeredAddress" placeholder="请输入企业注册地（省份、城市）"></el-input>
          </el-form-item>
          <el-form-item label="社会信用代码" prop="uniformSocialCreditCode">
            <el-input
              maxlength="18"
              v-model="forminline.uniformSocialCreditCode"
              placeholder="请输入与企业证件材料一致的代码"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业类别" prop="enterpriseForm">
            <el-cascader
              style="width:240px"
              :props="propsOne"
              :options="list"
              v-model="forminline.enterpriseForm"
              placeholder="请选择所属行业"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="上传证件照片" prop="file">
            <el-upload
              class="upload"
              :action="uploadUrl"
              :file-list="tempFile"
              :data="uploadDatas"
              :headers="myHeaders"
              :on-success="dealWithUploadLicense"
              :with-credentials="true"
              list-type="picture"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__tip" slot="tip">支持图片格式：png、jpg、jpeg、gif，最大不超过 3M。</div>
              <div
                class="el-upload__tip"
                slot="tip"
              >提示：确保企业名称与提交审核公司一致；如为复印件、黑白扫描件，需加盖企业公章；不可使用屏幕截图或翻拍照片提交审核；上传图片不可有与银领人才网无关的标注或水印；不可使用电子版营业执照提交审核；所上传证照照片，信息需清晰完整；</div>
              <div class="el-upload__tip warning" slot="tip">企业营业执照仅用审核，不会向第三方透露，请放心上传！</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width:93px;height:33px;line-height:0px;margin:0 20px 0 40px"
              @click="dialogVisibles = false"
            >取消</el-button>
            <el-button
              style="width:93px;height:33px;line-height:0px;margin:0 0 0 40px"
              type="primary"
              @click="submitForms('forminline')"
            >确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- <div class="enterdetail-nav">
      <div class="nav-image">
        <div>
          <el-image style="margin: 0 0 30px 30px;" :src="url"></el-image>
        </div>
        <div class="enter">
          <div style="display: flex;flex-direction: row;">
            <div>{{companyDetaillist.fullName}}</div>
            <div>企业规模：{{companyDetaillist.size}}</div>
            <div>入驻时间：{{companyDetaillist.createdTime | formatDate}}</div>
            <div>今日投递：{{this.resumeNum}}</div>
          </div>
          <div style="display: flex;flex-direction: row;margin:20px 0 0 0">
            <div>企业ID：{{companyDetaillist.id}}</div>
            <div>公司类别：{{$CodeToTag.CodeToTag([parseInt(companyDetaillist.industryCode/100)*100,companyDetaillist.industryCode],industryList)[0]}}</div>
          </div>
        </div>
      </div>
    </div>-->
    <div v-if="verify">
      <div class="enterdetail-article">
        <div class="enterdetail-echarts">
          <div style="font-size:18px;font-weight:bold;margin:0 0 0 30px;padding:30px 0 0 0">数据统计</div>
          <div class="echart-nav">
            <el-tabs v-model="activeName" style="margin:20px 0 0 30px">
              <el-tab-pane :lazy="true" label="发布职位数量" name="first">
                <div class="tab-first">
                  <div>
                    <el-link class="chose" :underline="false">今年</el-link>
                  </div>
                  <div>
                    <el-link class="chose" :underline="false">本月</el-link>
                  </div>
                  <div>
                    <el-link class="chose" :underline="false">本周</el-link>
                  </div>
                  <div>
                    <el-link class="chose" :underline="false">今天</el-link>
                  </div>
                  <div>
                    <el-date-picker
                      v-model="valueTime"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </div>
                </div>
                <div id="chartLine" style="width:100%; height:490px"></div>
              </el-tab-pane>
              <el-tab-pane label="接受简历数量" name="second">接受简历数量</el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="echarts-second">
          <el-badge
            class="item"
            style="font-size:18px;font-weight:bold;margin:20px 0 0 20px;color:#2A2A2A "
          >在招职位</el-badge>
          <span
            style="font-size:14px;margin:5px 0 0 0;float:right;margin:20px 20px 0 0;color:#222222"
          >更多</span>
          <div style="margin:30px 0 0 0;">
            <span style="margin:0 0 0 20px;color:#373737;font-size:16px">产品经理</span>
            <span
              style="float:right;margin-right:20px;color:#373737;font-size:14px"
            >2019-09-01 19：30</span>
          </div>
          <div style="margin:20px 0 0 0">
            <span style="margin:0 0 0 20px;color:#373737;font-size:16px">产品经理</span>
            <span
              style="float:right;margin-right:20px;color:#373737;font-size:14px"
            >2019-09-01 19：30</span>
          </div>
          <div style="margin:20px 0 0 0">
            <span style="margin:0 0 0 20px;color:#373737;font-size:16px">产品经理</span>
            <span
              style="float:right;margin-right:20px;color:#373737;font-size:14px"
            >2019-09-01 19：30</span>
          </div>
          <div style="margin:20px 0 0 0">
            <span style="margin:0 0 0 20px;color:#373737;font-size:16px">产品经理</span>
            <span
              style="float:right;margin-right:20px;color:#373737;font-size:14px"
            >2019-09-01 19：30</span>
          </div>
          <div style="margin:20px 0 0 0">
            <span style="margin:0 0 0 20px;color:#373737;font-size:16px">产品经理</span>
            <span
              style="float:right;margin-right:20px;color:#373737;font-size:14px"
            >2019-09-01 19：30</span>
          </div>
        </div>
      </div>
      <div class="enterdetail-article">
        <div class="enterdetail-echarts">
          <div style="display: flex;flex-direction: row;">
            <div style="font-size:18px;font-weight:bold;margin:0 0 0 30px;color:#373737">基本信息</div>
            <div
              style="font-size:16px;margin:0 0 0 30px;color:#373737;line-height:26px"
              @click="edit()"
            >
              编辑
              <i style="margin:0 0 0 5px" class="el-icon-edit"></i>
            </div>
          </div>
          <div class="echart-nav">
            <div class="infor">
              <span>企业简称：{{companyDetaillist.shortName}}</span>
              <span>企业规模：{{companyDetaillist.size}}</span>
              <span>所属行业：{{companyDetaillist.industrySecondary}}</span>
              <span>企业地点：{{companyDetaillist.address.detail}}</span>
              <span>
                企业logo：
                <img style="width:50px;height:50px" :src="companyDetaillist.logo.accessUrl" />
              </span>
              <span style="margin-bottom:50px">企业简介：{{companyDetaillist.description}}</span>
            </div>
          </div>
        </div>
        <div class="echarts-second">
          <el-badge
            class="item"
            style="font-size:18px;font-weight:bold;margin:20px 0 0 20px;color:#2A2A2A "
          >公司管理人员</el-badge>
          <span
            style="font-size:14px;margin:5px 0 0 0;float:right;margin:20px 20px 0 0;color:#222222"
          >更多</span>
          <div style="margin:30px 0 0 0;">
            <span style="margin:0 0 0 20px;color:#373737;font-size:16px">产品经理</span>
            <span
              style="float:right;margin-right:20px;color:#373737;font-size:14px"
            >2019-09-01 19：30</span>
          </div>
          <div style="margin:20px 0 0 0">
            <span style="margin:0 0 0 20px;color:#373737;font-size:16px">产品经理</span>
            <span
              style="float:right;margin-right:20px;color:#373737;font-size:14px"
            >2019-09-01 19：30</span>
          </div>
          <div style="margin:20px 0 0 0">
            <span style="margin:0 0 0 20px;color:#373737;font-size:16px">产品经理</span>
            <span
              style="float:right;margin-right:20px;color:#373737;font-size:14px"
            >2019-09-01 19：30</span>
          </div>
          <div style="margin:20px 0 0 0">
            <span style="margin:0 0 0 20px;color:#373737;font-size:16px">产品经理</span>
            <span
              style="float:right;margin-right:20px;color:#373737;font-size:14px"
            >2019-09-01 19：30</span>
          </div>
          <div style="margin:20px 0 0 0">
            <span style="margin:0 0 0 20px;color:#373737;font-size:16px">产品经理</span>
            <span
              style="float:right;margin-right:20px;color:#373737;font-size:14px"
            >2019-09-01 19：30</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="enterdetail-articles">
        <div class="articles-nav">
          <!-- <div>企业名称:</div> -->
          <div>企业注册地:</div>
          <div>统一社会信用代码:</div>
          <div>企业类别:</div>
          <div>上传证件原件照片:</div>
        </div>
        <div class="articles-foot">
          <div>{{forminline.registeredAddress}}</div>
          <div>{{forminline.uniformSocialCreditCode}}</div>
          <div>{{forminline.enterpriseForm}}</div>
          <div>
            <img style="width:50px;height:50px" :src="forminline.cert.accessUrl" />
          </div>
          <div>
            <el-button @click="edits" type="primary">编辑</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let token = Cookies.get("Atoken");
import Cookies from "js-cookie";
import list from "../../assets/list.json";
import echarts from "echarts";
import industrys from "../../assets/industry.json";
import city from "../../assets/citys.json";
import { CodeToTag } from "../../cookie.js";
export default {
  data() {
    return {
      myHeaders: { "Auth-Token": token },
      uploadData: {
        label: "company-logo"
      },
      uploadDatas: {
        label: "company-license"
      },
      form: {
        name: "",
        scale: "",
        industry: [],
        city: [],
        desc: "",
        addressDetail: "",
        imageUrl: ""
      },
      propsOne: {
        value: "tag",
        label: "tag",
        children: "children"
      },
      industryList: [],
      options: [
        {
          value: 0,
          label: "500人以上"
        },
        {
          value: 1,
          label: "100-500人"
        },
        {
          value: 2,
          label: "10-100人"
        },
        {
          value: 3,
          label: "小于10人"
        }
      ],
      rules: {
        uniformSocialCreditCode: [
          {
            required: true,
            message: "请输入统一社会信用代码",
            trigger: "blur"
          },
          { len: 18, message: "统一社会信用代码为18位数字", trigger: "blur" }
        ],
        enterpriseForm: [
          { required: true, message: "请选择企业类别", trigger: "blur" }
        ],
        companyName: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        registeredAddress: [
          { required: true, message: "请输入企业注册地", trigger: "blur" }
        ]
      },
      imageUrl: "",
      dialogVisible: false,
      dialogVisibles: false,
      companyDetaillist: "",
      companyID: "",
      forminline: {
        enterpriseForm: "",
        registeredAddress: "",
        uniformSocialCreditCode: "",
        cert: {}
      },
      uniformSocialCreditCode: "",
      cityList: "",
      tabPosition: "top",
      verify: true,
      file: "",
      files: "",
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      activeName: "first",
      active: "first",
      valueTime: "",
      chartLine: null,
      list: []
    };
  },
  methods: {
    drawLineChart() {
      this.chartLine = echarts.init(document.getElementById("chartLine"));
      this.chartLine.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告", "搜索引擎"]
        },
        grid: {
          left: "1%",
          right: "4%",
          bottom: "17%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "line",
            stack: "总量",
            data: [110, 132, 101, 174, 90, 230, 110, 132, 101, 174, 90, 230]
          }
        ]
      });
    },
    drawCharts() {
      this.drawLineChart();
    },
    edit() {
      this.dialogVisible = true;
    },

    edits() {
      this.dialogVisibles = true;
    },
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw);
      this.file = res.data;
    },
    dealWithUploadLicense(res, file) {
      this.forminline.imageUrl = URL.createObjectURL(file.raw);
      this.files = res.data;
    },
    submitForm() {
      console.log(this.form.city[2]);
      let sizeName;
      switch (this.form.scale) {
        case 0:
          sizeName = "500人以上";
          break;
        case 1:
          sizeName = "100-500人";
          break;
        case 2:
          sizeName = "10-100人";
          break;
        case 3:
          sizeName = "小于10人";
          break;
      }
      let industryCode = this.form.industry;
      console.log(this.form.industry[1]);
      if (this.form.industry[1] === undefined) {
        industryCode = this.form.industry;
      } else {
        industryCode = this.form.industry[1];
      }
      let params = {
        addressId: null,
        cert: this.file,
        description: this.form.desc,
        fullName: this.form.name,
        industryCode: null,
        industryFirst: this.form.industry[0],
        industrySecondary: this.form.industry[1],
        companyAddressBody: {
          city: this.form.city[1],
          cityCode: null,
          detail: this.form.addressDetail ? this.form.addressDetail : null,
          district: this.form.city[2],
          districtCode: null,
          latitude: 0,
          longitude: 0,
          province: this.form.city[0],
          provinceCode: null
        },
        logo: null,
        nature: null,
        natureCode: null,
        shortName: this.form.name,
        size: sizeName,
        sizeCode: this.form.scale
      };
      this.$http
        .put(`/backend-manager/companies/${this.companyID}`, params)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.dialogVisible = false;
            this.companyDetail();
          } else {
            this.$message({
              type: "error",
              message: data.msg
            });
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

    submitForms(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            cert: this.files?this.files:null,
            enterpriseForm: this.forminline.enterpriseForm[1],
            enterpriseFormCode: null,
            registeredAddress: this.forminline.registeredAddress,
            uniformSocialCreditCode: this.forminline.uniformSocialCreditCode
          };
          this.$http
            .put(`/backend-manager/companies/cert/${this.companyID}`, params)
            .then(res => {
              if (res.data.code == "200") {
                this.dialogVisibles = false;
                this.companyDetail();
              } else {
                this.$message({
                  type: "error",
                  message: data.msg
                });
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    companyDetail() {
      this.$http
        .get(`/backend-manager/companies/${this.companyID}`)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.companyDetaillist = data.data;
            this.form = {
              name: data.data.shortName,
              scale: data.data.sizeCode,
              industry: [data.data.industryFirst, data.data.industrySecondary],
              city: [
                data.data.address.province,
                data.data.address.city,
                data.data.address.district
              ],
              desc: data.data.description,
              addressDetail: data.data.address.detail,
              imageUrl: data.data.logo.accessUrl
            };
            this.forminline = data.data.companyCertVO;
          } else {
            this.$message({
              type: "error",
              message: data.msg
            });
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
    clicktab(e) {
      console.log(e);
      if (e === "top") {
        this.verify = true;
      } else {
        this.verify = false;
      }
    }
  },
  computed: {
    uploadUrl() {
      return "/api/v2/file-service-dev/files/upload";
    }
  },
  mounted: function() {
    this.drawCharts();
  },
  updated: function() {
    this.drawCharts();
  },
  created() {
    let token = Cookies.get("Atoken");
    this.cityList = city.data;
    this.companyID = this.$route.query.companyID;
    this.uniformSocialCreditCode = this.$route.query.resumeNum;
    this.industryList = industrys.data;
    this.list = list.data;
    if (token) {
      this.companyDetail();
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
<style>
.enterdetail {
  width: 100%;
  background: #f8f8f8;
  border: 1px solid #f8f8f8;
}
.enterdetail-nav {
  display: flex;
  flex-direction: row;
  margin: 70px 20px 0 20px;
  background: #ffffff;
  height: 180px;
}
.nav-time {
  margin: 0 0 0 620px;
  display: flex;
  flex-direction: column;
}
.nav-image {
  display: flex;
  flex-direction: row;
  width: 98.5%;
  background: #ffffff;
  margin: 30px 0 0 0;
}
.el-image {
  width: 120px;
  height: 120px;
  border-radius: 60px;
}
.enter {
  display: flex;
  flex-direction: column;
  margin: 32px 0 0 0;
}
.enter div {
  padding: 0 0 0 40px;
  color: #4b4b4b;
  font-size: 16px;
}
.enterdetail-article {
  margin: 20px 20px 0 20px;
  width: 96.5%;
  height: 100%;
  background: #ffffff;
  border: 1px solid #ffffff;
  display: flex;
  flex-direction: row;
}
.enterdetail-articles {
  margin: 20px 20px 0 20px;
  width: 96.5%;
  height: 800px;
  background: #ffffff;
  border: 1px solid #ffffff;
  display: flex;
  flex-direction: row;
}
.articles-nav {
  text-align: right;
  margin: 10px 0 30px 30px;
  font-size: 16px;
  color: #5a5a5a;
}
.articles-foot {
  margin: 10px 0 30px 50px;
  font-size: 16px;
  color: #5a5a5a;
}
.articles-nav div {
  padding: 20px 0 0 0;
}
.articles-foot div {
  padding: 20px 0 0 0;
}
.enterdetail-echarts {
  width: 70%;
  background: white;
  margin: 20px 0 0 20px;
}
.el-tabs__nav-wrap:after {
  width: 97%;
}
.tab-first {
  display: flex;
  flex-direction: row;
  margin: 0 0 0 170px;
}
.tab-first div {
  padding: 0 25px 0 0;
}
.el-link.el-link--primary {
  font-size: 17px;
  line-height: 40px;
}
.echarts-second {
  width: 26%;
  margin: 20px 0 0 1.5%;
  background: white;
  border: 1px solid white;
}
.echart-nav {
  width: 100%;
  height: 100%;
}
.echarts-line {
  width: 100%;
  border: 0.5px solid #e5e5e5;
  margin: 10px 0 0 0;
}
.infor {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.infor span {
  margin: 20px 0 0 10px;
  color: #5a5a5a;
  font-size: 16px;
}
.riz {
  display: flex;
  flex-direction: row;
}
.el-tabs__nav-wrap::after {
  background: #fff;
}
.el-tabs__active-bar {
  background: #fff;
}
.el-tabs__item {
  font-size: 16px;
  color: #373737;
}
.chose {
  font-size: 14px;
  color: #a9a9a9;
  margin: 10px 0 0 0;
}
.formDatt .el-input {
  width: 360px;
  height: 40px;
}
.formDatt .el-select {
  width: 360px;
  height: 40px;
}
</style>