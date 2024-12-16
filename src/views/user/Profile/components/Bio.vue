<template>
  <div class="">
    <div class="cover-photo relative">
      <img
        :src="coverPhotoUrl ?? '/taylor-swift-inc.webp'"
        alt="Cover Photo"
        class="cover-image w-full h-[400px] object-cover rounded-t-lg"
      />
      <el-tooltip
        v-if="isMyProfile(data.id)"
        class="box-item"
        effect="dark"
        content="Chỉnh sửa ảnh bìa"
        placement="top"
      >
        <el-button
          :icon="Edit"
          class="edit-cover absolute bottom-[10px] right-[10px]"
          circle
          @click="onShowUploadCoverPhoto"
        />
      </el-tooltip>
    </div>
    <el-row :gutter="24" class="relative flex flex-row justify-between mb-4">
      <div class="avatar-container ml-12 flex items-center bottom-0 absolute">
        <div>
          <img
            :src="avatarUrl ?? '/logo.png'"
            alt="Avatar"
            class="w-44 h-44 rounded-full object-cover border-4 border-white"
          />
        </div>

        <el-tooltip
          v-if="isMyProfile(data.id)"
          class="box-item"
          effect="dark"
          content="Chỉnh sửa ảnh đại diện"
          placement="top"
        >
          <el-button
            :icon="Edit"
            class="edit-cover absolute bottom-[25px] right-[10px]"
            circle
            @click="onShowUploadAvatar"
          />
        </el-tooltip>
      </div>
      <el-col :span="4" class="info-avatar ml-60 mt-6 mb-6">
        <h2 class="username text-3xl font-semibold">{{ data.fullName }}</h2>
        <div class="follower text-xl font-medium opacity-50">
          {{ 29 }} Followers
        </div>
      </el-col>
      <el-col :span="10" class="flex justify-end content-center">
        <div class="w-full flex justify-end space-x-2">
          <el-button
            v-if="isMyProfile(data.id)"
            type="primary"
            icon="Edit"
            @click="onShowBankInfo"
            >Thông tin thanh toán</el-button
          >
          <el-button
            v-if="isMyProfile(data.id)"
            type="primary"
            icon="Edit"
            @click="onShow"
            >Chỉnh sửa thông tin cá nhân</el-button
          >
          <div v-else class="flex space-x-2">
            <div>
              <el-button v-if="statusFriend === ''" @click="addFriend"
                ><Icon icon="weui:add-friends-filled" class="w-5 h-5 mr-2" />
                Kết bạn</el-button
              >
              <el-dropdown
                v-if="statusFriend === 'accepted'"
                @command="handleCommand"
              >
                <el-button>
                  <Icon icon="fa-solid:user-friends" class="w-5 h-5 mr-4" />
                  Bạn bè<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="follow"
                      >Theo dõi</el-dropdown-item
                    >
                    <el-dropdown-item command="inbox"
                      >Nhắn tin</el-dropdown-item
                    >
                    <el-dropdown-item command="unfriend"
                      >Hủy kết bạn</el-dropdown-item
                    >
                    <el-dropdown-item command="block">Chặn</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <div v-if="statusFriend === 'pending'">
                <el-button
                  v-if="friendship?.requester !== data.id"
                  @click="unFriend()"
                  ><Icon icon="weui:add-friends-filled" class="w-5 h-5 mr-2" />
                  Hủy lời mời</el-button
                >
                <el-dropdown v-else @command="handleCommand">
                  <el-button @click="acceptFriend">
                    <Icon icon="fa-solid:user-friends" class="w-5 h-5 mr-4" />
                    Chấp nhận<el-icon class="el-icon--right"
                      ><arrow-down
                    /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="unfriend"
                        >Hủy yêu cầu</el-dropdown-item
                      >
                      <el-dropdown-item command="block">Chặn</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>

            <el-button icon="Message" @click="onShow">Nhắn tin</el-button>
          </div>

          <el-dropdown>
            <el-button class="flex content-center justify-center items-center">
              <el-icon><ArrowDown /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Video</el-dropdown-item>
                <el-dropdown-item>Ảnh</el-dropdown-item>
                <el-dropdown-item>Chọc</el-dropdown-item>
                <el-dropdown-item>Báo cáo</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <edit-info-form ref="editInfoFormRef" @on-update="loadPage" />
    <edit-bank-info ref="editBankFormRef" @on-update="loadPage" />
    <upload-avatar ref="uploadAvatarRef" @on-update="loadPage" />
    <upload-cover-photo ref="uploadCoverPhotoRef" @on-update="loadPage" />

    <hr />
  </div>
