<template>
  <div class="aspes">
    <div class="aspes-nav">B端活动审核</div>
    <div class="aspes-content">
      <el-form :model="unsteadyForm" ref="unsteadyForm" label-width="100px" class="demo-ruleForm">
        <div class="unsteadyNav">
          <el-form-item label="活动ID" prop="unsteadyID">
            <el-input style="width: 240px;" :disabled="true" v-model="unsteadyForm.unsteadyID"></el-input>
          </el-form-item>
          <!-- <el-form-item label="规则ID" prop="ruleID">
            <el-input style="width: 240px;" :disabled="true" v-model="unsteadyForm.ruleID"></el-input>
          </el-form-item>-->
        </div>
        <div class="unsteadyNav">
          <el-form-item label="活动有效性" prop="unsteadyName">
            <el-select
              v-model="unsteadyForm.unsteadyValid"
              :disabled="true"
              style="width: 240px;"
              placeholder="请选择"
            >
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
              :disabled="true"
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
            <el-input style="width: 240px;" :disabled="true" v-model="unsteadyForm.unsteadyName"></el-input>
          </el-form-item>
          <el-form-item label="活动方式" prop="unsteadyName">
            <el-select
              v-model="unsteadyForm.unsteadyWay"
              :disabled="true"
              style="width: 240px;"
              placeholder="请选择"
            >
              <el-option label="线上" value="0"></el-option>
              <el-option label="线下" value="1"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="上传封面">
          <img :src="this.imgUrl" style="height:230px;width:auto" />
          <!-- <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              1、仅支持图片尺寸364*210
              jpg或png格式，且小于4M。
              2、精美封面有助于增加报名量，并有机会获得强力推荐！
            </div>
          </el-upload>-->
        </el-form-item>
        <el-form-item label="活动时间" prop="unsteadyTime">
          <el-date-picker
            :disabled="true"
            v-model="unsteadyForm.unsteadyTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="报名时间" prop="reportTime">
          <el-date-picker
            :disabled="true"
            v-model="unsteadyForm.reportTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="报名人数" prop="unsteadyNum">
          <el-input :disabled="true" class="unsteadyNum" v-model="unsteadyForm.unsteadyNum"></el-input>人
        </el-form-item>
        <el-form-item label="活动表单" prop="pattern">
          <el-checkbox-group :disabled="true" v-model="unsteadyForm.pattern" class="pattern">
            <el-checkbox style="margin:0 0 0 0" label="surname">姓名</el-checkbox>
            <el-checkbox style="margin:0 0 0 50px" label="phone">手机</el-checkbox>
            <el-checkbox style="margin:0 0 0 50px" label="email">邮箱</el-checkbox>
            <br />
            <el-checkbox style="margin:0 0 0 0" label="sex">性别</el-checkbox>
            <el-checkbox style="margin:0 0 0 50px" label="age">年龄</el-checkbox>
            <el-checkbox style="margin:0 0 0 50px" label="position">职位</el-checkbox>
            <br />
            <el-checkbox style="margin:0 0 0 0" label="record">学历</el-checkbox>
            <el-checkbox style="margin:0 0 0 50px" label="school">学校</el-checkbox>
            <el-checkbox style="margin:0 0 0 50px" label="major">专业</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="活动地址" prop="unsteadyAddress" class="unsteadyAddress">
          <el-cascader
            :disabled="true"
            v-model="unsteadyForm.unsteadyAddress"
            :props="props"
            :options="this.cityList"
          ></el-cascader>
          <el-input
            :disabled="true"
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
            :disabled="true"
            v-model="unsteadyForm.unsteadyTextarea"
            maxlength="2000"
            style="width:759px"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="unsteadyTextareas" class="unsteadyDetail">
          <el-input
            :disabled="true"
            type="textarea"
            placeholder="请输入内容"
            v-model="unsteadyForm.unsteadyTextareas"
            style="width:759px"
          ></el-input>
        </el-form-item>
        <div class="line"></div>
        <el-form-item
          label="活动审核"
          prop="unsteadyAudit"
          class="unsteadyAudit"
          style="margin:20px 0 0 0"
        >
          <el-select v-model="unsteadyForm.unsteadyValid" style="width: 240px;" placeholder="请选择">
            <el-option
              v-for="item in optionsAudit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label prop="unsteadyAudit" class="unsteadyAudit">
          <el-input
            type="textarea"
            placeholder="请输入审核未通过原因"
            v-model="unsteadyForm.unsteadyArea"
            maxlength="2000"
            style="width:759px"
            show-word-limit
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
export default {
  data() {
    return {
      id: "",
      cityList: [],
      props: {
        value: "code",
        label: "tag",
        children: "children",
        emitPath: false
      },
      optionsAudit: [
        {
          value: "0",
          label: "待审核"
        },
        {
          value: "1",
          label: "审核通过"
        },
        {
          value: "2",
          label: "审核未通过"
        }
      ],
      optionsValid: [
        {
          value: "0",
          label: "无效"
        },
        {
          value: "1",
          label: "有效"
        }
      ],
      optionsDirectly: [
        {
          value: "0",
          label: "1"
        },
        {
          value: "1",
          label: "2"
        },
        {
          value: "2",
          label: "3"
        },
        {
          value: "3",
          label: "4"
        },
        {
          value: "4",
          label: "5"
        },
        {
          value: "5",
          label: "6"
        },
        {
          value: "6",
          label: "7"
        },
        {
          value: "7",
          label: "8"
        },
        {
          value: "8",
          label: "9"
        },
        {
          value: "9",
          label: "10"
        }
      ],
      unsteadyForm: {
        pattern: [],
        unsteadyID: "",
        ruleID: "",
        unsteadyValid: "",
        unsteadyDirectly: "",
        unsteadyName: "",
        unsteadyWay: "",
        unsteadyTime: [],
        reportTime: [],
        unsteadyNum: "",
        unsteadyAddress: [],
        unsteadyAddressDetail: "",
        unsteadyTextarea: "",
        unsteadyTextareas: "",
        unsteadyArea: ""
      }
    };
  },
  methods: {
    //获取活动详情
    appraiseDetail() {
      this.$http
        .get(`/backend-manager/activity/${this.id}`)
        .then(res => {
          if (res.data.code == 200) {
            let formlist = res.data.data;
            let address = formlist.activityAddress;
            let unsteadyDirectly = formlist.activityMode.toString();
            formlist.formAttributes.forEach((item, index, array) => {
              //执行代码
              console.log(item)
              this.unsteadyForm.pattern.push(item.englishName)
            });
            console.log(this.unsteadyForm.pattern)
            this.imgUrl = formlist.activityPosterUrl;
            this.unsteadyForm = {
              pattern: this.unsteadyForm.pattern,
              unsteadyID: formlist.id,
              ruleID: "",
              unsteadyValid: formlist.activityPriority ? "1" : "0",
              unsteadyDirectly: formlist.activityPriority,
              unsteadyName: formlist.activityName,
              unsteadyWay: unsteadyDirectly,
              unsteadyTime: [
                this.$moment(formlist.activityStartTime).format(
                  "YYYY-MM-DD HH:mm"
                ),
                this.$moment(formlist.activityEndTime).format(
                  "YYYY-MM-DD HH:mm"
                )
              ],
              reportTime: [
                this.$moment(formlist.registrationStartTime).format(
                  "YYYY-MM-DD HH:mm"
                ),
                this.$moment(formlist.registrationEndTime).format(
                  "YYYY-MM-DD HH:mm"
                )
              ],
              unsteadyNum: formlist.registeredNum,
              unsteadyAddress: [
                address.provinceCode,
                address.cityCode,
                address.districtCode
              ],
              unsteadyAddressDetail: address.detail,
              unsteadyTextarea: formlist.activityContent,
              unsteadyTextareas: formlist.activityContent,
              unsteadyArea: formlist.activityContent
            };
          } else {
          }
        })
        .catch(error => {});
    },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
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
    this.id = this.$route.query.id;
    this.appraiseDetail();
  }
};
</script>
<style lang="scss">
.aspes {
  width: 100%;
  background: #f8f8f8;
  border: 1px solid #f8f8f8;
  .el-select .el-input.is-disabled .el-input__inner {
    cursor: pointer;
  }
  .el-cascader .el-input.is-disabled .el-input__inner {
    cursor: pointer;
  }
  .el-input.is-disabled .el-input__inner {
    cursor: pointer;
  }
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
      .line {
        width: 100%;
        height: 15px;
        background: #f8f8f8;
        border: 1px solid #f8f8f8;
        margin: 0 10px 0 0;
      }
      .unsteadyNav {
        display: flex;
        flex-direction: row;
      }

      .upload-demo {
        display: flex;
        flex-direction: row;

        .el-upload__tip {
          width: 165px;
          height: auto;
          font-family: PingFangSC-Regular;
          color: #848484;
          font-size: 12px;
          margin: 0 0 0 25px;
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