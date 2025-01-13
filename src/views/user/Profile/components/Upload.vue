
<template>
  <div class="relative" style="height: 160px">
    <div class="upload-card" v-if="value">
      <img class="z-10" :src="value" />
    </div>
    <el-upload
      class="absolute top-0"
      :headers="headers"
      :name="name"
      :action="action"
      method="PUT"
      list-type="picture-card"
      :auto-upload="true"
      :multiple="false"
      :on-success="handleSuccess"
      :limit="1"
    >
      <el-icon>
        <Plus />
      </el-icon>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import {  toRef, } from "vue";
import { Plus } from "@element-plus/icons-vue";


const props = defineProps({
  modelValue: String,
  action: String,
  name: String,
  headers: Object
});

const value = toRef(props.modelValue);

function handleSuccess(response) {
  if (response.success) {
    value.value = response?.data;
  }
}
</script>
<style scoped lang="scss">
.upload-card {
  width: 300px;
  height: 160px;
  border: 1px dashed var(--el-border-color-darker);
  border-radius: 6px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
::v-deep(.el-upload--picture-card) {
  position: absolute;
  background-color: transparent;
  width: 300px;
  height: 160px;
}
::v-deep(.el-upload-list) {
  position: absolute;
}
::v-deep(.el-upload-list__item),
::v-deep(.el-upload-list--picture-card) {
  width: 300px;
  height: 160px;
  margin: 0;
}
</style>