</template>

<script setup lang="ts">
import { ArrowDown, Edit } from "@element-plus/icons-vue";
import { computed, ref, watch } from "vue";
import EditInfoForm from "./EditInfoForm.vue";
import EditBankInfo from "./EditBankInfo.vue";
import UploadAvatar from "./UploadAvatar.vue";
import UploadCoverPhoto from "./UploadCoverPhoto.vue";
import { convertLocalPathToUrl } from "@/utils/image";
import { type Profile, type Friendship } from "@/types/module/User";
import { useProfile } from "../hookProfile";
import { Icon } from "@iconify/vue";
import { ElMessage } from "element-plus";
const props = defineProps<{
  data: Profile;
}>();

const {
  isMyProfile,
  onAddFriend,
  onCheckFriendStatus,
  onUnfriend,
  onAcceptFriend,
} = useProfile();
const emit = defineEmits(["onUpdate"]);

const statusFriend = ref("");
const friendship = ref<Friendship>();

// Profile data
const profileData = computed(() => ({
  coverPhoto: convertLocalPathToUrl(props.data?.coverPhoto),
  avatar: convertLocalPathToUrl(props.data?.avatar),
  name: props.data?.fullName || "Người dùng",
  followers: props.data?.followersCount || 0,
}));

// Bind URL từ computed
const avatarUrl = computed(() => profileData.value.avatar);
const coverPhotoUrl = computed(() => profileData.value.coverPhoto);

const loadPage = () => {
  emit("onUpdate");
};

// Form chỉnh sửa
const editInfoFormRef = ref<InstanceType<typeof EditInfoForm>>();
const editBankFormRef = ref<InstanceType<typeof EditBankInfo>>();
const uploadAvatarRef = ref<InstanceType<typeof UploadAvatar>>();
const uploadCoverPhotoRef = ref<InstanceType<typeof UploadCoverPhoto>>();
const onShow = () => {
  editInfoFormRef.value?.showModel(props.data);
};
const onShowBankInfo = () => {
  editBankFormRef.value?.showModel(props.data.bank);
};
const onShowUploadAvatar = () => {
  uploadAvatarRef.value?.onShowModel();
};

const onShowUploadCoverPhoto = () => {
  uploadCoverPhotoRef.value?.onShowModel();
};
const updateStatusFriend = async (id: string) => {
  if (id) {
    friendship.value = await onCheckFriendStatus(id);
    statusFriend.value = friendship.value?.status ?? "";
  }
};
watch(
  () => props.data.id,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      updateStatusFriend(newId);
    }
  },
  { immediate: true } // Gọi ngay lần đầu khi mount
);
// Hàm xử lý gửi yêu cầu kết bạn
const addFriend = async () => {
  const success = await onAddFriend(props.data.id);
  if (success) {
    statusFriend.value = "pending";
  }
};

const unFriend = async () => {
  const success = await onUnfriend(props.data.id);
  if (success) {
    statusFriend.value = "";
    friendship.value = undefined;
  }
};

const acceptFriend = async () => {
  const success = await onAcceptFriend(props.data.id);
  if (success) {
    statusFriend.value = "accepted";
  }
};

const handleCommand = async (command: string | number | object) => {
  switch (command) {
    case "follow":
      ElMessage.success("Bạn đã theo dõi người dùng.");
      break;
    case "inbox":
      ElMessage.info("Mở hộp thoại nhắn tin.");
      break;
    case "unfriend":
      unFriend();
      break;
    case "block":
      ElMessage.warning("Người dùng đã bị chặn.");
      break;
    default:
      ElMessage.error("Lệnh không hợp lệ.");
      break;
  }
};
</script>

<style scoped lang="scss">
.el-col-4 {
  right: 0;
}
.last-component {
  right: 0px;
}
</style>
