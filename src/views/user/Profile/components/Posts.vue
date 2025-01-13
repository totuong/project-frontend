<template>
  <div class="posts">
    <div class="post" v-for="(post, index) in posts" :key="index">
      <Post :data="post" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount } from "vue";
import Post from "@/components/Post/index.vue";
import { usePostHook } from "../../Home/hookPost";
import useUserStore from "@/store/modules/user";


const { onGetPosts, posts } = usePostHook();
onBeforeMount(() => {
  onGetPosts(useUserStore().profileCode);
});

</script>
<style lang="scss"></style>
