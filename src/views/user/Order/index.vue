<template>
  <div class="mx-auto flex flex-col items-center h-full container-parent">
    <div class="w-4/5">
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
        @tab-change="handleChangeTab"
      >
        <Filter v-if="activeName !== 'calender'" class="mb-4" />
        <el-tab-pane
          v-if="userStore.role === 'ARTIST'"
          label="Lịch trình"
          name="calender"
          ><BookingCalender :data="scheduledOrders" />
        </el-tab-pane>
        <el-tab-pane
          v-if="userStore.role === 'ARTIST'"
          label="Danh sách nhận"
          name="artist"
          ><Table
            :tableData="orders"
            :pagination="pagination"
            :loading="loading"
            :type="type"
            @onChangePage="onChangePage"
        /></el-tab-pane>
        <el-tab-pane label="Danh sách gửi" name="user"
          ><Table
            :tableData="orders"
            :pagination="pagination"
            :type="type"
            @on-update="onGetOrders"
            @onChangePage="onChangePage"
        /></el-tab-pane>

        <el-tab-pane
          v-if="userStore.role === 'ARTIST'"
          label="Doanh thu"
          name="revenue"
          ><Revenue v-if="show" :data="showTopValue" :loading="loading" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <ChatBox />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import type { TabPaneName } from "element-plus";

import Filter from "./components/Filter.vue";
import Table from "./components/TableOrder.vue";
import ChatBox from "@/components/ChatBox/index.vue";
import { useOrderHook } from "./hook";
import { useFilterOrderStore } from "@/store/modules/filterOrder";
import useUserStore from "@/store/modules/user";
import Revenue from "./components/Revenue.vue";
import BookingCalender from "./components/BookingCalender.vue";
const userStore = useUserStore();
const {
  onGetOrders,
  onChangePage,
  onChangeType,
  onGetShowTop,
  onGetScheduledOrders,
  orders,
  scheduledOrders,
  loading,
  pagination,
  type,
  showTopValue,
} = useOrderHook();

const firstTag = userStore.role === "USER" ? "user" : "calender";
const activeName = ref(firstTag);
const show = ref(false);

const handleChangeTab = (name: TabPaneName) => {
  if (name === "revenue") {
    show.value = true;
    onGetShowTop();
    return;
  }
  if (name === "calender") {
    onGetScheduledOrders(userStore.profileId);
  } else {
    onChangeType(name);
    show.value = false;
    onGetOrders();
  }
};
const filterOrderStore = useFilterOrderStore();

watch(filterOrderStore, () => {
  onGetOrders();
});

onBeforeMount(() => {
  onChangeType(activeName.value);
  handleChangeTab(activeName.value);
  onGetShowTop();
});
</script>

<style scoped lang="scss">
.container-parent {
  padding: 1rem 2rem 20px 2rem;
  background-color: #f3f9fd;
}
</style>
