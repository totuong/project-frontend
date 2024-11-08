<template>
  <div class="profile-page container mx-auto bg-white p-4 rounded-lg shadow-lg">
    <Bio />
    <el-tabs v-model="activeTab" @tab-click="handleTabClick" class="mt-6">
      <el-tab-pane label="Posts" name="posts">
        <Posts />
      </el-tab-pane>

      <el-tab-pane label="Friends" name="friends">
        <Friend />
      </el-tab-pane>

      <el-tab-pane label="About" name="about">
        <About />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Bio from "./Bio.vue";
import Friend from "./Friend.vue";
import About from "./About.vue";
import Posts from "./Posts.vue";

const activeTab = ref("posts");

const handleTabClick = (tab: any) => {
  console.log("Selected tab:", tab.label);
};
</script>

<style lang="scss" scoped>
.profile-page {
  max-width: 80%;
  width: 100%;

  .cover-photo {
    position: relative;

    .cover-image {
      object-fit: cover;
    }

    .avatar {
      .avatar-image {
        border: 4px solid white;
      }
    }
  }

  .user-info {
    margin-top: 60px;

    .username {
      font-size: 24px;
      font-weight: bold;
    }
    .bio {
      color: gray;
    }
  }

  .post {
    margin-top: 20px;
  }

  .post-header {
    .post-avatar {
      margin-right: 10px;
    }
  }

  .friend-avatar {
    border-radius: 8px;
  }

  .about-section {
    p {
      margin: 5px 0;
    }
  }
}
</style>
