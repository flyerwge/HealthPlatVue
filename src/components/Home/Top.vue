<template>
  <!-- 头部 -->
  <div class="top">
    <div class="top-logo">
      <img src="../../assets/img/flyer.png" alt="" />
      <div class="top-logo-title">
        <span>个人运动平台</span>
      </div>
    </div>
    <el-button type="info" @click="btnLogout()">安全退出</el-button>
  </div>
</template>

<script>
export default {
  name: "top",
  methods: {
    btnLogout() {
      window.sessionStorage.clear(); //清除session信息
      this.$router.push("/login"); //回到登录页
    },
  },
};
</script>

<style>
.top {
  background-color: #373d41;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  color: #fff;
  align-items: center;
}

.top-logo-title {
  padding-left: 80px;
  position: absolute;
}

.top-logo {
  /* cursor: pointer; */
  display: flex;
  /* position: relative; */
  height: 100%;
  /* line-height: 100%; */
  align-items: center;
  left: 20px;
}

.top-logo img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.top el-button {
  align-items: center;
}
</style>