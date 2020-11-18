<template>
  <div class="enterdetail">
    <div class="enterdetail-nav">
      <div class="nav-image">
        <div>
          <el-image style="width: 100px; height: 70px" :src="url" :fit="fit"></el-image>
        </div>
        <div class="enter">
          <span style="font-size:25px;font-weight:600">上海xx有限公司</span>
          <span style="font-size:20px;font-weight:600;margin:10px 0 0 0">企业ID:132313123</span>
        </div>
        <div style="margin:0 0 0 10px;">
          <el-button
            style="height:25px;width:100px;padding:0 0;margin:5px 0 0 0"
            type="primary"
            round
          >审核已通过</el-button>
        </div>
      </div>
      <div class="nav-time">
        <span style="margin:10px 0 0 0">加入平台时间</span>
        <span style="font-size:25px;margin:20px 0 0 0">2019-09-09</span>
      </div>
      <div style="margin:0 0 0 160px">
        <el-tooltip class="item" effect="light" placement="bottom-start">
            <div slot="content">
              <span>
                <i style="color:#faad14;margin:0 5px 0 0" class="el-icon-warning-outline"></i>
              </span>
              <span>请选择不通过的原因</span>
              <div style="font-size:10px">
                <el-checkbox-group v-model="checkList" style="margin:0 0 0 20px">
                  <el-checkbox label="含虚假信息"></el-checkbox>
                  <br />
                  <el-checkbox label="含违法信息"></el-checkbox>
                  <br />
                  <el-checkbox label="非法传销"></el-checkbox>
                  <br />
                  <el-checkbox label="涉黄"></el-checkbox>
                  <br />
                  <el-checkbox label="涉嫌诈骗"></el-checkbox>
                </el-checkbox-group>
                <br />
                <el-button style="width:50px;height:20px;font-size:10px;padding:0 0">取消</el-button>
                <el-button
                  style="width:50px;height:20px;font-size:10px;padding:0 0"
                  type="primary"
                >确认</el-button>
              </div>
            </div>
            <el-button style="margin:30px 0 0 0" type="primary">隐藏7天</el-button>
          </el-tooltip>
        
        <el-button type="primary">加入黑名单</el-button>
      </div>
    </div>
    <div class="enterdetail-article">
      <div class="enterdetail-echarts">
        <div style="font-size:17px;font-weight:bold;margin:0 0 0 30px;padding:20px 0 0 0">数据统计</div>
        <div class="echart-nav">
          <el-tabs v-model="activeName" @tab-click="handleClick" style="margin:20px 0 0 30px">
            <el-tab-pane :lazy="true" label="发布职位数量" name="first">
              <div class="tab-first">
                <div>
                  <el-date-picker
                    v-model="value"
                    style="width:280px;margin:0 0 10px 0"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </div>
                <div>
                  <el-link :underline="false" type="primary">今年</el-link>
                </div>
                <div>
                  <el-link :underline="false" type="primary">本月</el-link>
                </div>
                <div>
                  <el-link :underline="false" type="primary">本周</el-link>
                </div>
                <div>
                  <el-link :underline="false" type="primary">今天</el-link>
                </div>
              </div>
              <div id="chartLine" style="width:100%; height:490px"></div>
            </el-tab-pane>
            <el-tab-pane label="接受简历数量" name="second">接受简历数量</el-tab-pane>
            <el-tab-pane label="购买简历数量" name="third">购买简历数量</el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="echarts-second">
        <el-badge
          is-dot
          class="item"
          style="font-size:17px;font-weight:bold;margin:20px 0 0 20px"
        >待审核职位</el-badge>
        <span
          style="font-size:17px;margin:5px 0 0 0;float:right;margin:20px 20px 0 0;color:#20a0ff"
        >更多</span>
        <div class="echarts-line"></div>
        <div style="margin:30px 0 0 0">
          <span style="margin:0 0 0 20px">产品经理</span>
          <span style="float:right;margin-right:20px">2019-09-01 19：30</span>
        </div>
        <div style="margin:20px 0 0 0">
          <span style="margin:0 0 0 20px">产品经理</span>
          <span style="float:right;margin-right:20px">2019-09-01 19：30</span>
        </div>
        <div style="margin:20px 0 0 0">
          <span style="margin:0 0 0 20px">产品经理</span>
          <span style="float:right;margin-right:20px">2019-09-01 19：30</span>
        </div>
        <div style="margin:20px 0 0 0">
          <span style="margin:0 0 0 20px">产品经理</span>
          <span style="float:right;margin-right:20px">2019-09-01 19：30</span>
        </div>
        <div style="margin:20px 0 0 0">
          <span style="margin:0 0 0 20px">产品经理</span>
          <span style="float:right;margin-right:20px">2019-09-01 19：30</span>
        </div>
        <div style="margin:20px 0 0 0">
          <span style="margin:0 0 0 20px">产品经理</span>
          <span style="float:right;margin-right:20px">2019-09-01 19：30</span>
        </div>
        <div style="margin:20px 0 0 0">
          <span style="margin:0 0 0 20px">产品经理</span>
          <span style="float:right;margin-right:20px">2019-09-01 19：30</span>
        </div>
        <div style="margin:20px 0 0 0">
          <span style="margin:0 0 0 20px">产品经理</span>
          <span style="float:right;margin-right:20px">2019-09-01 19：30</span>
        </div>
        <div style="margin:20px 0 0 0">
          <span style="margin:0 0 0 20px">产品经理</span>
          <span style="float:right;margin-right:20px">2019-09-01 19：30</span>
        </div>
        <div style="margin:20px 0 0 0">
          <span style="margin:0 0 0 20px">产品经理</span>
          <span style="float:right;margin-right:20px">2019-09-01 19：30</span>
        </div>
        <div style="margin:20px 0 0 0">
          <span style="margin:0 0 0 20px">产品经理</span>
          <span style="float:right;margin-right:20px">2019-09-01 19：30</span>
        </div>
        <div style="margin:20px 0 0 0">
          <span style="margin:0 0 0 20px">产品经理</span>
          <span style="float:right;margin-right:20px">2019-09-01 19：30</span>
        </div>
        <div style="margin:20px 0 0 0">
          <span style="margin:0 0 0 20px">产品经理</span>
          <span style="float:right;margin-right:20px">2019-09-01 19：30</span>
        </div>
      </div>
    </div>
    <div class="enterdetail-article">
      <div class="enterdetail-echarts">
        <div style="font-size:17px;font-weight:bold;margin:0 0 0 30px;padding:20px 0 0 0">企业信息</div>
        <div class="echart-nav">
          <el-tabs v-model="active" @tab-click="handleClick" style="margin:20px 0 0 30px">
            <el-tab-pane :lazy="true" label="基本信息" name="first">
              <div>基本信息</div>
              <div class="infor">
                <span>企业名称：上海市xx有限公司</span>
                <span>企业简介：xx有限公司</span>
                <span>企业规模：500以上</span>
                <span>企业性质：国企</span>
                <span>所属行业：建筑</span>
                <span>企业地点：上海市徐汇区</span>
                <span style="margin-bottom:50px">企业logo：</span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="审核信息" name="second">
              <div>审核信息</div>
              <div class="infor">
                <span>企业名称：上海市xx有限公司</span>
                <span>企业注册地：xx有限公司</span>
                <span>统一社会信用代码：1212312312321213</span>
                <span>企业类别：国企</span>
                <span>证件原件照片：</span>
              </div>
              <div style="width:300px;border:0.5px solid #e5e5e5;margin:20px 0 0 0"></div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="echarts-second">
        <div class="riz">
          <span style="font-size:17px;font-weight:bold;margin:20px 0 0 20px;">后台操作日志</span>
          <span style="font-size:17px;margin:20px 0 0 250px;color:#20a0ff">更多</span>
        </div>
        <div class="echarts-line"></div>
        <div style="margin:20px 0 0 0">
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
            >{{activity.content}}</el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      activeName: "first",
      active: "first",
      value: "",
      chartLine: null,
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15"
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        }
      ],
      checkList: ["复选框 A"],
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
          data: ["0", "10", "15", "20", "25", "30"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "line",
            stack: "总量",
            data: [110, 132, 101, 174, 90, 230]
          }
        ]
      });
    },
    drawCharts() {
      this.drawLineChart();
    }
  },
  mounted: function() {
    this.drawCharts();
  },
  updated: function() {
    this.drawCharts();
  }
};
</script>
<style>
.enterdetail {
  width: 100%;
}
.enterdetail-nav {
  display: flex;
  flex-direction: row;
  margin: 30px 0 0 20px;
}
.nav-time {
  margin: 0 0 0 620px;
  display: flex;
  flex-direction: column;
}
.nav-image {
  display: flex;
  flex-direction: row;
}
.enter {
  display: flex;
  flex-direction: column;
  margin: 0 0 0 10px;
}
.enterdetail-article {
  margin: 10px 0 0 0;
  width: 100%;
  background: #f0f2f5;
  border: 1px solid #f0f2f5;
  display: flex;
  flex-direction: row;
}
.enterdetail-echarts {
  width: 70%;
  background: white;
  margin: 20px 0 0 20px;
}
.el-tabs__nav-wrap:after {
  width: 97%;
}
.tab-first div {
  float: right;
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
  margin: 20px 0 0 0;
}
.riz{
  display: flex;
  flex-direction: row;
}
</style>