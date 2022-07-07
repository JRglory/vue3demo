<template>
  <el-container class="container">
    <el-aside width="200px" style="height: 100%">
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="toAddDeleteGoodsRoute">
          <el-icon><icon-menu /></el-icon>
          <span>添加删除商品</span>
        </el-menu-item>
        <el-menu-item index="2" @click="toUpdateRoute">
          <el-icon><document /></el-icon>
          <span>修改商品属性</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-card><Header /></el-card>
      </el-header>
      <el-main>
        <el-card style="width: 100%; height: 100%">
          <router-view></router-view>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import {
  Menu as IconMenu,
  Message,
  Setting,
  Document,
} from "@element-plus/icons-vue";
import router from "@/router";
//跳转添加删除商品页面
const toAddDeleteGoodsRoute = () => {
  router.push("addOrDeleteGoods");
};
//跳转修改商品属性页面
const toUpdateRoute = () => {
  router.push("updateProperty");
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
