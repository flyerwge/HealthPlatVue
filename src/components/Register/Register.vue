<template>
  <div class="register">
    <div class="register-box">
      <el-form :ref="registerForm" :rules="registerRules" :model="registerForm">
        <el-form-item>
          <el-input
            v-model="registerForm.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="registerForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="registerForm.email"
            placeholder="邮箱地址"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="btnRegisterFirst('registerForm')"
          >立即注册</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        userName: "",
        password: "",
        email: "",
      },

      registerRules: {
        userName: [
          { required: true, message: "用户名为必填项", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "用户密码为必填项", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3~10个字符", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    btnRegisterFirst(registerForm) {
      this.$refs[registerForm].validate(async (valid) => {
        if (valid) {
        }
      });
    },
  },
};
</script>

<style>
.register {
  background-color: #28283e;
  height: 100%;
}
.register-box {
  width: 400px;
  height: 450px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>