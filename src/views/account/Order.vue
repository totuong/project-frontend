<template>
  <div class="mx-auto flex flex-col items-center bg-cyan-900 h-full">
    <div class="w-4/5 ">
      <Filter class="mb-4" />
      <Table :table="tableOrders" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";

import Filter from "./Filter.vue";
import Table from "./TableOrder.vue";

import { useFilterOrderStore } from "@/store/modules/filterOrder";
const filterOrderStore = useFilterOrderStore();

const tableOrders = ref(null);
const getOrders = () => {
  console.log("get api");
};
watch(filterOrderStore, () => {
  console.log("🚀 ~ watch ~ filterOrderStore:", filterOrderStore);
});
</script>

<style scoped lang="scss"></style>
