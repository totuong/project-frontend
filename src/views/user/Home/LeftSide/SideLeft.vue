<template>
  <div >
    <el-aside class="h-full border-r ">
      <div class="flex-1 w-full">
        <NotificationLeft />
      </div>
      <div class="flex-3 w-full">
        <Follower />
      </div>
      <div class="flex-1 w-full">
        <Shortcut />
      </div>
    </el-aside>
  </div>
</template>
<script setup lang="ts">
import Follower from "./Follower.vue";
import NotificationLeft from "./NotificationLeft.vue";
import Shortcut from "./Shortcut.vue";
</script>
<style lang="scss">

.el-aside{
  max-width: 400px;
  min-width: 360px;

}
</style>
