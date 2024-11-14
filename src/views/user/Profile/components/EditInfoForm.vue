<template>
  <el-dialog v-model="showForm" :draggable="true" :show-close="false" overflow>
    <template #header>
      <div class="title pb-4 font-bold text-2xl text-center">
        Chỉnh sửa thông tin cá nhân
      </div>
      <hr class="header-divider" />
    </template>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="Tên đầy đủ" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="Nghệ Danh" prop="region">
        <el-input v-model="ruleForm.region" />
      </el-form-item>

      <el-form-item label="Sinh nhật" required>
        <el-form-item prop="date1">
          <el-date-picker
            v-model="ruleForm.date1"
            type="date"
            aria-label="Pick a date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-form-item>
      </el-form-item>

      <el-form-item label="Email" prop="region">
        <el-input v-model="ruleForm.region" />
      </el-form-item>
      <el-form-item label="Artist" >
        <el-switch
          v-model="value2"
          class=""
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close"
        />
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
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { Check, Close } from '@element-plus/icons-vue'

const showForm = ref(false);
const value2 = ref(true)

const showModel = () => {
  showForm.value = true;
  console.log("🚀 ~ showModel ~ showForm.value :", showForm.value);
};
defineExpose({ showModel });

interface RuleForm {
  name: string;
  region: string;
  count: string;
  date1: string;
  delivery: boolean;
}

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  name: "Hello",
  region: "",
  count: "",
  date1: "",
  delivery: false,
});

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  region: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
  count: [
    {
      required: true,
      message: "Please select Activity count",
      trigger: "change",
    },
  ],
  date1: [
    {
      type: "date",
      required: true,
      message: "Please pick a date",
      trigger: "change",
    },
  ],
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
