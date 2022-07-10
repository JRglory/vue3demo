<template>
  <div class="form-container">
    <!-- 登录表单 -->
    <el-form
      v-if="isLogin"
      ref="loginFormRef"
      :model="loginForm"
      status-icon
      :rules="loginRules"
      label-width="120px"
      class="demo-loginForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitLoginForm(loginFormRef)"
          >登录</el-button
        >
      </el-form-item>
      <div class="loginFormText">
        <span @click="changeForm" class="text-container"
          >还没有账号？点击注册</span
        >
      </div>
    </el-form>
    <!-- 注册表单 -->
    <el-form
      v-if="!isLogin"
      ref="registerFormRef"
      :model="registerForm"
      status-icon
      :rules="registerRules"
      label-width="120px"
      class="demo-registerForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="registerForm.username"
          type="text"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          v-model="registerForm.pass"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          v-model="registerForm.checkPass"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitRegisterForm(registerFormRef)"
          >注册</el-button
        >
      </el-form-item>
      <div class="registerFormText">
        <span @click="changeForm" class="text-container"
          >已有账号？点击登录</span
        >
      </div>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { userLogin, userRegister } from "@/api/userAbout";
import { ElMessage } from "element-plus";
import router from "@/router";
//是否显示登陆表单
let isLogin = ref(true);
const loginFormRef = ref<FormInstance>();
const registerFormRef = ref<FormInstance>();
//登录表单密码校验
const loginPasswordPass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码！"));
  } else {
    if (loginForm.password !== "") {
      if (!loginFormRef.value) return;
      loginFormRef.value.validateField("password", () => null);
    }
    callback();
  }
};
//登录页面表单
const loginForm = reactive({
  username: "",
  password: "",
});
//登录表单校验规则
const loginRules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 10, message: "用户名长度为3-10个字符", trigger: "blur" },
  ],
  password: [{ validator: loginPasswordPass, required: true, trigger: "blur" }],
});
//登录表单提交
const submitLoginForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      let result = await userLogin(loginForm);
      if (result.data.message == "success") {
        ElMessage({
          type: "success",
          message: "登录成功",
        });
        localStorage.setItem("token", result.data.result.token);
        router.push("addOrDeleteGoods");
      } else {
        if (result.data.errors.datas[0].message == "账号不存在") {
          ElMessage({
            type: "error",
            message: "账号不存在",
          });
        }
        if(result.data.errors.data[0].message == "账号或密码不正确"){
          ElMessage({
            type:"error",
            message:"账号或密码不正确"
          })
        }
      }
    } else {
      ElMessage({
        type: "error",
        message: "登录失败",
      });
      return false;
    }
  });
};
//注册密码验证
const registerPasswordPass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (registerForm.checkPass !== "") {
      if (!registerFormRef.value) return;
      registerFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
//注册确认密码验证
const registerPassword2Pass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== registerForm.pass) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};
//注册表单
const registerForm = reactive({
  username: "",
  pass: "",
  checkPass: "",
});
//注册表单校验规则
const registerRules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 10, message: "用户名长度为3-10个字符", trigger: "blur" },
  ],
  pass: [{ validator: registerPasswordPass, required: true, trigger: "blur" }],
  checkPass: [
    { validator: registerPassword2Pass2, required: true, trigger: "blur" },
  ],
});
//提交注册表单
const submitRegisterForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      let result = await userRegister(registerForm);
      if (result.data.message == "success") {
        ElMessage({
          type: "success",
          message: "注册成功，请登录",
        });
        isLogin.value = !isLogin.value;
      }else{
        if(result.data.model == "errors"){
          ElMessage({
            type:"error",
            message:"账号已经被使用"
          })
        }
      }
    } else {
      ElMessage({
        type:"error",
        message:"注册失败"
      })
      return false;
    }
  });
};
//切换登录和注册表单
const changeForm = () => {
  isLogin.value = !isLogin.value;
};
</script>
<style lang="scss" scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .loginFormText {
    position: relative;
    .text-container {
      position: absolute;
      left: 80px;
    }
  }
  .registerFormText {
    position: relative;
    .text-container {
      position: absolute;
      left: 80px;
    }
  }
}
</style>
