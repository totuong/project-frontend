<template>
  <div class="mx-auto flex flex-col items-center h-full container-parent">
    <div class="w-4/5">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <Filter class="mb-4" />
        <el-tab-pane label="Danh sách đơn" name="first"
          ><Table :table="tableOrders" @onChangePage="onChangePage"
        /></el-tab-pane>
        <el-tab-pane label="Doanh thu" name="second">Doanh thu</el-tab-pane>
      </el-tabs>
    </div>
    <ChatBox />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import type { TabsPaneContext } from "element-plus";

import Filter from "./components/Filter.vue";
import Table from "./components/TableOrder.vue";
import ChatBox from "@/components/ChatBox/index.vue";

import { useFilterOrderStore } from "@/store/modules/filterOrder";

const activeName = ref("first");
const state = ref();
// const state = reactive<StateType>({
//       table: {
//         data: [],
//         loading: true
//       },
//       query: {
//         ...filter,
//         page: 0,
//         limit: PAGE_SIZE
//       },
//       pagination: {
//         total: 0
//       }
//     })

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
const filterOrderStore = useFilterOrderStore();

const tableOrders = ref(null);
const getOrders = () => {
  console.log("get api");
};
const onChangePage = (val: number) => {
  state.value.query.page = val - 1;
};
watch(filterOrderStore, () => {
  console.log("🚀 ~ watch ~ filterOrderStore:", filterOrderStore);
});
</script>

<style scoped lang="scss">
.container-parent {
  padding: 1rem 2rem 20px 2rem;
  background-color: #f3f9fd;
}
</style>
