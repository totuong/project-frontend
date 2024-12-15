<template>
  <el-dialog v-model="isShowModel" title="Shipping address" width="500">
    <el-form :model="form">
      <el-form-item label="Reason">
        <el-input v-model="form.reason" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="onSubmit"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { useOrderHook } from "../hook";

const { onUpdateStatus } = useOrderHook();

const isShowModel = ref(false);
const emit = defineEmits(["onUpdate"]);
const id = ref<string>("");

const onSubmit = () => {
  try {
    onUpdateStatus(id.value, "CANCEL", form.reason);

    ElMessage.success({
      message: "Success",
    });
    isShowModel.value;
    setTimeout(() => {
      emit("onUpdate");
    }, 500);
  } catch (error) {
    ElMessage.error({
      message: error.message || "Something went wrong!",
    });
  }
};

const showModel = (val: string) => {
  id.value = val;
  isShowModel.value = true;
};

defineExpose({ showModel });

const form = reactive({
  reason: "",
});
</script>

<style></style>
