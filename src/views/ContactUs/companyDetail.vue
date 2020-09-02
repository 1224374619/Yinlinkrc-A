<template>
  <div>
    <div class="companyDetail">
      <span style="font-family: PingFangSC-Regular;
color: #333333;font-size:16px;">公司简介：</span>
      <div
        style="width:760px;border:0px solid red;height:50px;height:auto;overflow:hidden;font-size:16px;font-family: PingFangSC-Regular;
color: #111111;"
      >{{companyDetail}}</div>
    </div>
    <!-- <div class="companyDetail">
      <span style="font-family: PingFangSC-Regular;
color: #333333;font-size:16px;">发展现状：</span>
      <div
        style="width:760px;border:0px solid red;height:50px;height:120px;overflow:hidden;font-size:16px;font-family: PingFangSC-Regular;
color: #111111;"
      >{{companyDetail}}</div>
    </div> -->
    <!-- <div class="companyDetail">
      <span style="font-family: PingFangSC-Regular;
color: #333333;font-size:16px;">公司风采：</span>
      <div class="imgs">
          <img src="../../assets/images/3.png" />
          <img src="../../assets/images/3.png" />
          <img src="../../assets/images/3.png" />
      </div>
      
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      companyDetail:
        "上海银领网络科技有限公司致力于开发“银领人才”（现代高技能人才）招聘的专业网站。在5G时代到来之际，银领人才网依托互联网PC+移动端以及AI人工智能和大数据打造全新的，属于5G时代的专业招聘网站，为“既动手又动脑”的银领人才求职提供多维度、精准化的招聘服务，为中国智能制造、制造业强国提供高技能人才的支撑。我们坚持以技术为先导、以人力资源服务为载体、以三方共赢为目的的指导方针，为企业引进专业技术人才，力争在招聘服务行业开创全方位技术人才培养、招聘服务的新篇章、为国家技术工匠的招聘与储备提供便利条件。强化服务意识，提供一流的、最完善的服务。我们拥有人性化、制度化、规范化、流程化、标准化的先进管理。我们拥有众多素质高、技术好、业务强的人才和员工队伍。我们拥有自主品牌的产品和自主产品的研发队伍。我们有让银领人才真正实现“一技在手、工作我有。”的坚定目标！"
    };
  }
};
</script>

<style lang="stylus" scoped>
.companyDetail {
  margin: 40px 0 0 70px;
  display: flex;
  flex-direction: row;
  .imgs img {
      padding: 0 0 0 20px;
      width:246px;
      height:auto
  }
}
</style>