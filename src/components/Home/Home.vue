<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <top></top>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <left></left>
      </el-aside>
      <el-container>
        <!-- 主体 -->
        <el-main>
          <router-view></router-view>
          <!-- <middle></middle> -->
        </el-main>
        <!-- 底部 -->
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Top from "./Top.vue";
import Left from "./Left.vue";
import Middle from "./Middle.vue";
import Bus from "../Utils/bus.js";

export default {
  name: "home",

  data() {
    return {
      isCollapse: false,
    };
  },

  components: {
    Top,
    Left,
    Middle,
  },

  created() {},

  mounted() {
    Bus.$on("isCollapse", (data) => {
      this.isCollapse = data;
    });
  },
};
</script>

<style>
.el-header {
  background-color: #373d41;
}

.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}

.home-container {
  height: 100%;
}
</style>