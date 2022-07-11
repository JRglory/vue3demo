<template>
  <el-row :gutter="20">
    <el-col :span="16"
      ><div class="grid-content ep-bg-purple" />
      <el-input v-model="goodName" placeholder="请输入要查找的商品"></el-input>
    </el-col>
    <el-col :span="8"
      ><div class="grid-content ep-bg-purple" />
      <el-select
        v-model="selectGoodsValue"
        class="m-2"
        placeholder="选择要查找的商品类型"
        size="middle"
      >
        <el-option
          v-for="item in selectGoodsOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      &nbsp;
      <el-button type="primary">搜索</el-button>
      <el-button type="primary" @click="addNewGood">新建商品</el-button>
    </el-col>
  </el-row>
  <el-table :data="goodsTableData" style="width: 100%">
    <el-table-column label="商品名称" prop="goodsname">
      <template #default="scope">
        <!-- <span>{{ scope.row.goodsname }}</span> -->
        <el-input v-model="scope.row.goodsname"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="商品描述" prop="goodsdescription">
      <template #default="scope">
        <!-- <span>{{ scope.row.goodsdescription }}</span> -->
        <el-input v-model="scope.row.goodsdescription"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="商品价格" prop="goodsprice">
      <template #default="scope">
        <!-- <span>{{ scope.row.goodsprice }}</span> -->
        <el-input v-model="scope.row.goodsprice"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="商品图片" prop="goodsimage">
      <template #default="scope">
        <img
          :src="scope.row.goodsimage"
          alt=""
          style="width: 50px; height: 50px"
        />
      </template>
    </el-table-column>
    <el-table-column label="商品状态" prop="sell">
      <template #default="scope">
        <el-button
          type="success"
          v-if="scope.row.sell == true"
          @click="scope.row.sell = !scope.row.sell"
          >上架</el-button
        >
        <el-button type="error" v-else @click="scope.row.sell = !scope.row.sell"
          >下架</el-button
        >
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #default="scope">
        <el-button
          size="small"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <Pagination :total="pageAbout?.total" :pageSize="pageAbout?.size" />
</template>
<script lang="ts" setup>
import {
  searchGoods,
  deleteGoods,
  updateGoods,
  createGoods,
} from "@/api/goodsAbout";
import { ref, computed, onMounted, reactive } from "vue";
import Pagination from "@/components/Pagination.vue";
import { ElMessage } from "element-plus";
import type {
  SearchGoodsList,
  PageAbout,
  CreateGoods,
} from "@/type/goodsAbout";
import type { GoodsInformation } from "@/type/userAbout";
//选择商品的类型（下架，上架，全部）
let selectGoodsValue = ref();
const selectGoodsOptions = [
  {
    value: "all",
    label: "全部",
  },
  {
    value: "true",
    label: "上架",
  },
  {
    value: "false",
    label: "下架",
  },
];
//新建商品信息列表
let addGoodList: CreateGoods = {
  goodsName: "",
  goodsDescription: "",
  goodsImage: "",
  goodsPrice: 123,
};
//搜索商品列表
let searchGoodsList: SearchGoodsList = {
  page: 1,
  size: 20,
  sellFlag: true,
  search: "",
};
const token = localStorage.getItem("token");
//要搜索的商品名称
const goodName = ref("");
const pageAbout = ref<PageAbout>();
//处理编辑操作
const handleEdit = async (index: number, row: GoodsInformation) => {
  let result = await updateGoods(
    localStorage.getItem("token")!,
    { goodsPrice: row.goodsprice, sell: row.sell },
    row.goodsname
  );
  if (result.status == 200) {
    if (result.data.message == "success") {
      ElMessage({
        type: "success",
        message: "编辑商品成功",
      });
    } else {
      if (result.data.errors.datas[0].message == "商品不存在") {
        ElMessage({
          type: "error",
          message: "商品不存在",
        });
      }
      if (result.data.errors.datas[0].message == "修改失败，稍后再试") {
        ElMessage({
          type: "error",
          message: "修改失败，稍后再试",
        });
      }
      if (result.data.errors.datas[0].message == "token异常") {
        ElMessage({
          type: "error",
          message: "token异常",
        });
      }
    }
  }
};
//处理删除操作
const handleDelete = async (index: number, id: string) => {
  let result = await deleteGoods(localStorage.getItem("token")!, id);
  if (result.status == 200) {
    if (result.data.message == "success") {
      ElMessage({
        type: "success",
        message: "删除商品成功",
      });
    } else {
      if (result.data.errors.datas[0].message == "商品不存在") {
        ElMessage({
          type: "error",
          message: "商品不存在",
        });
      }
      if (result.data.errors.datas[0].message == "删除商品失败，稍后再试") {
        ElMessage({
          type: "error",
          message: "删除商品失败，稍后再试",
        });
      }
      if (result.data.errors.datas[0].message == "token异常") {
        ElMessage({
          type: "error",
          message: "token异常",
        });
      }
    }
  }
};
//获取的商品列表
let goodsTableData = ref<GoodsInformation[]>();
//获取商品信息
const getGoodsInformation = async () => {
  let result = await searchGoods(token!, searchGoodsList);
  if (result.status == 200) {
    goodsTableData.value = result.data.result.data;
    pageAbout.value = result.data.page;
  } else {
    if (result.data.errors.datas[0].message == "token异常") {
      ElMessage({
        type: "error",
        message: "token异常",
      });
    }
  }
};
//创建商品操作
const addNewGood = async () => {
  let result = await createGoods(token!, addGoodList);
  if (result.status == 200) {
    if (result.data.message == "success") {
      ElMessage({
        type: "success",
        message: "创建商品成功",
      });
    } else {
      if (result.data.errors.datas[0].message == "创建商品失败，稍后再试") {
        ElMessage({
          type: "error",
          message: "创建商品失败，稍后再试",
        });
      }
      if (result.data.errors.datas[0].code == 401) {
        ElMessage({
          type: "error",
          message: "token异常",
        });
      }
    }
  } else {
    ElMessage({
      type: "error",
      message: "创建商品失败",
    });
  }
};
onMounted(() => {
  getGoodsInformation();
});
</script>
<style lang="scss" scoped></style>
