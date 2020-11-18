<template>
  <div class="aspes">
    <div class="aspes-nav">后台发布活动</div>
    <div class="aspes-content">
      <el-form
        :model="unsteadyForm"
        :rules="rules"
        ref="unsteadyForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="unsteadyNav">
          <el-form-item label="活动ID" prop="unsteadyName">
            <el-input style="width: 240px;" v-model="unsteadyForm.unsteadyName"></el-input>
          </el-form-item>
          <el-form-item label="规则ID" prop="unsteadyName">
            <el-input style="width: 240px;" v-model="unsteadyForm.unsteadyName"></el-input>
          </el-form-item>
        </div>
        <div class="unsteadyNav">
          <el-form-item label="活动有效性" prop="unsteadyName">
            <el-input style="width: 240px;" v-model="unsteadyForm.unsteadyName"></el-input>
          </el-form-item>
          <el-form-item label="活动优先级" prop="unsteadyName">
            <el-input style="width: 240px;" v-model="unsteadyForm.unsteadyName"></el-input>
          </el-form-item>
        </div>
        <div class="unsteadyNav">
          <el-form-item label="活动名称" prop="unsteadyName">
            <el-input style="width: 240px;" v-model="unsteadyForm.unsteadyName"></el-input>
          </el-form-item>
          <el-form-item label="活动方式" prop="unsteadyName">
            <el-input style="width: 240px;" v-model="unsteadyForm.unsteadyName"></el-input>
          </el-form-item>
        </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      unsteadyForm: {}
    };
  },
  methods: {},
  created() {}
};
</script>
<style lang="scss" scoped>
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
        display: flex;
        flex-direction: column;

        span {
          font-family: PingFangSC-Regular;
          color: #aaaaaa 100%;
          font-size: 14px;
        }
      }
    }
  }
}
</style>