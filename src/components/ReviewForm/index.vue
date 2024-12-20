<template>
  <el-dialog
    v-model="showForm"
    :draggable="true"
    :show-close="false"
    overflow
    width="940px"
  >
    <template #header>
      <el-row :gutter="24">
        <el-col :span="12">
          <div class="title pb-4 font-bold text-2xl text-center">Đánh giá</div>
        </el-col>
        <el-col :span="12">
          <div class="title pb-4 font-bold text-2xl text-center">
            Các đánh giá
          </div></el-col
        >
      </el-row>
      <hr class="header-divider" />
    </template>
    <el-row :gutter="24">
      <el-col :span="11">
        <el-form
          ref="ruleFormRef"
          style="max-width: 800px"
          :model="form"
          :rules="rules"
          label-width="auto"
          label-position="top"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <el-form-item label="Chấm điểm" prop="rate">
            <el-rate
              v-model="form.rate"
              :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
              show-text
            />
          </el-form-item>

          <el-form-item label="Đánh giá" prop="comment">
            <el-input v-model="form.comment" type="textarea" />
          </el-form-item> </el-form
      ></el-col>
      <el-col :span="1"
        ><el-divider direction="vertical" class="h-full"
      /></el-col>
      <el-col :span="12">
        <History :data="reviews" />
      </el-col>
    </el-row>

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
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
import {
  ElMessage,
  type ComponentSize,
  type FormInstance,
  type FormRules,
} from "element-plus";
import { type ReviewForm, defaultForm } from "@/types/apis/review";
import { useReviewHook } from "@/views/user/Profile/hookReview";
import History from "./History.vue";

const {
  onGetReviews,
  onCreateReview,
  onUpdateReview,
  onGetByOrder,
  onDeleteReview,
  review,
  reviews,
} = useReviewHook();

const emit = defineEmits(["onUpdate"]);

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();

const form = ref<ReviewForm>(defaultForm);

const rules = reactive<FormRules>({});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  formEl
    .validate()
    .then((valid) => {
      if (valid) {
        console.log("🚀 ~ .then ~ !form.value.id:", !form.value.id);
        console.log("🚀 ~ .then ~ form.value.id:", form.value.id);

        if (form.value.id) {
          onUpdateReview(form.value)
            .then((response) => {
              if (response.success) {
                ElMessage.success({
                  message: "Tạo thành công", // Hiển thị thông báo khi thành công
                });
                showForm.value = false;
                emit("onUpdate");
              } else {
                ElMessage.error({
                  message: response.data || "Error occurred", // Hiển thị lỗi khi thất bại
                });
                showForm.value = false;
              }
            })
            .catch((error) => {
              ElMessage.error({
                message: error.message || "Something went wrong!",
              });
            });
        } else {
          onCreateReview(form.value)
            .then((response) => {
              if (response.success) {
                ElMessage.success({
                  message: "Tạo thành công", // Hiển thị thông báo khi thành công
                });
                showForm.value = false;
                emit("onUpdate");
              } else {
                ElMessage.error({
                  message: response.data || "Error occurred", // Hiển thị lỗi khi thất bại
                });
                showForm.value = false;
              }
            })
            .catch((error) => {
              ElMessage.error({
                message: error.message || "Something went wrong!",
              });
            });
        }
      }
    })
    .catch((error) => {
      ElMessage.error({
        message: error.message || "Form validation failed!",
      });
    });
};

const showForm = ref(false);
async function showModel(orderId: string, artistId: string) {
  try {
    await onGetByOrder(orderId);
    await onGetReviews(artistId);
    form.value = review.value;
    showForm.value = true;
  } catch (error) {
    ElMessage.error({
      message: error.message || "Có lỗi xảy ra khi tải dữ liệu!",
    });
  }
}
defineExpose({ showModel });
</script>

<style scoped lang="scss">
.el-divider--vertical {
  height: 100%;
}
</style>
