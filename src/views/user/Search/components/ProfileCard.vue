<template>
  <div class="space-y-2">
    <el-card v-for="user in data" :key="user.profileCode" class="user-card">
      <div class="flex flex-row justify-between">
        <div class="user-info">
          <el-popover placement="right" :width="360">
            <template #reference>
              <div class="mt-1">
                <el-avatar
                  class="cursor-pointer"
                  :src="convertLocalPathToUrl(user.avatar)"
                />
              </div>
            </template>
            <Tag :data="user" @show-form="onShow" />
          </el-popover>
          <div>
            <div class="space-x-2">
              <strong>{{ user.fullName }}</strong>
              <el-tag
                v-if="user.role === 'ARTIST'"
                type="primary"
                effect="dark"
                size="small"
              >
                Nghệ sỹ
              </el-tag>
            </div>
            <p>Số bạn bè: {{ user.totalFriend ?? 0 }}</p>
          </div>
        </div>
        <div @click="console.log(user)">
          <el-button v-if="!user.friendship" type="primary"
            >Kết bạn</el-button
          >
          <el-button
            v-if="user.friendship?.status === 'accepted'"
            type="primary"
            >Bạn bè</el-button
          >
          <el-button
            v-if="
              user.friendship?.status === 'pending' &&
              user.friendship?.requester === user.id
            "
            type="primary"
            >Chấp nhận</el-button
          >
          <el-button
            v-if="
              user.friendship?.status === 'pending' &&
              user.friendship?.requester !== user.id
            "
            type="primary"
            >Hủy yêu cầu</el-button
          >
        </div>
      </div>
    </el-card>
    <el-pagination
      class="mt-4"
      background
      layout="total, prev, pager, next"
      :total="pagination.total"
      :page-size="5"
      @current-change="onChangePage"
    />
    <BookForm ref="bookFormRef" />
  </div>
</template>

<script setup lang="ts">
import { type Profile } from "@/types/modules/User";
import { convertLocalPathToUrl } from "@/utils/image";
import { ref, type PropType } from "vue";
import Tag from "@/components/Tag/index.vue";
import BookForm from "@/components/BookForm/index.vue";

const bookFormRef = ref<InstanceType<typeof BookForm>>();

// Hàm mở dialog
const onShow = (id: string) => {
  bookFormRef.value?.showModel("save", id);
};
const emit = defineEmits(["onChangePage", "onUpdate", "onGetSelect"]);
defineProps({
  data: {
    type: Array as PropType<Profile[]>,
    default: () => [],
  },
  pagination: {
    type: Object,
    default: {},
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const onChangePage = (val: Number) => {
  emit("onChangePage", val);
};
</script>

<style scoped lang="scss">
.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
