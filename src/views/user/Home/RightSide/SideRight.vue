<template>
  <div>
    <el-aside class="h-full border-l">
      <TopRanking />
      <SuggestFriend />
      <Contact />
    </el-aside>
  </div>
</template>

<script setup lang="ts">
import TopRanking from "./TopRanking.vue";
import SuggestFriend from "./SuggestFriend.vue";
import Contact from "./Contact.vue";
</script>

<style lang="scss">
.contact-item,
.profile-item {
  background-color: #ffffff; /* White background */
  border-radius: 20px; /* Rounded corners */
  padding: 8px; /* Padding inside the item */
  margin-bottom: 4px; /* Space between items */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}
.el-aside {
  max-width: 400px;
  min-width: 360px;
}
</style>
