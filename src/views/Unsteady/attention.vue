<template>
  <div class="unsteady">
    <div class="title">
      <div class="title-nav">发布须知</div>
    </div>
    <div class="content">
      <div class="content-nav">这样的活动更容易被推荐</div>
      <div class="content-aside">
        1 主题明确、内容清晰、形式健康，有较大受众基础；
        <br />2 主办方信息齐全，包括名称、头像、简介；
        <br />3 活动标题简洁有效，活动海报设计精美，且与主题相匹配；
        <br />4 活动举办时间、地点明确清晰；
        <br />5 活动详情亮点突出，层次鲜明，且排版图文并茂、干净整齐；
        <br />6 活动详情中不添加其它外链及公众号二维码；
        <br />7 活动详情中不添加大量营销型、煽动型文案；
        <br />8 设有会员价的活动能获得优先推荐。
      </div>
      <div class="content-nav">这样的内容活动中不能出现，否则将被屏蔽或删除</div>
      <div class="content-asides">
        1 活动内容中禁止有诱导用户集赞、转发、分享朋友圈并关联奖励/奖项等形式的内容及文字；
        <br />2 活动内容中禁止涉及有引导购房、引导炒股、引导重金属等期货交易、引导炒币的内容，禁止涉及有ICO发行的内容；
        <br />3 活动内容中禁止有带有政治、色情、赌博、黑户、维权上访、捐款等或其他容易引起误解或歧义的内容及文字；
        <br />4 活动内容中禁止使用银领人才网站外报名方式（包括但不限于引导外链报名、微信报名、公众号报名等）；
        <br />5 活动内容中禁止留有任何外部联系方式或者网站链接，包括但不限于手机号、微信、QQ、外网链接、二维码等；
        <br />6 活动内容中禁止有反对宪法所确定的基本原则的、危害国家安全，涉及国家领导人名字肖像等损害国家荣誉和利益、宣扬邪教和封建迷信、或涉及传销等内容及文字；
        <br />7 活动内容中禁止有违反广告法等绝对化的语言文字或用语， 如最高、最大、最佳、顶级、极品、第一品牌、绝无仅有、顶尖、万能、第一、最高、唯一、国家级等；
        <br />8 活动内容属于无意义活动。
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="stylus">
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
      color: #373737;
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

    .content-nav {
      font-family: PingFangSC-Regular;
      color: #373737;
      font-size: 16px;
      margin: 20px 0 0 20px;
    }

    .content-aside {
      font-family: PingFangSC-Regular;
      color: #555555;
      font-size: 16px;
      margin: 20px 0 0 20px;
    }
    .content-asides {
      font-family: PingFangSC-Regular;
      color: #555555;
      font-size: 16px;
      margin: 20px 0 100px 20px;
    }
  }
}
</style>