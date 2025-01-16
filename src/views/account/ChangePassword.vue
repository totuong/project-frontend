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
        :rules="changePasswordFormRules"
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
            v-model="ruleForm.currentPassword"
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
            v-model="ruleForm.newPassword"
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
import { ref, reactive } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { Lock } from "@element-plus/icons-vue";
import type { ChangePasswordForm } from "@/types/apis/user";
import { changePassword } from "@/apis/user";
import { useValidators } from "@/composables/use-validator.composable";

const showForm = ref(false);
const validator = useValidators();

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
  const changePasswordFormRules: FormRules = {
  currentPassword: [validator.required, validator.password],
  newPassword: [validator.required, validator.password],
  confirmPassword: [validator.required, validator.confirmPassword],
};
const ruleForm = reactive<ChangePasswordForm>({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      changePassword(ruleForm)

    } else {
      console.log("error submit!", fields);
    }
  });
  console.log("🚀 ~ save ~ save:");
  showForm.value = false;
};
</script>

<style></style>
