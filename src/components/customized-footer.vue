<template>
  <div class="footer">
    <template v-if="!showSimple">
      <div class="appendix">
        <div>
          <span class="title">银领人才网</span>
          <div class="content">
            <p>银领人才网是上海银领网络科技有限公司旗下的致力于“银领人才”（现代高技能人才）招聘的专业网站。在 5G 时代到来之际，银领人才网依托互联网 PC 端+移动端以及人工智能和大数据打造全新的 5G 时代专业招聘网站，为“既动手又动脑”的银领人才求职提供多维度、精准化的招聘服务，为中国智能制造，制造业强国提供高技能人才的支撑！让银领人才真正实现“一技在手、工作我有！</p>
          </div>
        </div>
        <div>
          <span class="title">联系方式</span>
          <div class="content">
            <ul>
              <li>邮编：200436</li>
              <li>联系电话：021-56057115</li>
              <li>邮箱：Nicole.yin@yinlinkrc.com</li>
              <li>地址：上海市静安区江场三路26、28号207室</li>
            </ul>
          </div>
        </div>
        <div>
          <span class="title">使用与帮助</span>
          <div class="content">
            <ul>
              <li>企业介绍</li>
              <li>投诉建议</li>
              <li>用户协议</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="copyright homepage">
        <p>Copyright © 2019 (银领人才网) | 沪ICP备19030136号-1 | <img style="height:15px;margin:0 5px 0 0" :src="require('../assets/images/guo.png')" /><a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010602005194">沪公网安备 31010602005194号</a></p>
      </div>
    </template>
    <div :class="{ 'copyright': true, 'landing-page': isLandingPage }" v-else>
      <p>Copyright © 2019 (银领人才网) | 沪ICP备19030136号-1 |  <img style="height:15px;margin:0 5px 0 0" :src="require('../assets/images/guo.png')" /><a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010602005194">沪公网安备 31010602005194号</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'customized-footer',
  props: {
    showSimple: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      
    }
  },
  methods: {
    introduce(id) {
      this.$router.push({ path: "/aboutus/"+ id});
    },
    introduceXy() {
      this.$router.push({ path: "/user-license" });
    }
  },
}
</script>

<style lang="stylus" scoped>
  .footer
    width 100%
    background-color #6f6f6f
    .appendix
      display flex
      width 1280px
      margin auto
      color white
      padding 40px 0
      flex-direction row
      justify-content space-between
      div
        margin-right 30px
        text-align left
        span.title
          font-size 16px
          font-weight 500
        .content
          opacity .5
          font-size 14px
          p
            max-width 350px
          ul
            list-style-type none
            padding 0
            text-align left
            li
              margin 10px 0
    .copyright
      font-size 14px
      color #b7b7b7
      padding 10px 0
      margin auto
      text-align center
      background-color #f0f0f0
      a
        color inherit
        text-decoration none
      p
        margin 10px 0

      &.homepage
        background-color #6f6f6f
        color white
        opacity .5
      &.landing-page
        background-color #a3292e
        color white
</style>

