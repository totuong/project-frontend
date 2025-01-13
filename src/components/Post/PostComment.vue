<template>
  <div>
    <div class="post-comments rounded" v-if="comments.length > 0">
      <div v-for="comment in comments" :key="comment.id" class="mb-2 mr-4">
        <div class="flex flex-row mb-1">
          <div class="mt-1">
            <el-avatar
              :src="
                convertLocalPathToUrl(comment.profile.avatar) ??
                (data.profile.role === 'ARTIST'
                  ? '/default-artist-avatar.jpg'
                  : '/logo.png')
              "
              size="small"
            />
          </div>
          <div class="ml-2">
            <div class="flex items-center">
              <div class="bg-gray-100 p-2 rounded-md mr-1">
                <div class="font-semibold">{{ comment.profile.fullName }}</div>

                <div class="comment-content">
                  {{ comment.content || "No content available" }}
                </div>
              </div>

              <el-dropdown @command="handleCommand">
                <el-icon size="large"><More /></el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-if="user.profileCode === comment.profile.profileCode"
                      c
                      ><div class="flex flex-row space-x-3 items-center">
                        <div class="w-3 items-start">
                          <Icon icon="mdi:edit" width="1.2em" height="1.2em" />
                        </div>
                        <div>Chỉnh sửa</div>
                      </div></el-dropdown-item
                    >
                    <el-dropdown-item
                      v-if="user.profileCode === comment.profile.profileCode"
                      :command="['delete', comment]"
                      ><div class="flex flex-row space-x-3 items-center">
                        <div class="w-3 items-start">
                          <Icon
                            icon="carbon:close-filled"
                            width="1.2em"
                            height="1.2em"
                          />
                        </div>
                        <div>Xoá bình luận</div>
                      </div></el-dropdown-item
                    >

                    <el-dropdown-item
                      v-if="user.profileCode !== comment.profile.profileCode"
                      :command="['hide', comment]"
                      ><div class="flex flex-row space-x-3 items-center">
                        <div class="w-3 items-start">
                          <Icon
                            icon="carbon:close-filled"
                            width="1.2em"
                            height="1.2em"
                          />
                        </div>
                        <div>Ẩn bài viết</div>
                      </div></el-dropdown-item
                    >
                    <el-dropdown-item
                      v-if="user.profileCode !== comment.profile.profileCode"
                      :command="['report', comment]"
                      divided
                      ><div class="flex flex-row space-x-3 items-center">
                        <div class="w-3 items-start">
                          <Icon
                            icon="ic:sharp-report"
                            width="1.2em"
                            height="1.2em"
                          />
                        </div>
                        <div>Báo cáo</div>
                      </div></el-dropdown-item
                    >
                    <el-dropdown-item
                      v-if="user.profileCode !== comment.profile.profileCode"
                      :command="['block', comment]"
                      divided
                      ><div
                        class="flex flex-row space-x-3 items-centerr justify-between"
                      >
                        <div class="w-3 items-start">
                          <Icon
                            icon="solar:user-block-rounded-bold"
                            width="1.2em"
                            height="1.2em"
                          />
                        </div>
                        <div>Chặn người này</div>
                      </div></el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>

            <div class="ml-1 text-gray-500 text-[10px]">
              {{ formatTimeAgo(comment.createdAt) || "No date available" }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-11"></div>
    <div class="flex flex-row space-x-2 absolute bottom-0 w-full">
      <div class="flex flex-row space-x-2 w-full p-2 mr-4 bg-[#f5f6f8]">
        <el-avatar
          :src="convertLocalPathToUrl(user.avatar) ?? '/logo.png'"
          :size="32"
        ></el-avatar>
        <div class="relative w-full">
          <el-input
            v-model="commentForm.content"
            placeholder="Hãy viết bình luận của bạn"
            autosize
            clearable
            type="textarea"
            @keydown.enter.prevent="handleCreateComment"
          >
          </el-input>
          <button
            v-if="commentForm.content !== ''"
            @click="handleCreateComment"
          >
            <Icon
              icon="basil:send-solid"
              class="w-6 h-6 absolute right-1 bottom-1"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment, Post } from "@/types/modules/Post";

import useUserStore from "@/store/modules/user";
import { convertLocalPathToUrl } from "@/utils/image";
import { Icon } from "@iconify/vue";
import { onBeforeMount, ref } from "vue";
import { usePostHook } from "@/views/user/Home/hookPost";
import { type CommentForm, defaultCommentForm } from "@/types/apis/post";
import { ElMessage } from "element-plus";
import { Close } from "@element-plus/icons-vue";
import { formatTimeAgo } from "@/utils/time";

const {
  onDeleteComment,
  onCreateCommnent,
  onUpdateComment,
  onGetComments,
  comments,
} = usePostHook();
const user = useUserStore();
const commentForm = ref<CommentForm>(defaultCommentForm);

const props = defineProps<{
  data: Post;
}>();
onBeforeMount(() => {
  onGetComments(props.data.id);
});

const emit = defineEmits(["onHideComment", "onDeleteComment"]);
const deleteComment = (comment: Comment) => {
  if (comment.profile.profileCode === useUserStore().profileCode) {
    onDeleteComment(comment.id);
    comments.value = comments.value.filter((c) => c.id !== comment.id);
    ElMessage.success("Xoá nhận xét thành công");
  } else {
    emit("onHideComment");
    ElMessage.success("Ẩn nhận xét thành công");
  }
};
const handleCommand = (command: any) => {
  const type: string = command[0];
  const data: Comment = command[1];

  switch (type) {
    case "delete":
      deleteComment(data);
      break;
    case "hide":
      emit("onHideComment");
      ElMessage.success("Ẩn bài viết thành công");
      break;
    case "block":
      ElMessage.warning("Người dùng đã bị chặn.");
      break;
    default:
      ElMessage.error("Lệnh không hợp lệ.");
      break;
  }
};
const handleCreateComment = async () => {
  if (!commentForm.value.content.trim()) {
    return;
  }

  try {
    commentForm.value.postId = props.data.id;
    const newComment = await onCreateCommnent(commentForm.value);
    comments.value.push(newComment);
    ElMessage.success("Bình luận thành công!");
    commentForm.value.content = ""; // Xóa nội dung sau khi gửi thành công
  } catch (error) {
    ElMessage.error("Có lỗi xảy ra khi tạo bình luận!");
  }
};
</script>

<style></style>
