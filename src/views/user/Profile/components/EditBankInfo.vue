<template>
  <el-dialog v-model="showForm" :draggable="true" :show-close="false" overflow>
    <template #header>
      <div class="title pb-4 font-bold text-2xl text-center">
        Thông tin ngân hàng
      </div>
      <hr class="header-divider" />
    </template>
    <el-form
      :model="form"
      ref="ruleFormRef"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="Tên ngân hàng" prop="bankName">
        <el-select
          v-model="form.bankName"
          placeholder="Select"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="item in optionBankNames"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Số tài khoản" prop="bankNumber">
        <el-input v-model="form.bankNumber" />
      </el-form-item>

      <el-form-item label="Tên chủ thẻ" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Chi nhánh" prop="bankAddress">
        <el-input v-model="form.bankAddress" />
      </el-form-item>

      <el-form-item label="QR" prop="bankAddress">
        <div class="h-40 w-40">
          <Upload
            :model-value="convertLocalPathToUrl(form.qr)"
            :headers="headers"
            :action="uploadAvatarAction"
            name="qr"
          />
        </div>
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
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose, reactive } from "vue";
import {
  ElMessage,
  type ComponentSize,
  type FormInstance,
  type FormRules,
} from "element-plus";
import { defaultBank, type Bank } from "@/types/modules/User";
import { useProfile } from "../hookProfile";
import { env } from "@/utils/env";
import { formatToken, getToken } from "@/utils/auth";
import { convertLocalPathToUrl } from "@/utils/image";
import Upload from "./Upload.vue";

const { onSaveBankInfo } = useProfile();
const uploadAvatarAction =
  env.VITE_APP_BASE_API + "/v1/user/profile/upload-qr-bank";

const headers = {
  Authorization: formatToken(getToken() ?? ""),
};
const showForm = ref(false);

const optionBankNames = [
  {
    value: "Viettin Bank",
    label: "Viettin Bank",
  },
  {
    value: "Techcombank",
    label: "Techcombank",
  },
  {
    value: "Argibank",
    label: "Argibank",
  },
  {
    value: "Vietcombank",
    label: "Vietcombank",
  },
  {
    value: "MBBank",
    label: "MBBank",
  },
  {
    value: "Other",
    label: "Other",
  },
];

const form = ref<Bank>(defaultBank);

const showModel = (data: Bank) => {
  form.value = data ?? defaultBank;
  showForm.value = true;
};
defineExpose({ showModel });

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();

const rules = reactive<FormRules>({
  bankName: [
    {
      required: true,
      message: "Please select a profile code",
      trigger: "change",
    },
  ],
  bankNumber: [
    {
      required: true,
      message: "Please select a profile code",
      trigger: "change",
    },
  ],
  name: [
    {
      required: true,
      message: "Please select a profile code",
      trigger: "change",
    },
  ],
});

const emit = defineEmits(["onUpdate"]);

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  try {
    // Chờ validate form
    const valid = await formEl.validate();

    if (valid) {
      await onSaveBankInfo(form.value);
      setTimeout(() => {
        emit("onUpdate");
      }, 500);

      ElMessage.success({
        message: "Upload Success",
      });

      showForm.value = false;
    }
  } catch (error) {
    ElMessage.error({
      message: error.message || "Something went wrong!",
    });
  }
};
</script>

<style></style>
