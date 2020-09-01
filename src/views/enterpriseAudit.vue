<template>
  <div class="enterprise-info-update-container">
    <el-dialog title :visible.sync="centerDialogVisible" :show-close="false" width="25%" center>
      <div style="text-align:center">
        <div class="loading">
          <i style="font-size:60px;color: #fabb14;" class="el-icon-warning"></i>
        </div>
        <div class="loading-texts">请查看是否填写完整的公司审核信息</div>
        <div style="text-align:center">
          <el-button
            style="width:100px;height:40px;line-height:0px;margin:35px 0 0 0"
            type="primary"
            @click="keep"
          >确定</el-button>
          <el-button
            style="width:100px;height:40px;line-height:0px;margin:35px 0 0 20px"
            plain
            @click="centerDialogVisible = false"
          >取消</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title :visible.sync="centerDialogVisibles" :show-close="false" width="25%" center>
      <div style="text-align:center">
        <div class="loading">
          <i style="font-size:60px;color: #fabb14;" class="el-icon-warning"></i>
        </div>
        <div class="loading-texts">请查看是否填写完整的个人基本信息</div>
        <div style="text-align:center">
          <el-button
            style="width:100px;height:40px;line-height:0px;margin:35px 0 0 0"
            type="primary"
            @click="keep"
          >确定</el-button>
          <el-button
            style="width:100px;height:40px;line-height:0px;margin:35px 0 0 20px"
            plain
            @click="centerDialogVisibles = false"
          >取消</el-button>
        </div>
      </div>
    </el-dialog>
    <div class="form">
      <el-form
        class="form-container"
        ref="companyInfo"
        :rules="companyInfoFormRules"
        :model="companyInfo"
        label-width="140px"
      >
        <p class="header">
          <span>企业资质审核</span>
        </p>
        <!-- <el-form-item label="企业名称" prop="companyName">
          <el-input v-model="companyInfo.companyName" placeholder="请输入与企业证件材料一致的全称"></el-input>
        </el-form-item> -->
        <el-form-item label="企业注册地" prop="registeredAddress">
          <el-input v-model="companyInfo.registeredAddress" placeholder="请输入企业注册地（省份、城市）"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码" prop="uniformSocialCreditCode">
          <el-input
            maxlength="18"
            v-model="companyInfo.uniformSocialCreditCode"
            placeholder="请输入与企业证件材料一致的代码"
          ></el-input>
        </el-form-item>
        <el-form-item label="企业类别" prop="enterpriseForm">
          <el-cascader
            style="width:240px"
            :props="prop"
            :options="list"
            v-model="companyInfo.enterpriseForm"
            placeholder="请选择所属行业"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="上传证件原件照片" prop="file">
          <el-upload
            class="upload"
            :action="uploadCompanyFile"
            :file-list="tempFile"
            :data="uploadData"
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
          <div style="border:1px solid #F1F1F1;width:100%"></div>
        </el-form-item>
        <el-form-item label="企业名称" prop="fullName">
          <el-input style="width:240px" v-model="companyInfo.fullName" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="shortName">
          <el-input style="width:240px" v-model="companyInfo.shortName" placeholder="请输入企业简称"></el-input>
        </el-form-item>
        <el-form-item label="企业规模" prop="size">
          <el-select style="width:240px" v-model="companyInfo.size" placeholder="请选择">
            <el-option
              v-for="item in this.optionList.companySize"
              :key="item.code"
              :label="item.tag"
              :value="item.tag"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业性质" prop="nature">
          <el-select style="width:240px" v-model="companyInfo.nature" placeholder="请选择企业性质">
            <el-option
              v-for="item in optionsNature"
              :key="item.code"
              :label="item.tag"
              :value="item.tag"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属行业" prop="industry">
          <el-cascader
            style="width:240px"
            :props="props"
            :options="industryList"
            v-model="companyInfo.industry"
            placeholder="请选择所属行业"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="企业地址" prop="city">
          <el-cascader
            v-model="companyInfo.city"
            style="width:240px"
            :props="props"
            :options="cityList"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="企业详细地址" prop="city">
          <el-input
            type="textarea"
            style="width:500px;margin:0 0 0 0"
            :rows="4"
            v-model="companyInfo.detail"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="企业介绍" prop="description">
          <el-input
            style="width:500px"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="companyInfo.description"
          ></el-input>
        </el-form-item>
        <el-form-item label="企业 LOGO" prop="file">
          <el-upload
            class="avatar-upload"
            :action="uploadCompanyFile"
            :data="uploadDatas"
            :headers="myHeaders"
            style="margin-left:0px"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i
              v-else
              style="border:1px solid #dcdfe6;margin:0 200px 0 0"
              class="el-icon-plus avatar-uploader-icon"
            ></i>
            <div class="el-upload__tip">支持图片格式：png、jpg、jpeg，最大不超过 3M。</div>
            <div class="el-upload__tip">为了尽快通过审核，请上传真实合法且清晰的执照图片。</div>
          </el-upload>
          <!-- <img
              ref="preview-logo"
              class="logo"
              :src="companyInfo.logoUrl"
              v-if="companyInfo.logoUrl"
            />
            <el-button size="small" type="primary">点击更新</el-button>
            <div class="el-upload__tip">支持图片格式：png、jpg、jpeg，最大不超过 3M。</div>
            <div class="el-upload__tip">为了尽快通过审核，请上传真实合法且清晰的执照图片。</div>
            <input class="image-input" ref="input" type="file" accept="image/*" />
            <el-dialog
              title="裁切图片"
              :visible.sync="lOGOUploadModalVisible"
              :close-on-click-modal="false"
              :close-on-press-escape="false"
              width="30%"
            >
              <vue-cropper ref="cropper" :src="imgSrc" :aspectRatio="1"></vue-cropper>
              <span slot="footer" class="dialog-footer">
                <el-button>重新选择</el-button>
                <el-button type="primary" @click="cropImage">确定</el-button>
              </span>
          </el-dialog>-->
        </el-form-item>
        <div class="operations">
          <el-button type="primary" class="main" @click="addCompany('companyInfo')">保存</el-button>
          <el-button @click="clearAndReload">取消</el-button>
        </div>
      </el-form>
      <div style="border:1px solid #F1F1F1;width:100%;margin:30px 0 50px 0"></div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo-ruleForm"
      >
       <p class="header">
          <span>企业基本信息审核</span>
        </p>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="ruleForm.position"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="用户头像" prop="filees">
          <el-upload
            class="avatar-upload"
            :action="uploadCompanyFile"
            :data="uploadDataavatar"
            :headers="myHeaders"
            style="margin-left:0px"
            :show-file-list="false"
            :on-success="handleAvatar"
          >
            <img v-if="imageUrles" :src="imageUrles" class="avatar" />
            <i
              v-else
              style="border:1px solid #dcdfe6;margin:0 200px 0 0"
              class="el-icon-plus avatar-uploader-icon"
            ></i>
            <div class="el-upload__tip">支持图片格式：png、jpg、jpeg，最大不超过 3M。</div>
            <div class="el-upload__tip">为了尽快通过审核，请上传真实合法且清晰的执照图片。</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <div class="operations">
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
let token = Cookies.get("token");
import Cookies from "js-cookie";
import industry from "../assets/industry.json";
import city from "../assets/city.json";
import list from "../assets/list.json";
import option from "../assets/option.json";
import timeUtil from "../timeUtil.js";
export default {
  data() {
    return {
      centerDialogVisible: false,
      centerDialogVisibles: false,
      cityList: [],
      list: [],
      industryList: [],
      optionList: [],
      myHeaders: { "Auth-Token": token },
      uploadData: {
        label: "company-license"
      },
      uploadDatas: {
        label: "company-logo"
      },
      uploadDataavatar: {
        label: "company-account-avatar"
      },
      props: {
        value: "tag",
        label: "tag",
        children: "children"
      },
      prop: {
        value: "code",
        label: "tag",
        children: "children"
      },
      companyInfo: {
        companyName: "",
        serialNuuniformSocialCreditCodember: "",
        registeredAddress: "",
        occupation: "",
        file: {},
        completedPercent: 0,
        detail: "",
        fullName: "",
        industry: [],
        nature: "",
        shortName: "",
        size: "",
        addressId: "",
        logoUrl: "",
        city: [],
        description: "",
        audit: {
          companyName: "",
          enterpriseForm: "",
          licenseUrl: {
            accessUrl: ""
          },
          registeredAddress: "",
          uniformSocialCreditCode: ""
        }
      },
      optionsNature: [
        {
          code: 0,
          tag: "国有企业"
        },
        {
          code: 1,
          tag: "民营企业"
        },
        {
          code: 2,
          tag: "合资企业"
        },
        {
          code: 3,
          tag: "外资企业"
        },
        {
          code: 4,
          tag: "事业单位"
        }
      ],
      companyInfoFormRules: {
        fullName: [
          { required: true, message: "请输入公司全称", trigger: "blur" }
        ],
        shortName: [
          { required: true, message: "请输入公司简称", trigger: "blur" }
        ],
        size: [{ required: true, message: "请选择企业规模", trigger: "blur" }],
        nature: [
          { required: true, message: "请选择企业性质", trigger: "blur" }
        ],
        industry: [
          { required: true, message: "请选择所属行业", trigger: "blur" }
        ],
        city: [{ required: true, message: "请选择企业地址", trigger: "blur" }],
        description: [
          { required: true, message: "请输入企业介绍", trigger: "blur" }
        ],
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
        ],
        realName: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入联系人电话", trigger: "blur" },
          { len: 11, message: "手机号为11位数字", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入联系人邮箱", trigger: "blur" }
        ],
        file: [
          { required: true, message: "请上传证件原件照片", trigger: "blur" }
        ]
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        email: [
          { required: true, message: "请填写邮箱", trigger: "change" },
          {
            pattern: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+(com|cn|net|com.cn|com.tw|com.hk)$/,
            message: "邮箱格式错误",
            trigger: ["change", "blur"]
          }
        ],
        position: [{ required: true, message: "请输入职位", trigger: "blur" }],
        file: [{ required: true, message: "请上传头像", trigger: "blur" }]
      },
      ruleForm: {
        name: "",
        email: "",
        position: ""
      },
      imageUrl: "",
      imageUrles: "",
      file: "",
      files: "",
      filees: ""
    };
  },
  methods: {
    keep() {
      this.$router.push({ path: "/home" });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            avatar: this.filees,
            email: this.ruleForm.email,
            position: this.ruleForm.position,
            realName: this.ruleForm.name
          };
          this.$http
            .post("/business-core/companyAccounts/cmpanyAdmin", params)
            .then(res => {
              let response = res.data.data;
              if (res.data.code == "200") {
                 this.$router.push({ path: "/login" });
                 this.$message({
                  message: '基本信息已提交审核，请耐心等待',
                  type: "success"
                });
              } else {
                this.$message({
                  message: res.data.message,
                  type: "error"
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addCompany(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            companyBody: {
              companyAddressBody: {
                city: this.companyInfo.city[1],
                detail: this.companyInfo.detail,
                district: this.companyInfo.city[2],
                province: this.companyInfo.city[0]
              },
              description: this.companyInfo.detail,
              fullName: this.companyInfo.fullName,
              industryCode: null,
              industryFirst: this.companyInfo.industry[0],
              industrySecondary: this.companyInfo.industry[1],
              logo: this.file ? this.file : null,
              nature: this.companyInfo.nature,
              natureCode: null,
              shortName: this.companyInfo.shortName,
              size: this.companyInfo.size,
              sizeCode: null
            },
            companyCertBody: {
              cert: this.files ? this.files : null,
              enterpriseForm: timeUtil.CodeToTag(
                [
                  this.companyInfo.enterpriseForm[0],
                  this.companyInfo.enterpriseForm[1]
                ],
                this.list
              )[1],
              enterpriseFormCode: this.companyInfo.enterpriseForm[1],
              registeredAddress: this.companyInfo.registeredAddress,
              uniformSocialCreditCode: this.companyInfo.uniformSocialCreditCode
            }
          };
          this.$http
            .post("/business-core/companyes", params)
            .then(res => {
              let response = res.data.data;
              if (res.data.code == "200") {
                this.$message({
                  message: '企业资质已提交审核，请耐心等待',
                  type: "success"
                });
              } else {
                 this.$message({
                  message: res.data.message,
                  type: "error"
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.file = res.data;
    },
    handleAvatar(res, file) {
      this.imageUrles = URL.createObjectURL(file.raw);
      this.filees = res.data;
    },
    dealWithUploadLicense(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.files = res.data;
    }
  },
  computed: {
    uploadCompanyFile() {
      return "/api/v2/file-service/files/upload";
    }
  },
  created() {
    this.cityList = city.data;
    this.list = list.data;
    this.industryList = industry.data;
    this.optionList = option.data;
  }
};
</script>

<style lang="stylus" scoped>
.operations {
  text-align: right;
}

.enterprise-info-update-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 96px 0 10px 0;
  background: #ffffff;

  .form {
    padding: 20px;
    width: 760px;

    .line {
      width: 100%;
      height: 1px;
      display: inline-block;
      background: lightgrey;
      margin: 10px 0;
    }

    button.full {
      width: 40%;
      margin-top: 50px;
    }

    p {
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;

      &.header {
        justify-content: space-between;
        margin-left: 5px;
        font-weight: bold;
      }

      span {
        font-size: 20px;
      }
    }
  }
}
</style>

<style lang="stylus">
.enterprise-info-update-container {
  .el-form-item__content {
    text-align: left;

    .el-input, .el-select, .el-cascader {
      width: 280px;
    }
  }

  .el-icon-upload {
    font-size: 25px;
  }

  .el-upload__tip {
    margin: 10px 0;
    line-height: 1.6;

    &.warning {
      color: #faad14;
    }
  }
}
</style>

