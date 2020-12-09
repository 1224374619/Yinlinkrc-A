<template>
  <div class="aspes">
    <div class="aspes-nav">后台发布活动</div>
    <div class="aspes-content">
      <el-form
        :model="unsteadyForm"
        :rules="rules"
        ref="unsteadyForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <!-- <div class="unsteadyNav">
          <el-form-item label="活动ID" prop="unsteadyID">
            <el-input style="width: 240px;" v-model="unsteadyForm.unsteadyID"></el-input>
          </el-form-item>
          <el-form-item label="规则ID" prop="ruleID">
            <el-input style="width: 240px;" v-model="unsteadyForm.ruleID"></el-input>
          </el-form-item>
        </div>-->
        <div class="unsteadyNav">
          <el-form-item label="活动有效性" prop="unsteadyName">
            <el-select v-model="unsteadyForm.unsteadyValid" style="width: 240px;" placeholder="请选择">
              <el-option
                v-for="item in optionsValid"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动优先级" prop="unsteadyName">
            <el-select
              v-model="unsteadyForm.unsteadyDirectly"
              style="width: 240px;"
              placeholder="请选择"
            >
              <el-option
                v-for="item in optionsDirectly"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="unsteadyNav">
          <el-form-item label="活动名称" prop="unsteadyName">
            <el-input style="width: 240px;" v-model="unsteadyForm.unsteadyName"></el-input>
          </el-form-item>
          <el-form-item label="活动方式" prop="unsteadyName">
            <el-select v-model="unsteadyForm.unsteadyWay" style="width: 240px;" placeholder="请选择">
              <el-option
                v-for="item in optionsWay"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="上传封面">
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :on-success="dealWithUploadLicense"
            :data="uploadData"
            :headers="myHeaders"
            drag
            multiple
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <div v-else>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
            </div>
            <div class="el-upload__tip" slot="tip">
              1、仅支持图片尺寸364*210
              jpg或png格式，且小于4M。
              2、精美封面有助于增加报名量，并有机会获得强力推荐！
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="活动时间" prop="unsteadyTime">
          <el-date-picker
            v-model="unsteadyForm.unsteadyTime"
            :picker-options="expireTimeOption"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="报名时间" prop="reportTime">
          <el-date-picker
            v-model="unsteadyForm.reportTime"
            :picker-options="expireTimeOption"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="报名人数" prop="unsteadyNum">
          <el-input class="unsteadyNum" v-model="unsteadyForm.unsteadyNum"></el-input>人
        </el-form-item>
        <el-form-item label="活动表单" prop="pattern">
          <el-checkbox-group v-model="unsteadyForm.pattern" class="pattern">
            <el-checkbox style="margin:0 0 0 0" label="0">姓名</el-checkbox>
            <el-checkbox style="margin:0 0 0 50px" label="1">手机</el-checkbox>
            <el-checkbox style="margin:0 0 0 50px" label="2">邮箱</el-checkbox>
            <br />
            <el-checkbox style="margin:0 0 0 0" label="3">性别</el-checkbox>
            <el-checkbox style="margin:0 0 0 50px" label="4">年龄</el-checkbox>
            <el-checkbox style="margin:0 0 0 50px" label="5">职位</el-checkbox>
            <br />
            <el-checkbox style="margin:0 0 0 0" label="6">学历</el-checkbox>
            <el-checkbox style="margin:0 0 0 50px" label="7">学校</el-checkbox>
            <el-checkbox style="margin:0 0 0 50px" label="8">专业</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          label="活动地址"
          prop="unsteadyAddress"
          class="unsteadyAddress"
          v-if="this.unsteadyForm.unsteadyWay === '1'"
        >
          <el-cascader
            v-model="unsteadyForm.unsteadyAddress"
            :props="props"
            :options="this.cityList"
          ></el-cascader>
          <el-input
            style="width:286px;margin:0 0 0 15px"
            v-model="unsteadyForm.unsteadyAddressDetail"
            placeholder="请输入详细地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动详情" prop="unsteadyTextarea" class="unsteadyDetail">
          <!-- <quill-editor
            v-model="unsteadyForm.unsteadyDetail"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          ></quill-editor>-->
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="unsteadyForm.unsteadyTextarea"
            maxlength="2000"
            style="width:759px"
            show-word-limit
          ></el-input>
        </el-form-item>
        <!-- <div class="demo-ruleForms">
          <el-form-item label="主办方联系信息" prop="unsteadyNames">
            <el-input placeholder="联系人姓名" style="width:160px" v-model="unsteadyForm.unsteadyNames"></el-input>
          </el-form-item>
          <el-form-item label prop="unsteadyPhone">
            <el-input placeholder="联系人电话" style="width:160px" v-model="unsteadyForm.unsteadyPhone"></el-input>
          </el-form-item>
          <el-form-item label prop="unsteadyEmail">
            <el-input placeholder="联系人邮箱" style="width:160px" v-model="unsteadyForm.unsteadyEmail"></el-input>
          </el-form-item>
        </div> -->
        <el-form-item label="备注" prop="unsteadyTextareas" class="unsteadyDetail">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="unsteadyForm.unsteadyTextareas"
            style="width:759px"
          ></el-input>
        </el-form-item>
        <el-form-item style="padding:0 0 40px 100px">
          <el-button type="primary" @click="submitForm('unsteadyForm')">提交</el-button>
          <el-button @click="keep('unsteadyForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import city from "../../assets/citys.json";
