<template>
    <el-card>
      <div class="user-info text-center">
        <div class="flex gap-2 justify-center flex-wrap">
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
        <el-rate
          v-model="value"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value} points"
        />
        <p class="bio text-gray-600">Bằng ...</p>
        <div class="actions mt-4 space-x-2">
          <el-button type="primary" size="small">Book</el-button>
          <el-button size="small">Xem review</el-button>
        </div>
        <el-button @click="onEditTag" class="mt-5">Chỉnh sửa</el-button>
      </div>
    </el-card>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import { ElInput } from "element-plus";
import type { InputInstance } from "element-plus";

const inputValue = ref("");
const dynamicTags = ref(["Ảo thuật", "Ca hát", "Nhảy múa"]);
const inputVisible = ref(false);
const InputRef = ref<InputInstance>();
const value = ref(4.4);
const editable=ref(false)

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

const onEditTag=()=>{
    editable.value=!editable.value
}

</script>

<style></style>
