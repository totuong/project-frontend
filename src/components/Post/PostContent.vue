<template>
  <div>
    <div class="post-content mb-2">
      <h3 class="text-lg font-bold mb-1">{{ data.title }}</h3>
      <p>{{ data.content }}</p>
    </div>

    <!-- Media -->
    <div class="post-media grid gap-1 mb-2" :class="mediaGridClass">
      <template v-for="(media, index) in data.medias" :key="media.id">
        <!-- Hiển thị hình ảnh -->
        <el-image
          v-if="media.type === 'image'"
          :src="media.url"
          alt="Media"
          :zoom-rate="1.2"
          :max-scale="3"
          :min-scale="0.2"
          fit="cover"
          :preview-src-list="imageList"
          class="object-cover rounded"
        />
        <!-- Hiển thị video -->
        <video
          v-if="media.type === 'video'"
          :src="media.url"
          controls
          class="object-cover rounded"
        ></video>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { type Post } from "@/types/module/Post";

const props = defineProps<{
  data: Post;
}>();

const imageList = computed(() => {
  return props.data.medias
    .filter((media) => media.type === "image")
    .map((media) => media.url);
});

const displayedMedia = computed(() => {
  // Hiển thị tối đa 4 phương tiện
  return props.data.medias.slice(0, 4);
});

// Tính toán lớp CSS cho grid layout dựa trên số lượng media
const mediaGridClass = computed(() => {
  const count = props.data.medias.length;
  if (count === 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-2";
  if (count === 3) return "grid-cols-3";
  return "grid-cols-2 grid-rows-2"; // 4+ media
});
</script>

<style lang="scss" scoped>
.post-media {
  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
