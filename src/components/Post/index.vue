<template>
  <div
    class="post bg-slate-50 px-4 py-2 mb-4 shadow-md rounded relative w-full h-auto"
  >
    <PostHeader :data="data" />
    <div class="post-content mb-2">
      <h3 class="text-lg font-bold mb-1">{{ post.title }}</h3>
      <p>{{ post.content }}</p>
    </div>

    <!-- Media -->
    <div class="post-media grid gap-2 mb-2" :class="mediaGridClass">
      <template v-for="(media, index) in post.medias" :key="media.id">
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

    <!-- Thống kê -->
    <div class="post-stats flex justify-between mb-2 text-gray-500 text-sm">
      <div>{{ post.likes.length }} Likes</div>
      <div>{{ post.comments.length }} Comments</div>
    </div>

    <!-- Actions -->
    <div class="post-actions flex justify-between mb-2">
      <el-button icon="Pointer">Like</el-button>
      <el-button icon="Comment">Comment</el-button>
      <el-button icon="Share">Share</el-button>
    </div>

    <!-- Comments -->
    <div class="post-comments bg-gray-100 p-4 rounded">
      <div
        v-for="comment in post.comments"
        :key="comment.id"
        class="comment-item mb-2"
      >
        <div class="flex items-center mb-1">
          <el-avatar :src="comment.user.avatar" size="small" />
          <div class="ml-2">
            <div class="font-semibold">{{ comment.user.name }}</div>
            <div class="text-gray-500 text-xs">
              {{ comment.createdAt | formatDate }}
            </div>
          </div>
        </div>
        <div class="comment-content">{{ comment.content }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, defineProps, ref } from "vue";
import PostHeader from "./PostHeader.vue";
import Tag from "@/components/Tag/index.vue";
import BookForm from "@/components/BookForm/index.vue";
import { Icon } from "@iconify/vue";
import { convertLocalPathToUrl } from "@/utils/image";
const bookFormRef = ref<InstanceType<typeof BookForm>>();

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const post = ref<Post>({
  id: "1",
  title: "A beautiful day",
  createdAt: new Date(),
  medias: [
    {
      id: "1",
      type: "image",
      url: "https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/470203859_1156489262500132_1496398853964021823_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHVTUpAQSVGS3A-8vzGNkpVWDRqbm-j4fdYNGpub6Ph95E1_WjZNCzCrKU-E-vCnS-L9vRcZE6222o_KO_mtCdz&_nc_ohc=LoVAQHA4O_gQ7kNvgEpRw2y&_nc_oc=AdgiMXV5LR--J9mjKv6xJVJqYxn24oeirrnfAJoKLiiNcgh2zg5OHR9CWr1c1u3JX0w&_nc_zt=23&_nc_ht=scontent.fhan17-1.fna&_nc_gid=AQBft97MyOvSEssoqJvdcQS&oh=00_AYAWAYBxS27_2qC9hcARhZcNMt8P1vFtKbS5_S5ifh8iwQ&oe=6769D9D5",
    },
    {
      id: "2",
      type: "image",
      url: "https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/470577399_1156489275833464_471335063325899801_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGZ2YdA904Rnkx2wN-woPtfcrHQJ_vXq4xysdAn-9erjMTDAG_LarcVvh1tSaPUkNsHXdXVRh850U7_T45FcRa6&_nc_ohc=X5xBmhmIgX4Q7kNvgH7xV0d&_nc_oc=AdiUVzqu3fraWfVvZwz4IKExbQ3FUpE3jZGWWDRJvolm9N8ZLRUtYmG4aZ6OzrJ4K_A&_nc_zt=23&_nc_ht=scontent.fhan17-1.fna&_nc_gid=AR1PdfmSQ_WgT9AzBfbGwOo&oh=00_AYBGcRJ3syESqKzqXkTUiYTzedRRTged21Er0n1aL5-baA&oe=6769D9D8",
    },
    {
      id: "3",
      type: "video",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ],
  content: "This is a sample post with multiple media files.",
  comments: [
    {
      id: "1",
      user: {
        id: "1",
        name: "John Doe",
        avatar: "https://via.placeholder.com/40",
      },
      content: "Nice post!",
      createdAt: new Date(),
    },
  ],
  likes: [
    { id: "1", name: "Jane Doe", avatar: "https://via.placeholder.com/40" },
  ],
  user: { id: "1", name: "Alice", avatar: "https://via.placeholder.com/40" },
});
const imageList = computed(() => {
  return post.value.medias
    .filter((media) => media.type === "image")
    .map((media) => media.url);
});
// Tính toán lớp CSS cho grid layout dựa trên số lượng media
const mediaGridClass = computed(() => {
  const count = post.value.medias.length;
  if (count === 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-2";
  if (count === 3) return "grid-cols-3";
  return "grid-cols-2 grid-rows-2"; // 4+ media
});

const onShow = (id: string) => {
  bookFormRef.value?.showModel("save", id);
};
</script>
<style lang="scss">
.post-media {
  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
