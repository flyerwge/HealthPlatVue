<template>
  <div class="aside">
    <button class="aside-toggle-button" @click="btnToggleColl()">|||</button>
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#409eff"
      unique-opened=""
      :collapse="isCollapse"
      :collapse-transition="false"
      :router="true"
      :default-active="activePath"
    >
      <!-- 一级菜单 -->
      <el-submenu v-for="item in menuList" :key="item.id" :index="item.id + ''">
        <template slot="title">
          <i class="iconfont icon-yundong"></i>
          <span>{{ item.title }}</span>
        </template>

        <!-- 二级菜单 -->
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item
            v-for="itemChild in item.subMenuList"
            :key="itemChild.id"
            :index="itemChild.path"
            @click="saveNavState(itemChild.path)"
            >{{ itemChild.title }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Bus from "../Utils/bus.js";
export default {
  name: "left",

  data() {
    return {
      // 菜单列表
      menuList: [],
      isCollapse: false,
      activePath: "/middle",
    };
  },

  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath"); //取出session里的path，动态修改
  },

  methods: {
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (!res.flag) {
        return this.$message.console.error("获取列表失败！！！");
      } else {
        this.menuList = res.menus;
        // console.log(this.menuList);
      }
    },

    btnToggleColl() {
      this.isCollapse = !this.isCollapse;
      Bus.$emit("isCollapse", this.isCollapse);
    },

    // 保存路径
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
};
</script>

<style>
.aside {
  height: 100%;
  width: 100%;
}

.aside .el-menu {
  border: none;
}

.aside-toggle-button {
  width: 100%;
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  /* 显示小手 */
  cursor: pointer;
}
</style>