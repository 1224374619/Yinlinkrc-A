<template>
  <div id="app">
    <customized-nav class="nav" v-if="this.$store.state.hasLogin"/>
    <router-view />
    <customized-footer v-if="this.$store.state.hasLogin"/>
  </div>
</template>

<script>
import CustomizedFooter from "components/customized-footer.vue";
import CustomizedNav from "components/customized-nav.vue";
export default {
  name: "",
  data(){
      return {
      }
  },
  components: {
    CustomizedFooter,
    CustomizedNav
    // PasswordInput
  },
  // methods:{
  //     //是否显示头部
  //     header:function (bool) {
  //       this.header_show = bool;
  //     },
  //     //是否显示底部
  //     footer:function (bool) {
  //         this.footer_show = bool;
  //     }
  // }
};
</script>
<style>

@import "./common/font/font.css";

html, body {
  margin: 0;   
  height: 100%;
  background-color: #f0f0f0
}
#app {
  height:100%;
  min-width:1280px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background:#ffffff
}
</style>
