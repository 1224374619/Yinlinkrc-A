<template>
  <div class="asp">
    <div class="asp-nav">编辑职位</div>
    <div class="asp-content">
      <div class="asp-form">
        <div class="asp-table">
          <div style="margin:19px 0 0 0">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="岗位名称" prop="positionName">
                <el-input style="width:203px" placeholder="岗位名称" v-model="ruleForm.positionName"></el-input>
              </el-form-item>
              <el-form-item label="工作性质" prop="nature">
                <el-select v-model="ruleForm.nature" placeholder="工作性质">
                  <el-option
                    v-for="item in optionstate"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="岗位分类" prop="positionCatalog">
                <el-cascader
                  style="width:203px"
                  :options="positionCatalogList"
                  :props="propsTwo"
                  :show-all-levels="false"
                  v-model="ruleForm.positionCatalog"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="月薪范围" prop="salary">
                <el-select v-model="ruleForm.salary" placeholder="岗位分类">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="最低学历" prop="degree">
                <el-select v-model="ruleForm.degree" placeholder="最低学历">
                  <el-option
                    v-for="item in optionsDegree"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作年限" prop="workYear">
                <el-select v-model="ruleForm.workYear" placeholder="工作年限">
                  <el-option
                    v-for="item in optionsWorkYear"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作地区" prop="workCity">
                <el-cascader
                  style="width:203px"
                  :options="cityList"
                  :props="propsOne"
                  :show-all-levels="false"
                  v-model="ruleForm.workCity"
                ></el-cascader>
                <br />
                <el-input
                  style="width:500px;margin:20px 0 0 0"
                  placeholder="详细地址：街道门牌信息等"
                  type="textarea"
                  v-model="ruleForm.desc"
                ></el-input>
              </el-form-item>
              <el-form-item label="岗位描述" prop="positionCatalogDetail">
                <el-input
                  style="width:500px;"
                  type="textarea"
                  placeholder="必填，请输入300字以下内容"
                  v-model="ruleForm.positionCatalogDetail"
                ></el-input>
              </el-form-item>
              <el-form-item label="求职要求" prop="JobSearch">
                <el-input
                  style="width:500px;"
                  type="textarea"
                  placeholder="必填，请输入300字以下内容"
                  v-model="ruleForm.JobSearch"
                ></el-input>
              </el-form-item>
              <el-form-item label="技能标签" prop="skills">
                <el-input
                  style="width:500px;"
                  type="textarea"
                  placeholder="选填"
                  v-model="ruleForm.skills"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="负责HR" prop="HR">
                <el-input style="width:203px" v-model="ruleForm.HR"></el-input>
              </el-form-item>
              <el-form-item label="投递邮箱" prop="email">
                <el-input style="width:203px" v-model="ruleForm.email"></el-input>
              </el-form-item>-->
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import positionCatalog from "../../assets/positionCatalog.json";
import city from "../../assets/citys.json";
import { CodeToTag } from "../../cookie.js";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      ruleForm: {
        positionName: "",
        nature: "",
        positionCatalog: "",
        salary: "",
        degree: "",
        workYear: "",
        workCity: "",
        positionCatalogDetail: "",
        JobSearch: "",
        skills: "",
        HR: "",
        desc: "",
        email: ""
      },
      propsTwo: {
        value: "code",
        label: "tag",
        children: "children",
        emitPath: false
      },
      propsOne: {
        value: "code",
        label: "tag",
        children: "children",
        emitPath: false
      },
      optionstate: [
        {
          value: "0",
          label: "全职"
        },
        {
          value: "1",
          label: "兼职"
        },
        {
          value: "2",
          label: "实习"
        }
      ],
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
          label: "6K-8K"
        },
        {
          value: "6",
          label: "8K-10K"
        },
        {
          value: "7",
          label: "10K-15K"
        },
        {
          value: "8",
          label: "15K-25K"
        },
        {
          value: "9",
          label: "25K-35K"
        },
        {
          value: "10",
          label: "35K以上"
        }
      ],
      optionsDegree: [
        {
          value: "0",
          label: "初中及以下"
        },
        {
          value: "1",
          label: "中专/中技"
        },
        {
          value: "2",
          label: "高中"
        },
        {
          value: "3",
          label: "大专"
        },
        {
          value: "4",
          label: "本科"
        },
        {
          value: "5",
          label: "硕士"
        },
        {
          value: "6",
          label: "博士"
        }
      ],
      optionsWorkYear: [
        {
          value: "0",
          label: "无"
        },
        {
          value: "1",
          label: "1-3年"
        },
        {
          value: "2",
          label: "3-5年"
        },
        {
          value: "3",
          label: "5-10年"
        },
        {
          value: "4",
          label: "10年以上"
        }
      ],
      positionCatalogList: [],
      cityList: [],
      positionDetailList: "",
      positionID: "",
      companyID: "",
      rules: {
        positionName: [
          { required: true, message: "请输入岗位名称", trigger: "blur" }
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        nature: [
          { required: true, message: "请选择工作性质", trigger: "blur" }
        ],
        positionCatalog: [
          { required: true, message: "请选择岗位分类", trigger: "blur" }
        ],
        salary: [
          { required: true, message: "请选择薪资范围", trigger: "blur" }
        ],
        degree: [
          { required: true, message: "请选择最低学历", trigger: "blur" }
        ],
        workYear: [
          { required: true, message: "请选择工作年限", trigger: "blur" }
        ],
        workCity: [
          { required: true, message: "请选择工作城市", trigger: "blur" }
        ],
        positionCatalogDetail: [
          { required: true, message: "请填写岗位描述", trigger: "blur" },
          {
            min: 0,
            max: 300,
            message: "长度在 0 到 300 个字符",
            trigger: "blur"
          }
        ],
        JobSearch: [
          { required: true, message: "请填写求职要求", trigger: "blur" },
          {
            min: 0,
            max: 300,
            message: "长度在 0 到 300 个字符",
            trigger: "blur"
          }
        ],
        HR: [{ required: true, message: "请填写负责HR", trigger: "blur" }],
        email: [{ required: true, message: "请填写投递邮箱", trigger: "blur" }]
      }
    };
  },
  methods: {
    //发布
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(this.ruleForm.salary);
        let degreeName;
        switch (this.ruleForm.degree) {
          case "0":
            degreeName = "初中及以下";
            break;
          case "1":
            degreeName = "中专/中技";
            break;
          case "2":
            degreeName = "高中";
            break;
          case "3":
            degreeName = "大专";
            break;
          case "4":
            degreeName = "本科";
            break;
          case "5":
            degreeName = "硕士";
            break;
          case "6":
            degreeName = "博士";
            break;
        }
        let natureName;
        switch (this.ruleForm.nature) {
          case "0":
            natureName = "全职";
            break;
          case "1":
            natureName = "兼职";
            break;
          case "2":
            natureName = "实习";
            break;
        }
        let salaryMin;
        let salaryMax;
        switch (this.ruleForm.salary) {
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
        let workAgeMin;
        let workAgeMax;
        switch (this.ruleForm.workYear) {
          case "0":
            workAgeMin = 0;
            workAgeMax = 0;
            break;
          case "1":
            workAgeMin = 1;
            workAgeMax = 3;
            break;
          case "2":
            workAgeMin = 3;
            workAgeMax = 5;
            break;
          case "3":
            workAgeMin = 5;
            workAgeMax = 10;
            break;
          case "4":
            workAgeMin = 10;
            workAgeMax = null;
            break;
          default:
            workAgeMin = null;
            workAgeMax = null;
            break;
        }
        if (valid) {
          let params = {
            addressId: this.companyID,
            catalogCode: this.ruleForm.positionCatalog,
            catalogFirst: CodeToTag(
              [
                parseInt(
                  (parseInt(this.ruleForm.positionCatalog / 100) * 100) / 10000
                ) * 10000,
                parseInt(this.ruleForm.positionCatalog / 100) * 100,
                this.ruleForm.positionCatalog
              ],
              this.positionCatalogList
            )[0],
            catalogSecondary: CodeToTag(
              [
                parseInt(
                  (parseInt(this.ruleForm.positionCatalog / 100) * 100) / 10000
                ) * 10000,
                parseInt(this.ruleForm.positionCatalog / 100) * 100,
                this.ruleForm.positionCatalog
              ],
              this.positionCatalogList
            )[1],
            catalogThird: CodeToTag(
              [
                parseInt(
                  (parseInt(this.ruleForm.positionCatalog / 100) * 100) / 10000
                ) * 10000,
                parseInt(this.ruleForm.positionCatalog / 100) * 100,
                this.ruleForm.positionCatalog
              ],
              this.positionCatalogList
            )[2],
            companyAddressBody: {
              city: CodeToTag(
                [
                  parseInt(
                    (parseInt(this.ruleForm.workCity / 100) * 100) / 10000
                  ) * 10000,
                  parseInt(this.ruleForm.workCity / 100) * 100,
                  this.ruleForm.workCity
                ],
                this.cityList
              )[1],
              cityCode: parseInt(this.ruleForm.workCity / 100) * 100,
              detail: this.ruleForm.desc ? this.ruleForm.desc : null,
              district: CodeToTag(
                [
                  parseInt(
                    (parseInt(this.ruleForm.workCity / 100) * 100) / 10000
                  ) * 10000,
                  parseInt(this.ruleForm.workCity / 100) * 100,
                  this.ruleForm.workCity
                ],
                this.cityList
              )[2],
              districtCode: this.ruleForm.workCity,
              latitude: 0,
              longitude: 0,
              province: CodeToTag(
                [
                  parseInt(
                    (parseInt(this.ruleForm.workCity / 100) * 100) / 10000
                  ) * 10000,
                  parseInt(this.ruleForm.workCity / 100) * 100,
                  this.ruleForm.workCity
                ],
                this.cityList
              )[0],
              provinceCode:
                parseInt(
                  (parseInt(this.ruleForm.workCity / 100) * 100) / 10000
                ) * 10000
            },
            companyId: this.companyID,
            degreeMin: degreeName,
            degreeMinCode: this.ruleForm.degree,
            description: this.ruleForm.positionCatalogDetail,
            email: null,
            isGraduate: true,
            jobType: natureName,
            jobTypeCode: this.ruleForm.nature,
            manager: null,
            positionName: this.ruleForm.positionName,
            proxyEmail: null,
            requirement: this.ruleForm.JobSearch,
            salaryMax: salaryMax,
            salaryMin: salaryMin,
            sourceType: null,
            sourceUrl: null,
            workAgeMax: workAgeMax,
            workAgeMin: workAgeMin
          };
          this.$http
            .put(`/backend-manager/positions/${this.positionID}`, params)
            .then(res => {
              if (res.data.code == "200") {
                this.$router.go(-1);
              } else {
              }
            })
            .catch(error => {
          
        });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //职位详情
    positionDetail() {
      this.$http
        .get(`/backend-manager/positions/${this.positionID}`)
        .then(res => {
          if (res.data.code == 200) {
            this.positionDetailList = res.data.data;
            let natureName;
            switch (this.positionDetailList.jobType) {
              case "全职":
                natureName = "0";
                break;
              case "兼职":
                natureName = "1";
                break;
              case "实习":
                natureName = "2";
                break;
            }
            let salaryName;
            switch (this.positionDetailList.salaryMin) {
              case 0:
                salaryName = "0";
                break;
              case 1:
                salaryName = "1";
                break;
              case 2:
                salaryName = "2";
                break;
              case 4:
                salaryName = "3";
                break;
              case 6:
                salaryName = "4";
                break;
              case 8:
                salaryName = "5";
                break;
              case 10:
                salaryName = "6";
                break;
              case 15:
                salaryName = "7";
                break;
              case 25:
                salaryName = "8";
                break;
              case 35:
                salaryName = "9";
                break;
            }
            let degreeName;
            switch (this.positionDetailList.degreeMin) {
              case "初中及以下":
                degreeName = "0";
                break;
              case "中专":
                degreeName = "1";
                break;
              case "高中":
                degreeName = "2";
                break;
              case "大专":
                degreeName = "3";
                break;
              case "本科":
                degreeName = "4";
                break;
              case "硕士":
                degreeName = "5";
                break;
              case "博士":
                degreeName = "6";
                break;
            }
            let workAgeName;
            switch (this.positionDetailList.workAgeMin) {
              case null:
                workAgeName = "0";
                break;
              case 1:
                workAgeName = "1";
                break;
              case 3:
                workAgeName = "2";
                break;
              case 5:
                workAgeName = "3";
                break;
              case 10:
                workAgeName = "4";
                break;
            }
            this.ruleForm = {
              positionName: this.positionDetailList.positionName,
              nature: natureName,
              positionCatalog: this.positionDetailList.catalogCode,
              salary: salaryName,
              degree: degreeName,
              workYear: workAgeName,
              workCity: this.positionDetailList.workAddress.districtCode,
              positionCatalogDetail: this.positionDetailList.description,
              JobSearch: this.positionDetailList.requirement,
              skills: null,
              HR: this.positionDetailList.manager,
              desc: this.positionDetailList.workAddress.detail,
              email: this.positionDetailList.email
            };
          } else {
            console.log("defeat");
          }
        })
        .catch(error => {
          
        });
    },
    //重置
    resetForm(formName) {
      this.ruleForm.desc = "";
      this.$refs[formName].resetFields();
    }
  },
  mounted: function() {},
  updated: function() {},
  created() {
    let token = Cookies.get("Atoken");
    if (token) {
      this.positionDetail();
    } else {
      this.$notify.info({
        title: "消息",
        message: "登陆超时，请重新登录"
      });
      this.$router.push({ path: "/login" });
    }
    this.positionID = this.$route.query.positionID;
    this.companyID = this.$route.query.companyID;
    this.positionCatalogList = positionCatalog.data;
    this.cityList = city.data;
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
.asp-table {
  width: 100%;
  border: 1px solid #f8f8f8;
  background: #ffffff;
  margin: 10px 0 0 0;
}
</style>