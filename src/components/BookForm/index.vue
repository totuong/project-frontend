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
        <el-col :span="16">
          <div class="title pb-4 font-bold text-2xl text-center">Tạo đơn</div>
        </el-col>
        <el-col :span="7">
          <div class="title pb-4 font-bold text-2xl text-center">
            Lịch trình đã bận
          </div></el-col
        >
      </el-row>
      <hr class="header-divider" />
    </template>
    <el-row :gutter="24"> </el-row>
    <el-row :gutter="24">
      <el-col :span="15">
        <el-form
          ref="ruleFormRef"
          style="max-width: 800px"
          :model="form"
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <el-row>
            <el-form-item label="Thời gian từ" prop="from">
              <el-date-picker
                v-model="form.from"
                type="datetime"
                placeholder="Select date and time"
              />
            </el-form-item>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="14">
              <el-form-item label="Đến" prop="to">
                <el-date-picker
                  v-model="form.to"
                  type="datetime"
                  placeholder="Select date and time"
                />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Tổng">
                <el-input v-model="totalTime" disabled /> </el-form-item
            ></el-col>
          </el-row>
          <el-form-item label="Giá" prop="price">
            <el-input
              v-model="form.price"
              placeholder="200.000"
              clearable
              @input="onPriceInput"
              :formatter="formatCurrency"
              :parser="parseCurrency"
            >
              <template #prepend>VND</template>
            </el-input>
          </el-form-item>
          <el-form-item label="Địa điểm" prop="address">
            <el-input v-model="form.address" />
          </el-form-item>
          <el-form-item label="Công ty" prop="company">
            <el-input v-model="form.company" />
          </el-form-item>

          <el-form-item label="Note" prop="note">
            <el-input v-model="form.note" type="textarea" />
          </el-form-item> </el-form
      ></el-col>
      <el-col :span="1"
        ><el-divider direction="vertical" class="h-full"
      /></el-col>
      <el-col :span="7">
        <Schedule :artist-id="form.artistId" />
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
import { ref, defineExpose, reactive, computed } from "vue";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
import {
  ElMessage,
  type ComponentSize,
  type FormInstance,
  type FormRules,
} from "element-plus";
import { type OrderForm, defaultOrderForm } from "@/types/apis/order";
import { useOrderHook } from "@/views/user/Order/hook";
import Schedule from "./Schedule.vue";

const { onUpdateOrder, onCreateOrder } = useOrderHook();

const emit = defineEmits(["onUpdate"]);

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();

const form = ref<OrderForm>(defaultOrderForm);
const type = ref("save");

const totalTime = computed(() => {
  if (!form.value.from || !form.value.to) return "00h 00m";

  const fromTime = dayjs(form.value.from);
  const toTime = dayjs(form.value.to);

  if (toTime.isBefore(fromTime)) return "00h 00m";

  const diff = dayjs.duration(toTime.diff(fromTime));
  const days = Math.floor(diff.asDays());
  const hours = diff.hours().toString().padStart(2, "0");
  const minutes = diff.minutes().toString().padStart(2, "0");

  if (days === 0) {
    return `${hours} giờ ${minutes} phút`;
  }

  return `${days}ngày ${hours} giờ ${minutes} `;
});

const rules = reactive<FormRules>({
  from: [
    {
      type: "date",
      required: true,
      message: "Please pick a start time",
      trigger: "change",
    },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error("Start time is required"));
        } else if (dayjs(value).isBefore(dayjs())) {
          callback(new Error("Start time cannot be in the past"));
        } else {
          callback();
        }
      },
      trigger: "change",
    },
  ],
  to: [
    {
      type: "date",
      required: true,
      message: "Please pick an end time",
      trigger: "change",
    },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error("End time is required"));
        } else if (dayjs(value).isBefore(dayjs())) {
          callback(new Error("End time cannot be in the past"));
        } else if (
          form.value.from &&
          dayjs(value).isBefore(dayjs(form.value.from).add(10, "minute"))
        ) {
          callback(
            new Error("End time must be at least 10 minutes after start time")
          );
        } else {
          callback();
        }
      },
      trigger: "change",
    },
  ],
  address: [
    {
      required: true,
      message: "Please select a location",
      trigger: "blur",
    },
  ],
  price: [
    {
      required: true,
      message: "Please select a value",
      trigger: "blur",
    },
  ],
});
const onPriceInput = (value: string) => {
  // Loại bỏ các ký tự không phải số
  const numericValue = value.replace(/[^\d]/g, "");
  form.value.price = numericValue ? parseInt(numericValue, 10) : null;
};
const formatCurrency = (value: string | number) => {
  if (!value) return "";
  return new Intl.NumberFormat("vi-VN").format(Number(value));
};

// Hàm chuẩn hóa và chuyển đổi giá trị đầu vào
const parseCurrency = (value: string) => {
  if (!value) return "";
  // Chuẩn hóa dấu phân cách
  const normalized = value.replace(/,/g, "").replace(/\./g, "");
  return normalized.replace(/[^\d]/g, ""); // Loại bỏ ký tự không phải số
};
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  formEl
    .validate()
    .then((valid) => {
      if (valid) {
        if (type.value === "edit") {
          onUpdateOrder(form.value)
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
          onCreateOrder(form.value)
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
const showModel = (valueType: string, data: any) => {
  if (valueType === "edit") {
    type.value = "edit";
    form.value = data;
  } else {
    form.value.artistId = data;
  }
  showForm.value = true;
};
defineExpose({ showModel });
</script>

<style scoped lang="scss">
.el-divider--vertical {
  height: 100%;
}
</style>
