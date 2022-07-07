<template>
  <div>
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="props.pageSize"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="props.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps(["total", "pageSize"]);
const currentPage = ref(1);
// const pageSize = ref(10);
const small = ref(false);
const disabled = ref(false);
const background = ref(false);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>
<style lang="scss" scoped></style>
