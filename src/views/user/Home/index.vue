<template>
  <div class="common-layout h-full bg-[#f2f2ee]">
    <el-container class="w-full">
      <SideLeft class="side-left" />
      <div class="flex-auto overflow-y-auto">
        <el-scrollbar class="h-full">
          <Main />
        </el-scrollbar>
      </div>
      <SideRight class="side-right" />
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Main from "./Center/Main.vue";
import SideLeft from "./LeftSide/SideLeft.vue";
import SideRight from "./RightSide/SideRight.vue";
</script>

<style lang="scss" scoped>
.common-layout {
  display: flex;
  height: calc(100vh - 60px);
}
.side-left {
  display: block;
}

.side-right {
  display: block;
}

/* Hide SideLeft on smaller screens */
@media (max-width: 1280px) {
  .side-left {
    display: none;
  }
}

/* Hide both SideLeft and SideRight on extra-small screens */
@media (max-width: 968px) {
  .side-left,
  .side-right {
    display: none;
  }
}
</style>
