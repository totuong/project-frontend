<template>
  <el-dialog v-model="showForm" :draggable="true" :show-close="false" overflow>
    <template #header>
      <div class="title pb-4 font-bold text-2xl text-center">Tạo đơn</div>
      <hr class="header-divider" />
    </template>
    <el-form
      ref="ruleFormRef"
      style="max-width: 800px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="Người đại diện" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="Công ty" prop="region">
        <el-input v-model="ruleForm.region" />
      </el-form-item>

      <el-form-item label="Thời gian từ" required>
          <el-form-item prop="date1">
            <el-date-picker
              v-model="ruleForm.date1"
              type="date"
              aria-label="Pick a date"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </el-form-item>
        <el-col class="text-center" :span="2">
          <span class="text-gray-500">-</span>
        </el-col>
          <el-form-item prop="date2">
            <el-time-picker
              v-model="ruleForm.date2"
              aria-label="Pick a time"
              placeholder="Pick a time"
              style="width: 100%"
            />
          </el-form-item>
      </el-form-item>
      <el-form-item label="Đến" required>
          <el-form-item prop="date1">
            <el-date-picker
              v-model="ruleForm.date1"
              type="date"
              aria-label="Pick a date"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </el-form-item>
        <el-col class="text-center" :span="2">
          <span class="text-gray-500">-</span>
        </el-col>
          <el-form-item prop="date2">
            <el-time-picker
              v-model="ruleForm.date2"
              aria-label="Pick a time"
              placeholder="Pick a time"
              style="width: 100%"
            />
          </el-form-item>
      </el-form-item>

      <el-form-item label="Price" prop="resource">
        <el-input v-model="ruleForm.resource" placeholder="200000">
          <template #prepend>VND</template>
        </el-input>
      </el-form-item>
      <el-form-item label="Note" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
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

const showForm = ref(false);

const showModel = () => {
  showForm.value = true;
};
defineExpose({ showModel });

interface RuleForm {
  name: string;
  region: string;
  count: string;
  date1: string;
  date2: string;
  delivery: boolean;
  location: string;
  type: string[];
  resource: string;
  desc: string;
}

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  name: "Hello",
  region: "",
  count: "",
  date1: "",
  date2: "",
  delivery: false,
  location: "",
  type: [],
  resource: "",
  desc: "",
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
  date2: [
    {
      type: "date",
      required: true,
      message: "Please pick a time",
      trigger: "change",
    },
  ],
  location: [
    {
      required: true,
      message: "Please select a location",
      trigger: "change",
    },
  ],
  type: [
    {
      type: "array",
      required: true,
      message: "Please select at least one activity type",
      trigger: "change",
    },
  ],
  resource: [
    {
      required: true,
      message: "Please select activity resource",
      trigger: "change",
    },
  ],
  desc: [
    { required: true, message: "Please input activity form", trigger: "blur" },
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
