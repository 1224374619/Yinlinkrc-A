<template>
  <div class="unsteady">
    <div class="title">
      <div class="title-nav">基本信息</div>
      <div class="title-content" @click="attention()">发布活动须知 ></div>
    </div>
    <div v-if="unsteady">
      <div class="content">
        <el-form
          :model="unsteadyForm"
          :rules="rules"
          ref="unsteadyForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="活动名称" prop="unsteadyName">
            <el-input class="unsteadyName" v-model="unsteadyForm.unsteadyName"></el-input>
          </el-form-item>
          <el-form-item label="上传封面">
            <el-upload
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
            </el-upload>
          </el-form-item>
          <el-form-item label="活动时间" prop="unsteadyTime">
            <el-date-picker
              v-model="unsteadyForm.unsteadyTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="报名时间" prop="reportTime">
            <el-date-picker
              v-model="unsteadyForm.reportTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="报名人数" prop="unsteadyNum">
            <el-input class="unsteadyNum" v-model="unsteadyForm.unsteadyNum"></el-input>人
          </el-form-item>
          <el-form-item label="活动方式" prop="pattern">
            <el-radio-group v-model="unsteadyForm.pattern" class="pattern">
              <el-radio style="margin:15px 0 0 0" label="线下活动">
                线下活动
                <span style="margin:0 0 0 10px">有具体活动地址的线下活动</span>
              </el-radio>
              <el-radio style="margin:10px 0 0 0" label="线上活动">
                线上活动
                <span style="margin:0 0 0 10px">通过网络工具举办的线上活动</span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动地址" prop="unsteadyAddress" class="unsteadyAddress">
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
          <el-form-item label="活动详情" prop="unsteadyDetail" class="unsteadyDetail">
            <quill-editor
              v-model="unsteadyForm.unsteadyDetail"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
            ></quill-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('unsteadyForm')">立即创建</el-button>
            <el-button @click="resetForm('unsteadyForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="title">
        <div class="title-nav">其他设置</div>
      </div>
      <div class="content">
        <el-form
          :model="unsteadyForm"
          :rules="rules"
          ref="unsteadyForm"
          label-width="130px"
          class="demo-ruleForm"
          style="margin:20px 0 0 10px"
        >
          <div class="demo-ruleForms">
            <el-form-item label="主办方联系信息" prop="unsteadyNames">
              <el-input
                placeholder="联系人姓名"
                style="width:160px"
                v-model="unsteadyForm.unsteadyNames"
              ></el-input>
            </el-form-item>
            <el-form-item label prop="unsteadyPhone">
              <el-input
                placeholder="联系人电话"
                style="width:160px"
                v-model="unsteadyForm.unsteadyPhone"
              ></el-input>
            </el-form-item>
            <el-form-item label prop="unsteadyEmail">
              <el-input
                placeholder="联系人邮箱"
                style="width:160px"
                v-model="unsteadyForm.unsteadyEmail"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button style="margin:20px 0 20px 240px">预览</el-button>
            <el-button
              style="margin:20px 0 20px 80px"
              type="primary"
              @click="submitForm('unsteadyForm')"
            >下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content" v-else>
      <el-dialog title="浏览表单" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div style="margin:20px 0 0 80px">
          姓名
          <el-input
            placeholder="请选择日期"
            style="width:234px;margin:0 0 0 10px"
            suffix-icon="el-icon-date"
            v-model="input1"
          ></el-input>
        </div>
        <div style="margin:20px 0 0 80px">
          手机
          <el-input
            placeholder="请选择日期"
            style="width:234px;margin:0 0 0 10px"
            suffix-icon="el-icon-date"
            v-model="input1"
          ></el-input>
        </div>
        <div style="margin:20px 0 0 80px">
          院校
          <el-input
            placeholder="请选择日期"
            style="width:234px;margin:0 0 0 10px"
            suffix-icon="el-icon-date"
            v-model="input1"
          ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <div style="margin:10px 0 40px 30px">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="0">
            姓名
            <el-input class="checkedInput" placeholder="报名用户的姓名或昵称"></el-input>
          </el-checkbox>
          <el-checkbox label="1">
            手机
            <el-input class="checkedInput" placeholder="报名用户的手机号码"></el-input>
          </el-checkbox>
          <el-checkbox label="2">
            邮箱
            <el-input class="checkedInput" placeholder="报名用户的电子邮箱"></el-input>
          </el-checkbox>
          <el-checkbox label="3">
            性别
            <el-input class="checkedInput" placeholder="报名用户的性别"></el-input>
          </el-checkbox>
          <el-checkbox label="4">
            年龄
            <el-input class="checkedInput" placeholder="报名用户的年龄"></el-input>
          </el-checkbox>
          <el-checkbox label="5">
            职位
            <el-input class="checkedInput" placeholder="报名用户的职位"></el-input>
          </el-checkbox>
          <el-checkbox label="6">
            学历
            <el-input class="checkedInput" placeholder="报名用户的学历"></el-input>
          </el-checkbox>
          <el-checkbox label="7">
            学校
            <el-input class="checkedInput" placeholder="报名用户的毕业学校"></el-input>
          </el-checkbox>
          <el-checkbox label="8">
            专业
            <el-input class="checkedInput" placeholder="报名用户的专业"></el-input>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <el-button type="primary" style="margin:0 0 100px 290px">上一步</el-button>
      <el-button style="margin:0 0 100px 60px">预览</el-button>
      <el-button style="margin:0 0 100px 80px" type="primary" @click="submitForm('unsteadyForm')">发布</el-button>
      <div class="line"></div>
      <div class="footer">我们在48小时之内进行处理，审核通过将在应聘端活动中心进行展示</div>
    </div>
  </div>
