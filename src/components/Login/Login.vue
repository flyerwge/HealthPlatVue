<template>
  <div class="login">
    <!-- 登录块 -->
    <div class="login-box">
      <!-- 头像 -->
      <div class="login-box-img">
        <img class="img-head" src="../../assets/img/logo.png" />
      </div>

      <!-- 表单区域 -->
      <div class="login-box-form">
        <el-form ref="loginForm" :rules="loginRules" :model="loginForm">
          <!-- 用户名 -->
          <el-form-item prop="userName">
            <el-input
              v-model="loginForm.userName"
              placeholder="请输入用户名"
              prefix-icon="iconfont icon-yonghu"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              prefix-icon="iconfont icon-icon-mima"
              type="password"
            ></el-input>
          </el-form-item>
          <!-- 登录按钮 -->
          <el-form-item class="login-box-form-btn">
            <el-button type="primary" @click="btnLogin('loginForm')"
              >登录</el-button
            >
            <el-button type="info" @click="buttonRegister()">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   表单数据对象
      loginForm: {
        userName: "admin",
        password: "123456",
      },
      //   数据校验规则
      loginRules: {
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
    //  注册
    buttonRegister() {
      this.$router.push("/register");
    },
    // 登录
    btnLogin(formName) {
      // 验证校验规则
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        // 访问后台
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.flag) {
          this.$message({
            type: "success",
            message: "登录成功",
            showClose: true,
          });
          //   页面路由跳转
          this.$router.push({ path: "/home" });

          window.sessionStorage.setItem("userQuery", res.userQuery);
          // console.log(userQuery);
        } else {
          this.$message({
            type: "error",
            message: "登录失败",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  background-color: #28283e;
  height: 100%;
}

.login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login-box-img {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 0 2px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #eee;
}

.img-head {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.login-box-form {
  position: absolute;
  bottom: 10%;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.login-box-form-btn {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -30%);
}
</style>