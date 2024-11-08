<template>
  <div class="profile-page container mx-auto bg-white p-4 rounded-lg shadow-lg">
    <!-- Cover Photo Section -->
    <div class="cover-photo relative">
      <img
        src="../../../../../public/taylor-swift-inc.webp"
        alt="Cover Photo"
        class="cover-image w-full h-80 object-cover rounded-t-lg"
      />
      <div
        class="avatar-container absolute bottom-[-60px] left-4 flex items-center"
      >
        <img
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          alt="Avatar"
          class="avatar-image w-30 h-30 rounded-full border-4 border-white"
        />
        <h2 class="username text-2xl font-semibold mt-32">User Name</h2>
      </div>
    </div>

    <!-- User Info Section -->
    <div class="user-info mt-16 text-center">
      <div class="flex gap-2 justify-center">
        <el-tag type="primary">Ca hát</el-tag>
        <el-tag type="success">Ảo thuật</el-tag>
        <el-tag type="info">Nhảy múa</el-tag>
      </div>
      <p class="bio text-gray-600">Bằng </p>
      <div class="actions mt-4 space-x-2">
        <el-button type="primary" size="small">Add Friend</el-button>
        <el-button size="small">Message</el-button>
      </div>
    </div>

    <!-- Tabs Section -->
    <el-tabs v-model="activeTab" @tab-click="handleTabClick" class="mt-6">
      <el-tab-pane label="Posts" name="posts">
        <!-- User's Posts -->
        <div v-for="post in posts" :key="post.id" class="post mb-4">
          <el-card>
            <template v-slot:header>
              <div class="post-header flex items-center">
                <img
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  alt="Avatar"
                  class="post-avatar w-10 h-10 rounded-full mr-3"
                />
                <div class="post-info">
                  <span class="post-username font-semibold">User Name</span>
                  <span class="post-date text-gray-500 text-sm">{{
                    post.date
                  }}</span>
                </div>
              </div>
            </template>
            <div class="post-content">{{ post.content }}</div>
          </el-card>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Friends" name="friends">
        <!-- User's Friends List -->
        <el-row :gutter="20">
          <el-col :span="6" v-for="friend in friends" :key="friend.id">
            <el-card>
              <img
                :src="friend.avatar"
                alt="Friend Avatar"
                class="friend-avatar w-full rounded-md"
              />
              <div class="friend-name text-center mt-2">{{ friend.name }}</div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="About" name="about">
        <!-- About User Section -->
        <div class="about-section mt-4">
          <p><strong>Hometown:</strong> City, Country</p>
          <p><strong>Work:</strong> Company</p>
          <p><strong>Education:</strong> University</p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref("posts");
const posts = ref([
  { id: 1, content: "This is the first post.", date: "2024-11-07" },
  { id: 2, content: "Here’s another post.", date: "2024-11-06" },
]);

const friends = ref([
  {
    id: 1,
    name: "Friend 1",
    avatar:
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
  },
  {
    id: 2,
    name: "Friend 2",
    avatar:
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
  },
]);

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
