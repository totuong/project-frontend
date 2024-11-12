<template>
  <div class="common-layout h-full bg-[#f2f2ee] flex justify-center content-center items-center">
    <el-card class="w-3/4">
      <template #header>
        <div class="card-header">
          <span>Thay đổi mật khẩu</span>
        </div>
      </template>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item
          class="input-form"
          label="Mật khẩu hiện tại"
          prop="currentPassword"
        >
          <el-input
            clearable
            show-password
            v-model="ruleForm.confirmPassword"
            placeholder="Mật khẩu"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="input-form"
          label="Mật khẩu mới"
          prop="newPassword"
        >
          <el-input
            clearable
            show-password
            v-model="ruleForm.confirmPassword"
            placeholder="Mật khẩu"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="input-form"
          label="Xác nhận mật khẩu"
          prop="confirmPassword"
        >
          <el-input
            clearable
            show-password
            v-model="ruleForm.confirmPassword"
            placeholder="Mật khẩu"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex px-2.5">
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
            class="w-full"
            >Save</el-button
          >
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose, reactive } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { Lock } from "@element-plus/icons-vue";

const showForm = ref(false);

const showModel = () => {
  showForm.value = true;
  console.log("🚀 ~ showModel ~ showForm.value :", showForm.value);
};
defineExpose({ showModel });

interface RuleForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
  console.log("🚀 ~ save ~ save:");
  showForm.value = false;
};
</script>

<style></style>
