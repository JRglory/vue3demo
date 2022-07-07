<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16"
        ><div class="grid-content ep-bg-purple" />
        <el-input
          v-model="goodName"
          placeholder="请输入要查找的商品"
        ></el-input>
      </el-col>
      <el-col :span="8"
        ><div class="grid-content ep-bg-purple" />
        <el-button type="primary">搜索</el-button>
      </el-col>
    </el-row>
    <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="Date" prop="date" />
    <el-table-column label="Name" prop="name" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="搜索商品名" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script lang="ts" setup>
import { ref,computed } from "vue";

//User数据接口
interface User {
  date: string;
  name: string;
  address: string;
}
let goodName = ref(""); //商品名称
const search = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const tableData: User[] = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "John",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Morgan",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>
<style lang="scss" scoped></style>
