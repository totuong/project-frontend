<template>
  <div class="mx-auto flex flex-col items-center h-full container-parent">
    <div class="w-4/5">
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
        @tab-change="handleChangeTab"
      >
        <Filter class="mb-4" />
        <el-tab-pane label="Danh sách gửi" name="user"
          ><Table
            :tableData="orders"
            :loading="loading"
            :type="type"
            :pagination="pagination"
            @onChangePage="onChangePage"
        /></el-tab-pane>
        <el-tab-pane label="Danh sách nhận" name="artist"
          ><Table
            :tableData="orders"
            :loading="loading"
            :type="type"
            :pagination="pagination"
            @onChangePage="onChangePage"
        /></el-tab-pane>
        <el-tab-pane label="Doanh thu" name="second">Doanh thu</el-tab-pane>
      </el-tabs>
    </div>
    <ChatBox />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, watch } from "vue";
import type { TabPaneName } from "element-plus";

import Filter from "./components/Filter.vue";
import Table from "./components/TableOrder.vue";
import ChatBox from "@/components/ChatBox/index.vue";
import { useOrderHook } from "./hook";
import { useFilterOrderStore } from "@/store/modules/filterOrder";
import useUserStore from "@/store/modules/user";
const userStore = useUserStore();
const {
  onGetOrders,
  onChangePage,
  onChangeType,
  orders,
  loading,
  pagination,
  type,
} = useOrderHook();

const activeName = computed(() => {
  return userStore.role === "USER" ? "user" : "artist";
});

const handleChangeTab = (name: TabPaneName) => {
  if (name !== "user" && name !== "artist") return;
  onChangeType(name); // Sử dụng tab.name thay vì tabName

  onGetOrders();
};
const filterOrderStore = useFilterOrderStore();

watch(filterOrderStore, () => {
  onGetOrders();
});

onBeforeMount(() => {
  onChangeType(activeName.value);
  onGetOrders();
});
</script>

<style scoped lang="scss">
.container-parent {
  padding: 1rem 2rem 20px 2rem;
  background-color: #f3f9fd;
}
</style>
