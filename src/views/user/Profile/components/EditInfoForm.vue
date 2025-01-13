<template>
  <el-dialog v-model="showForm" :draggable="true" :show-close="false" overflow>
    <template #header>
      <div class="title pb-4 font-bold text-2xl text-center">
        Chỉnh sửa thông tin cá nhân
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
      <el-form-item label="Tên đầy đủ" prop="fullName">
        <el-input v-model="form.fullName" />
      </el-form-item>
      <el-form-item label="Nghệ Danh" prop="nickname">
        <el-input v-model="form.nickname" />
      </el-form-item>

      <el-form-item label="Giới tính" prop="gender">
        <el-select
          v-model="form.gender"
          placeholder="Select"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="item in optionGenders"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Sinh nhật">
        <el-form-item prop="form.birthday">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            aria-label="Pick a date"
            placeholder="Pick a date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </el-form-item>

      <el-form-item label="Email" prop="form.email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="Số điện thoại" prop="form.mobile">
        <el-input v-model="form.mobile" />
      </el-form-item>
      <el-form-item label="Địa chỉ" prop="prop.address">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="Profile code" prop="prop.address">
        <el-input v-model="form.profileCode" />
      </el-form-item>
      <!-- <el-form-item label="Vai trò" prop="form.role">
        <el-select
          v-model="form.role"
          placeholder="Select"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="item in optionRoles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item> -->
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
import { defaultProfile, type Profile } from "@/types/modules/User";
import { useProfile } from "../hookProfile";

const { onSaveProfile } = useProfile();

const showForm = ref(false);

const optionRoles = [
  {
    value: "USER",
    label: "USER",
  },
  {
    value: "ARTIST",
    label: "ARTIST",
  },
];
const optionGenders = [
  {
    value: "male",
    label: "Nam",
  },
  {
    value: "female",
    label: "Nữ",
  },
];

const form = ref<Profile>(defaultProfile);

const showModel = (data: Profile) => {
  form.value = data;
  showForm.value = true;
};
defineExpose({ showModel });

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();

const rules = reactive<FormRules>({
  fullName: [
    { required: true, message: "Please input fullname", trigger: "blur" },
    { min: 3, max: 50, message: "Length should be 3 to 50", trigger: "blur" },
  ],
  role: [
    { required: true, message: "Please select a role", trigger: "change" },
  ],
  gender: [
    { required: true, message: "Please select a gender", trigger: "change" },
  ],
  profileCode:[
    { required: true, message: "Please select a profile code", trigger: "change" },
  ]
});

const emit = defineEmits(["onUpdate"]);

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  try {
    // Chờ validate form
    const valid = await formEl.validate();

    if (valid) {
      await onSaveProfile(form.value);

      emit("onUpdate");

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
