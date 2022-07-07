<template>
  <div class="header-container">
    <div class="block">
      <el-dropdown>
        <el-avatar :size="35" :src="circleUrl" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="exitLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";

//头像图片地址
const circleUrl =
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";

const exitLogin = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>
<style lang="scss" scoped>
.header-container {
  .block {
    display: flex;
    justify-content: right;
  }
}
</style>
