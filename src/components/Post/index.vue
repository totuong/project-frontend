<template>
  <div
    class="post bg-slate-50 px-4 py-2 mb-4 shadow-md rounded relative w-full h-auto"
  >
    <div class="post-header flex items-center mb-1">
      <el-popover
        :width="300"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
      >
        <template #reference>
          <button><el-avatar :src="data.avatar" size="large" /></button>
        </template>
        <template #default>
          <div
            class="demo-rich-conent"
            style="display: flex; gap: 16px; flex-direction: column"
          >
            <button>
              <el-avatar
                :size="60"
                :src="data.avatar"
                style="margin-bottom: 8px"
              />
            </button>

            <div>
              <p
                class="demo-rich-content__name"
                style="margin: 0; font-weight: 500"
              >
                {{ data.userName }}
              </p>
              <p
                class="demo-rich-content__mention"
                style="margin: 0; font-size: 14px; color: var(--el-color-info)"
              >
                @element-plus
              </p>
            </div>

            <p class="demo-rich-content__desc" style="margin: 0">
              Element Plus, a Vue 3 based component library for developers,
              designers and product managers
            </p>
          </div>
        </template>
      </el-popover>

      <div class="ml-2 flex flex-col">
        <button>
          <div class="font-semibold">{{ data.userName }}</div>
        </button>
        <el-tooltip class="box-item" effect="dark" placement="bottom">
          <template #content>
            {{ data.timestamp }}
          </template>
          <button>
            <div class="text-gray-500 text-sm pl-1">{{ data.timestamp }}</div>
          </button>
        </el-tooltip>
      </div>
    </div>
    <div class="post-content mb-2">
      {{ data.content }}
    </div>
    <div class="post-media mb-2">
      <!-- Example image/video -->
      <img
        :src="data.media"
        alt="Post media"
        class="w-full rounded object-cover h-72"
      />
    </div>
    <div class="post-stats flex justify-between mb-2 text-gray-500 text-sm">
      <div>{{ data.likes }} Likes</div>
      <div>{{ data.comments.length }} Comments</div>
    </div>
    <div class="post-actions flex justify-between mb-2">
      <el-button icon="Pointer">Like</el-button>
      <el-button icon="Comment">Comment</el-button>
      <el-button icon="Share">Share</el-button>
    </div>
    <div class="post-comments bg-gray-100 p-4 rounded">
      <div
        v-for="(comment, idx) in data.comments"
        :key="idx"
        class="comment-item mb-2"
      >
        <div class="flex items-center mb-1">
          <el-avatar :src="comment.avatar" size="small" />
          <div class="ml-2">
            <div class="font-semibold">{{ comment.userName }}</div>
            <div class="text-gray-500 text-xs">{{ comment.timestamp }}</div>
          </div>
        </div>
        <div class="comment-content">{{ comment.content }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
<style lang="scss"></style>
