<template>
  <div class="promotionalDetail">
    <div class="title">
      <div class="title-nav">活动详情</div>
    </div>
    <div class="content">
      <div class="content-nav">
        <div>
          <img src="../../assets/images/a6.png" />
        </div>
        <div class="content-nava">
          <div>
            2020上海技术分享
            <span>报名进行中</span>
          </div>
          <div>报名时间：2019.6.18 10:00-2020.02.02</div>
          <div>活动时间：2019.6.18 10:00-2020.02.02</div>
          <div>发布时间：2019.6.18 10:00</div>
          <div>活动地址：线上活动</div>
          <div>报名人数：1/100</div>
          <div>
            <button>分享活动</button>
            <button>报名详情</button>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer-title">活动详情</div>
        <div class="footer-content">
          阿里巴巴网创立于1999年，总部设在中国上海，员工超过30000人，目前公司已在北京、广州、深圳、成都、杭州、南京、厦门、重庆、青岛、武汉、三亚、南通等95个境内城市，新加坡、首尔、香港等22个境外城市设立分支机构，在中国南通、苏格兰爱丁堡设立服务联络中心。2010年，携程旅行网战略投资台湾易游网和香港永安旅游，实现两岸三地的互通。2014年，投资途风旅行网，将触角延伸及北美洲。
          阿里巴巴网创立于1999年，总部设在中国上海，员工超过30000人，目前公司已在北京、广州、深圳、成都、杭州、南京、厦门、重庆、青岛、武汉、三亚、南通等95个境内城市，新加坡、首尔、香港等22个境外城市设立分支机构，在中国南通、苏格兰爱丁堡设立服务联络中心。2010年，携程旅行网战略投资台湾易游网和香港永安旅游，实现两岸三地的互通。2014年，投资途风旅行网，将触角延伸及北美洲。
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style lang="stylus" scoped>
.promotionalDetail {
  margin: 30px 0 0 0;

  .title {
    width: 963px;
    height: 50px;
    background: #FAFAFA;
    display: flex;
    flex-direction: row;

    .title-nav {
      font-family: PingFangSC-Medium;
      color: #327CF3;
      font-size: 16px;
      margin: 13px 0 0 20px;
    }
  }

  .content {
    width: 963px;
    height: auto;
    background: #FFFFFF;
    border: 1px solid rgba(246, 246, 246, 1);
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);

    .content-nav {
      display: flex;
      flex-direction: row;
      margin: 30px 0 0 20px;

      img {
        width: 270px;
        height: 210px;
      }

      .content-nava {
        margin: 0 0 0 25px;

        div:nth-child(1) {
          font-family: PingFangSC-Medium;
          color: #333333;
          font-size: 18px;

          span {
            font-size: 12px;
            color: #ff6600;
          }
        }

        div:nth-child(2) {
          font-family: PingFangSC-Regular;
          color: #333333;
          font-size: 14px;
          margin: 17px 0 0 0;
        }

        div:nth-child(3) {
          font-family: PingFangSC-Regular;
          color: #333333;
          font-size: 14px;
          margin: 7px 0 0 0;
        }

        div:nth-child(4) {
          font-family: PingFangSC-Regular;
          color: #333333;
          font-size: 14px;
          margin: 7px 0 0 0;
        }

        div:nth-child(5) {
          font-family: PingFangSC-Regular;
          color: #333333;
          font-size: 14px;
          margin: 7px 0 0 0;
        }

        div:nth-child(6) {
          font-family: PingFangSC-Regular;
          color: #333333;
          font-size: 14px;
          margin: 7px 0 0 0;
        }

        div:nth-child(7) {
          margin: 7px 0 0 0;

          button:nth-child(1) {
            width: 93px;
            height: 33px;
            background: #327CF3;
            border: 1px solid #327CF3;
            border-radius: 5px;
            font-family: PingFangSC-Regular;
            color: #FFFFFF;
            font-size: 18px;
          }

          button:nth-child(2) {
            width: 93px;
            height: 33px;
            background: #ffffff;
            border: 1px solid rgba(50, 124, 243, 1);
            border-radius: 5px;
            font-family: PingFangSC-Regular;
            color: #327CF3;
            font-size: 18px;
            margin: 0 0 0 20px;
          }
        }
      }
    }

    .footer {
      margin: 70px 20px 0 20px;

      .footer-title {
        font-family: PingFangSC-Regular;
        color: #333333;
        font-size: 16px;
      }

      .footer-content {
        font-family: PingFangSC-Regular;
        color: #333333;
        font-size: 16px;
        margin: 20px 0 30px 0;
      }
    }
  }
}
</style>