import Cookies from "js-cookie";
import { CodeToTag } from "../../cookie.js";
let token = Cookies.get("Atoken");
export default {
  data() {
    return {
      expireTimeOption: {
        disabledDate(date) {
          //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        }
      },
      imageUrl: "",
      file: "",
      myHeaders: { "Auth-Token": window.sessionStorage.getItem('Atoken') },
      uploadData: {
        label: "activity-poster"
      },
      cityList: [],
      props: {
        value: "code",
        label: "tag",
        children: "children"
      },
      optionsValid: [
        {
          value: "false",
          label: "无效"
        },
        {
          value: "true",
          label: "有效"
        }
      ],
      optionsDirectly: [
        {
          value: "1",
          label: "1"
        },
        {
          value: "2",
          label: "2"
        },
        {
          value: "3",
          label: "3"
        },
        {
          value: "4",
          label: "4"
        },
        {
          value: "5",
          label: "5"
        },
        {
          value: "6",
          label: "6"
        },
        {
          value: "7",
          label: "7"
        },
        {
          value: "8",
          label: "8"
        },
        {
          value: "9",
          label: "9"
        },
        {
          value: "10",
          label: "10"
        }
      ],
      optionsWay: [
        {
          value: "0",
          label: "线上"
        },
        {
          value: "1",
          label: "线下"
        }
      ],
      unsteadyForm: {
        unsteadyNames: "",
        unsteadyPhone: "",
        unsteadyEmail: "",
        pattern: ["0", "1", "2"],
        unsteadyID: "",
        ruleID: "",
        unsteadyValid: "true",
        unsteadyDirectly: 1,
        unsteadyName: "",
        unsteadyWay: "",
        unsteadyTime: [],
        reportTime: [],
        unsteadyNum: "",
        unsteadyAddress: [],
        unsteadyAddressDetail: "",
        unsteadyTextarea: "",
        unsteadyTextareas: ""
      },
      formAttributeBodies: [
        {
          chineseName: "",
          groupId: 0,
          englishName: "",
          isNumeric: true,
          unit: null
        }
      ],
      checkList: ["0", "1", "2"],
      rules: {
        unsteadyID: [
          { required: true, message: "请输入活动ID", trigger: "blur" }
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        ruleID: [{ required: true, message: "请选择规则ID", trigger: "blur" }],
        unsteadyValid: [
          { required: true, message: "请选择活动有效性", trigger: "blur" }
        ],
        unsteadyDirectly: [
          { required: true, message: "请选择活动优先级", trigger: "blur" }
        ],
        unsteadyName: [
          { required: true, message: "请填写活动名称", trigger: "blur" }
        ],
        unsteadyWay: [
          { required: true, message: "请选择活动方式", trigger: "blur" }
        ],
        unsteadyTime: [
          { required: true, message: "请选择活动时间", trigger: "blur" }
        ],
        reportTime: [
          { required: true, message: "请选择报名时间", trigger: "blur" }
        ],
        pattern: [
          { required: true, message: "请选择报名表单", trigger: "blur" }
        ],
        unsteadyNum: [
          { required: true, message: "请填写报名人数", trigger: "blur" }
        ],
        unsteadyAddress: [
          { required: true, message: "请选择活动地址", trigger: "blur" }
        ],
        unsteadyTextarea: [
          { required: true, message: "请填写活动详情", trigger: "blur" }
        ],
        unsteadyTextareas: [
          { required: true, message: "请填写备注信息", trigger: "blur" }
        ],
        unsteadyNames: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" }
        ],
        unsteadyPhone: [
          { required: true, message: "请输入联系人手机号", trigger: "blur" },
          {
            pattern: /^[1][356789][0-9]{9}$/,
            message: "请输入正确的手机号",
            trigger: ["change", "blur"]
          }
        ],
        unsteadyEmail: [
          { required: true, message: "请输入联系人邮箱", trigger: "blur" },
          {
            pattern: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+(com|cn|net|com.cn|com.tw|com.hk)$/,
            message: "邮箱格式错误",
            trigger: ["change", "blur"]
          }
        ]
      }
    };
  },
  methods: {
    //图片上传
    dealWithUploadLicense(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.file = res.data;
      this.$notify({
        title: "成功",
        message: "图片上传成功",
        type: "success"
      });
    },
    //form
    form() {
      this.unsteadyForm.pattern.forEach((item, index, array) => {
        //执行代码
        switch (item) {
          case "0":
            this.formAttributeBodies[index] = {
              chineseName: "姓名",
              groupId: 0,
              englishName: "surname",
              isNumeric: false,
              unit: null,
              index: 0
            };
            break;
          case "1":
            this.formAttributeBodies[index] = {
              chineseName: "手机",
              groupId: 0,
              englishName: "phone",
              isNumeric: true,
              unit: null,
              index: 1
            };
            break;
          case "2":
            this.formAttributeBodies[index] = {
              chineseName: "邮箱",
              groupId: 0,
              englishName: "email",
              isNumeric: false,
              unit: null,
              index: 2
            };
            break;
          case "3":
            this.formAttributeBodies[index] = {
              chineseName: "性别",
              groupId: 0,
              englishName: "sex",
              isNumeric: false,
              unit: null,
              index: 3
            };
            break;
          case "4":
            this.formAttributeBodies[index] = {
              chineseName: "年龄",
              groupId: 0,
              englishName: "age",
              isNumeric: true,
              unit: null,
              index: 4
            };
            break;
          case "5":
            this.formAttributeBodies[index] = {
              chineseName: "职位",
              groupId: 0,
              englishName: "position",
              isNumeric: false,
              unit: null,
              index: 5
            };
            break;
          case "6":
            this.formAttributeBodies[index] = {
              chineseName: "学历",
              groupId: 0,
              englishName: "record",
              isNumeric: false,
              unit: null,
              index: 6
            };
            break;
          case "7":
            this.formAttributeBodies[index] = {
              chineseName: "学校",
              groupId: 0,
              englishName: "school",
              isNumeric: false,
              unit: null,
              index: 7
            };
            break;
          case "8":
            this.formAttributeBodies[index] = {
              chineseName: "专业",
              groupId: 0,
              englishName: "major",
              isNumeric: false,
              unit: null,
              index: 8
            };
            break;
        }
        console.log(this.formAttributeBodies);
      });
    },
    //提交
    submitForm(formName) {
      console.log(this.unsteadyForm.unsteadyAddress);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form();
          let activityStartTime = this.unsteadyForm.unsteadyTime[0].getTime();
          let activityEndTime = this.unsteadyForm.unsteadyTime[1].getTime();
          let registrationStartTime = this.unsteadyForm.reportTime[0].getTime();
          let registrationEndTime = this.unsteadyForm.reportTime[1].getTime();
          let CodeTo = CodeToTag(
            [
              this.unsteadyForm.unsteadyAddress[0],
              this.unsteadyForm.unsteadyAddress[1],
              this.unsteadyForm.unsteadyAddress[2]
            ],
            this.cityList
          );

          let params = {
            activityAddressId: null,
            activityContent: this.unsteadyForm.unsteadyTextarea,
            activityEndTime: activityEndTime,
            activityFormBody: {
              formAttributeBodies: this.formAttributeBodies,
              groupName: null
            },

            activityMode: this.unsteadyForm.unsteadyWay,
            activityName: this.unsteadyForm.unsteadyName,
            activityPoster: this.file,

            activityPriority: null,
            activityStartTime: activityStartTime,

            addressBody: {
              city: CodeTo[1] ? CodeTo[1] : null,
              cityCode: this.unsteadyForm.unsteadyAddress[1]
                ? this.unsteadyForm.unsteadyAddress[1]
                : null,
              detail: this.unsteadyForm.unsteadyAddressDetail
                ? this.unsteadyForm.unsteadyAddressDetail
                : null,
              district: CodeTo[2] ? CodeTo[2] : null,
              districtCode: this.unsteadyForm.unsteadyAddress[2]
                ? this.unsteadyForm.unsteadyAddress[2]
                : null,
              latitude: null,
              longitude: null,
              province: CodeTo[0] ? CodeTo[0] : null,
              provinceCode: this.unsteadyForm.unsteadyAddress[0]
                ? this.unsteadyForm.unsteadyAddress[0]
                : null
            },

            contactEmail: null,
            contactName: null,
            contactPhone: null,
            isValid: this.unsteadyForm.unsteadyValid,
            registrationEndTime: registrationEndTime,
            registrationNum: this.unsteadyForm.unsteadyNum,
            registrationStartTime: registrationStartTime,
            remark: this.unsteadyForm.unsteadyTextareas
          };
          this.$http
            .post("/backend-manager/activity", params)
            .then(res => {
              if (res.data.code == "200") {
                this.$notify({
                  title: "成功",
                  message: "活动发布成功",
                  type: "success"
                });
                this.$router.go(-1);
              } else {
              }
            })
            .catch(error => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //保存
    keep() {}
  },
  created() {
    this.cityList = city.data;
  },
  computed: {
    uploadUrl() {
      return "/api/v3/file-service/files/upload";
    }
  }
};
</script>
<style lang="scss">
.aspes {
  width: 100%;
  background: #f8f8f8;
  border: 1px solid #f8f8f8;
  .aspes-nav {
    margin: 40px 0 0 20px;
    font-size: 18px;
    color: #2a2a2a;
    text-align: left;
    font-family: PingFangSC-Medium;
    color: #2a2a2a;
  }
  .aspes-content {
    width: 1130px;
    margin: 30px 0 20px 20px;
    height: auto;
    background: #ffffff;
    .demo-ruleForm {
      margin: 20px 0 0 0;
      padding: 20px 0 0 0;
      .unsteadyNav {
        display: flex;
        flex-direction: row;
      }
      .demo-ruleForms {
        display: flex;
        flex-direction: row;
        margin: 20px 0 0 0;
      }
      .upload-demo {
        display: flex;
        flex-direction: row;

        .avatar {
          width: 100%;
          height: auto;
        }
        .el-upload__tip {
          width: 165px;
          height: auto;
          font-family: PingFangSC-Regular;
          color: #848484;
          font-size: 12px;
          margin: 0 0 0 25px;
        }
        .el-upload-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: none;
        }
      }

      .unsteadyNum {
        width: 156px;
      }

      .pattern {
        font-family: PingFangSC-Regular;
        color: #666666;
        font-size: 16px;
        .el-checkbox__inner {
          margin: 1px -5px 0 0;
        }
      }
    }
  }
}
</style>