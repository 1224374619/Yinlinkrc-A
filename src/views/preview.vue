<template></template>

<script>
export default {
  data() {
    return {
      obj: {}
    };
  },
  methods: {
    aliyu() {
      let label = "resume-file";
      this.$http
        .post(`/file-service/files/getPreviewUrl/?label=${label}`, this.obj)
        .then(res => {
          console.log(res);
          let demo = aliyun.config({
            url: res.data.data.previewURL, //设置文档预览URL地址。
            mount: document.querySelector("#container")
          });
          console.log(demo);
          //设置AccessToken。
          demo.setToken({ token: res.data.data.accessToken });
        })
        .catch(error => {});
    }
  },
  created() {
    var list = decodeURIComponent(this.$route.query.obj);
    this.obj = JSON.parse(list);
    this.aliyu();
  }
};
</script>
