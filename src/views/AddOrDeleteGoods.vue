<template>
  <el-row :gutter="20">
    <el-col :span="16"
      ><div class="grid-content ep-bg-purple" />
      <el-input v-model="goodName" placeholder="请输入要查找的商品"></el-input>
    </el-col>
    <el-col :span="8"
      ><div class="grid-content ep-bg-purple" />
      <el-button type="primary">搜索</el-button>
      <el-button type="primary">新建商品</el-button>
    </el-col>
  </el-row>
  <el-table :data="goodsTableData" style="width: 100%">
    <el-table-column label="商品名称" prop="goodsname" />
    <el-table-column label="商品描述" prop="goodsdescription" />
    <el-table-column label="商品价格" prop="goodsprice" />
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
        <el-button type="success" v-if="scope.row.sell == true">上架</el-button>
        <el-button type="error" v-else>下架</el-button>
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
import { searchGoods, deleteGoods, updateGoods } from "@/api/goodsAbout";
import { ref, computed, onMounted, reactive } from "vue";
import Pagination from "@/components/Pagination.vue";
import { ElMessage } from "element-plus";
import type { SearchGoodsList, PageAbout } from "@/type/goodsAbout";
import type { GoodsInformation } from "@/type/userAbout";

let searchGoodsList: SearchGoodsList = {
  page: 1,
  size: 20,
  sellFlag: true,
  search: "商品",
};
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
    }
  }
};
//处理删除操作
const handleDelete = async (index: number, row: GoodsInformation) => {
  let result = await deleteGoods(localStorage.getItem("token")!, row.goodsname);
  if (result.status == 200) {
    if (result.data.message == "success") {
      ElMessage({
        type: "success",
        message: "删除商品成功",
      });
    }
  }
};
//获取的商品列表
let goodsTableData = ref<GoodsInformation[]>();
//获取商品信息
const getGoodsInformation = async () => {
  let result = await searchGoods(
    localStorage.getItem("token")!,
    searchGoodsList
  );
  if (result.status == 200) {
    goodsTableData.value = result.data.result.data;
    pageAbout.value = result.data.page;
  }
};
onMounted(() => {
  getGoodsInformation();
});
</script>
<style lang="scss" scoped></style>
