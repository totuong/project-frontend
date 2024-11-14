<template>
  <div >
    <div class="header flex items-center space-x-2 bg-gray-100 p-4 border-b">
      <Icon icon="mingcute:user-follow-fill" class="text-black" />
      <span class="font-semibold">Shortcut</span>
    </div>
    <el-scrollbar class="p-2">
      <div class="flex items-center space-x-2 py-2">
        <Icon
          icon="clarity:group-solid"
          width="2rem"
          height="2rem"
          style="color: black"
        />
        <span>Group</span>
      </div>
      <div class="flex items-center space-x-2">
        <Icon icon="material-symbols:contract-edit" width="2rem" height="2rem"  style="color: black" />
        <span>Term</span>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>
<style lang="scss" scoped>
.header {
  background-color: #f5f5f5; /* Light gray background */
  padding: 10px 20px; /* Padding for some breathing room */
}
</style>
