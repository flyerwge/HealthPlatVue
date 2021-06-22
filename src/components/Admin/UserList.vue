<template>
  <div class="user">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 用户列表主体部分 -->
    <el-card>
      <el-row :gutter="25">
        <!-- 搜索区域 -->
        <el-col :span="10">
          <el-input
            placeholder="请输入搜索内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList()"
            @keyup.enter.native="getUserList()"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList()"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <el-table :data="userList" stripe style="width: 100%">
        <!-- 索引列 -->
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="userName" label="用户名" width="100">
        </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="password" label="密码"> </el-table-column>
        <el-table-column prop="state" label="状态">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              @change="userStateChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!-- 时间需要修改，Json数据中的时间可能是相对原点的时间 -->
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column prop="updateTime" label="更新时间"> </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteUser(scope.row.id)"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="分配权限"
              placement="top-start"
            ></el-tooltip>
            <!-- 设置按钮 -->
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <!-- size-change:每页最大变化数 -->
      <!-- current-change：当前页面变化数 -->
      <!-- layout：功能组件 -->
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[1, 2, 5, 100]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>

    <!-- 新增用户区域 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClose"
    >
      <el-form
        :model="addForm"
        :rules="addUserRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户区域 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClose"
    >
      <el-form
        :model="editForm"
        :rules="editUserRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="editForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "userListPage",

  data() {
    return {
      // 查询信息实体
      queryInfo: {
        query: "", //查询信息
        pageNum: 1, //当前页
        pageSize: 5, //每页最大数
      },

      userList: [], //用户列表
      total: 0, //总记录数

      addDialogVisible: false, //对话框状态
      // 添加表单信息
      addForm: {
        userName: "",
        password: "",
        email: "",
      },

      // 修改用户信息
      editForm: {},
      // 显示/隐藏用户栏
      editDialogVisible: false,

      // 添加表单验证
      addUserRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3~10个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 3, max: 20, message: "请输入正确的邮箱", trigger: "blur" },
        ],
      },

      // 修改表单验证
      editUserRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3~10个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 3, max: 20, message: "请输入正确的邮箱", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    this.getUserList();
  },

  methods: {
    //   获取所有用户
    async getUserList() {
      // 如果没有await,则无法读取JSON字符串
      const { data: res } = await this.$http.get("alluser", {
        params: this.queryInfo,
      });

      this.userList = res.userList;
      console.log(this.userList);
      this.total = res.userCounts;
    },

    // 最大数
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getUserList();
    },

    // pageNum的触发动作
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getUserList();
    },

    // 修改用户状态
    async userStateChange(userInfo) {
      const { data: res } = await this.$http.put(
        `userstate?id=${userInfo.id}&state=${userInfo.state}`
      );

      if (res != "success") {
        userInfo.id = !userInfo.id;
        return this.$message.error("操作失败！！！");
      }
      this.$message.success("操作成功！！！");
    },
    // 监听添加用户操作
    addDialogClose() {
      this.$refs.addFormRef.resetFields();
    },

    // 添加用户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("adduser", this.addForm);
        if (res != "success") {
          return this.$message.error("操作失败！！！");
        }
        this.$message.success("操作成功！！！");
        this.addDialogVisible = false;
        this.getUserList();
      });
    },

    // 删除用户
    async deleteUser(id) {
      console.log(id);
      const confirmResult = await this.$confirm("是否删除文件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err);
      if (confirmResult != "confirm") {
        return this.$message.info("已取消删除");
      }

      const { data: res } = await this.$http.delete("deleteuser?id=" + id);
      if (res != "success") {
        return this.$message.error("删除失败！");
      }

      this.$message.success("删除成功");
      this.getUserList();
    },

    // 显示修改用户信息对话框
    async showEditDialog(id) {
      const { data: res } = await this.$http.get("getupdateuser?id=" + id);
      this.editForm = res;
      this.editDialogVisible = true;
    },

    // 关闭修改用户信息对话框
    editDialogClose() {
      this.$refs.editFormRef.resetFields();
    },

    // 确认修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) {
          return;
        }
        // 发起修改请求
        const { data: res } = await this.$http.post("edituser", this.editForm);
        if (res != "success") {
          return this.$message.error("用户信息修改失败！！！");
        }
        this.$message.success("用户信息修改成功！！！");
        this.editDialogVisible = false;
        this.getUserList();
      });
    },
  },
};
</script>

<style>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 17px;
}
</style>