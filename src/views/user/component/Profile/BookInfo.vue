<template>
  <el-card>
    <div class="user-info text-center">
      <div class="actions space-x-6">
        <el-button
          :class="['shake-button', { 'trigger-shake': isShaking }]"
          type="primary"
          @click="onShow"
        >
          Book
        </el-button>
        <el-button>Xem review</el-button>
      </div>
      <el-rate
        v-model="value"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value} points"
        class="m-2"
      />
      <div class="flex gap-2 justify-center flex-wrap px-2 mb-3">
        <el-tag
          v-for="tag in dynamicTags"
          :key="tag"
          :closable="editable"
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <div v-if="editable" class="flex">
          <el-input
            v-if="inputVisible"
            ref="InputRef"
            v-model="inputValue"
            class="w-20"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
          >
            + New Tag
          </el-button>
        </div>
      </div>

      <p class="bio text-gray-600 px-4">
        Bằng chút tài lẻ và nhiệt tình của mình, Rất vui khi tham gia chương
        trình của các bạn 😍😍😍
      </p>
      <el-descriptions class="mt-4" :column="1" size="large" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon style="small">
                <user />
              </el-icon>
              Nickname
            </div>
          </template>
          Dangrangto
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <Icon
                class="el-icon"
                icon="icon-park-outline:birthday-cake"
                width="16"
                height="16"
                style="color: #aa6e6e"
              />
              Age
            </div>
          </template>
          22
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon style="small">
                <user />
              </el-icon>
              Kinh nghiệm
            </div>
          </template>
          3 năm
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <Icon
                class="el-icon"
                icon="lsicon:number-outline"
                width="16"
                height="16"
              />
              Số lượt book
            </div>
          </template>
          13
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon style="small">
                <Clock />
              </el-icon>
              Số giờ đã diễn
            </div>
          </template>
          50h
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon style="small">
                <iphone />
              </el-icon>
              Telephone
            </div>
          </template>
          0924525xxx
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon style="small">
                <office-building />
              </el-icon>
              Address
            </div>
          </template>
          Hà nội
        </el-descriptions-item>
      </el-descriptions>

      <el-button @click="onEditTag" class="mt-5">Chỉnh sửa</el-button>
    </div>
  </el-card>

  <BookForm ref="bookFormRef" />
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import { ElInput } from "element-plus";
import type { InputInstance } from "element-plus";
import BookForm from "./BookForm.vue";
import { Icon } from "@iconify/vue";
import { Clock } from "@element-plus/icons-vue";
const inputValue = ref("");
const dynamicTags = ref([
  "🎩 Ảo thuật",
  "️🎤 Ca hát",
  "🤸 Nhảy múa",
  " 📸 Nhiếp ảnh gia",
]);
const inputVisible = ref(false);
const InputRef = ref<InputInstance>();
const value = ref(4.4);
const editable = ref(false);
const isShaking = ref(false);

const bookFormRef = ref<InstanceType<typeof BookForm>>();

// Hàm mở dialog
const onShow = () => {
  bookFormRef.value?.showModel(); // Gọi showModel() từ BookForm
};

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};

const onEditTag = () => {
  editable.value = !editable.value;
};
onMounted(() => {
  setInterval(() => {
    isShaking.value = true;
    setTimeout(() => {
      isShaking.value = false;
    }, 500); // Dừng hiệu ứng sau 0.5 giây
  }, 5000); // Lặp lại mỗi 3 giây
});
</script>

<style scoped lang="scss">
.cell-item {
  display: flex;
  align-items: center;
  .el-icon {
    margin-right: 5px;
  }
}
::v-deep(.el-descriptions__label.el-descriptions__cell.is-bordered-label) {
  width: 140px;
}
::v-deep(.el-card__body) {
  padding-left: 0;
  padding-right: 0;
}
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(5px);
  }
}

.shake-button {
  animation: shake 0.5s ease infinite;
  animation-play-state: paused; /* Mặc định không chạy */
  animation-delay: 0s;
}

.shake-button.trigger-shake {
  animation-play-state: running; /* Bật hiệu ứng khi class trigger-shake được thêm vào */
}
</style>
