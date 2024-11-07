<template>
  <div class="common-layout h-full bg-[#f2f2ee]">
    <el-container class="w-full">
      <SideLeft />
      <div class="flex-auto overflow-y-auto">
        <el-scrollbar class="h-full">
          <Main />
        </el-scrollbar>
      </div> 
      <SideRight />
    </el-container>
  </div>
</template>
<script setup lang="ts">
import Main from "./component/Center/Main.vue";
import SideLeft from "./component/LeftSide/SideLeft.vue";
import SideRight from "./component/RightSide/SideRight.vue";
</script>

<style lang="scss">
.common-layout {
  display: flex;
  height: calc(100vh - 60px);
}

</style>