</template>
<script>
import city from "../../assets/city.json";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      unsteady: false,
      dialogVisible: true,
      checkList: [],
      unsteadyForm: {
        unsteadyName: "",
        unsteadyTime: [],
        reportTime: [],
        unsteadyNum: "",
        pattern: "",
        unsteadyAddress: [],
        unsteadyAddressDetail: "",
        unsteadyDetail: "",
        unsteadyNames: "",
        unsteadyPhone: "",
        unsteadyEmail: ""
      },
      cityList: [],
      content: null,
      editorOption: {},
      props: {
        value: "tag",
        label: "tag",
        children: "children"
      },
      rules: {
        unsteadyName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        unsteadyTime: [
          { required: true, message: "请选择活动时间", trigger: "blur" }
        ],
        reportTime: [
          { required: true, message: "请选择活动时间", trigger: "blur" }
        ],
        unsteadyNum: [
          { required: true, message: "请选择活动时间", trigger: "blur" }
        ],
        pattern: [
          { required: true, message: "请选择活动方式", trigger: "blur" }
        ],
        unsteadyAddress: [
          { required: true, message: "请选择活动地址", trigger: "blur" }
        ],
        unsteadyDetail: [
          { required: true, message: "请输入活动详情", trigger: "blur" }
        ],
        unsteadyNames: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" }
        ],
        unsteadyPhone: [
          { required: true, message: "请输入联系人手机号", trigger: "blur" }
        ],
        unsteadyEmail: [
          { required: true, message: "请输入联系人邮箱", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //发布须知
    attention() {
      this.$router.push({
        path: "/unsteady/attention"
      });
    },
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      console.log(this.unsteadyForm.unsteadyDetail);
      //内容改变事件
    }
  },
  mounted() {},
  created() {
    this.cityList = city.data;
  }
};
</script>

<style lang="stylus" scoped>
.unsteady {
  margin: 30px 0 0 0;

  .title {
    width: 963px;
    height: 50px;
    background: #FAFAFA;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .title-nav {
      font-family: PingFangSC-Medium;
      color: #327CF3;
      font-size: 16px;
      margin: 17px 0 0 20px;
    }

    .title-content {
      font-family: PingFangSC-Medium;
      color: #737373;
      font-size: 14px;
      margin: 18px 20px 0 0;
    }
  }

  .content {
    width: 963px;
    height: auto;
    background: #FFFFFF;
    border: 1px solid rgba(246, 246, 246, 1);
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);

    .demo-ruleForm {
      margin: 20px 0 0 0;

      .unsteadyName {
        width: 595px;
      }

      .upload-demo {
        display: flex;
        flex-direction: row;

        .el-upload__tip {
          width: 156px;
          height: auto;
          font-family: PingFangSC-Regular;
          color: #848484;
          font-size: 12px;
          margin: 7px 0 0 25px;
        }
      }

      .unsteadyNum {
        width: 156px;
      }

      .pattern {
        display: flex;
        flex-direction: column;

        span {
          font-family: PingFangSC-Regular;
          color: #AAAAAA 100%;
          font-size: 14px;
        }
      }

      .unsteadyAddress {
      }
    }

    .demo-ruleForms {
      display: flex;
      flex-direction: row;
    }

    .checkedInput {
      width: 202px;
      height: 40px;
      padding: 20px 0 0 20px;
    }

    .line {
      width: 923px;
      border: 1px solid #f1f3f4;
      margin: 0 20px 20px 20px;
    }

    .footer {
      text-align: center;
      font-family: PingFangSC-Regular;
      color: #666666;
      font-size: 16px;
      margin: 0 0 200px 0;
    }
  }
}
</style>