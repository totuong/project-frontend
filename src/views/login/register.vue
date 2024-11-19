<template>
  <div class="form-container sign-up">
    <el-form
      ref="formRegisterRef"
      :model="formRegister"
      :rules="registerFormRules"
      label-position="top"
      size="large"
    >
      <h1 class="text-3xl font-semibold text-blue-600">Tạo tài khoản</h1>
      <br />
      <div class="social-icons">
        <a href="#" class="icon">
          <Icon icon="skill-icons:gmail-light" width="36" height="36" />
        </a>
        <a href="#" class="icon">
          <Icon icon="logos:facebook" width="36" height="36" />
        </a>
      </div>
      <span>Đăng ký nhanh bằng gmail hoặc facebook</span>
      <div style="width: 100%; margin-top: 20px">
        <el-form-item class="input-form" label="Tên đăng nhập" prop="username">
          <el-input
            clearable
            v-model="formRegister.username"
            placeholder="Tên đăng nhập"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item class="input-form" label="Mật khẩu" prop="password">
              <el-input
                clearable
                show-password
                v-model="formRegister.password"
                placeholder="Mật khẩu"
                :prefix-icon="Lock"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item
              class="input-form"
              label="Xác nhận mật khẩu"
              prop="confirmPassword"
            >
              <el-input
                clearable
                show-password
                v-model="formRegister.confirmPassword"
                placeholder="Mật khẩu"
                :prefix-icon="Lock"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="Tên đầy đủ" prop="fullName">
              <el-input
                clearable
                v-model="formRegister.fullName"
                placeholder="Tên đầy đủ"
                :prefix-icon="EditPen"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"> </el-col>
          <el-col :span="11">
            <el-form-item label="Vai trò">
              <el-radio-group fill="#409eee" v-model="formRegister.role">
                <el-radio border value="user">Người dùng</el-radio>
                <el-radio border value="artist">Nghệ sĩ</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="input-form" label="Email" prop="email">
              <el-input
                clearable
                v-model="formRegister.email"
                placeholder="abc@gmail.com"
                :prefix-icon="EditPen"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item class="input-form" label="Mobile" prop="mobile">
              <el-input
                clearable
                v-model="formRegister.mobile"
                placeholder="0123456789"
                :prefix-icon="Phone"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item prop="termsConditions">
              <el-checkbox v-model="termsConditions">
                <div flex>
                  Đồng ý với điều khoản của chúng tôi
                  <el-link
                    href="https://element-plus.org"
                    target="_blank"
                    class="mx-1"
                    type="primary"
                    >Term</el-link
                  >
                </div>
              </el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <el-button type="primary" round @click="onRegister">ĐĂNG KÝ</el-button>
    </el-form>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "register-form",
});
const emit = defineEmits(["changeForm"]);
import { ref, reactive } from "vue";
import { Icon } from "@iconify/vue";
import { useValidators } from "@/composables/use-validator.composable";
import { EditPen, User, Lock, Phone } from "@element-plus/icons-vue";
import useUserStore from "@/store/modules/user";
import { useLoading } from "@/composables/loading.composable";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";

const useStore = useUserStore();

const loading = useLoading();

const validator = useValidators();
const formRegisterRef = ref<FormInstance>();

const sleep = (ms: number | undefined) =>
  new Promise((res) => setTimeout(res, ms));

const formRegister = reactive({
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  mobile: "",
  role: "user",
});
const termsConditions = ref(false);

const registerFormRules: FormRules = {
  username: [validator.username, validator.required],
  password: [validator.required, validator.password],
  fullName: [validator.fullName],
  confirmPassword: [
    {
      type: "string",
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("Please confirm your password"));
        } else if (value !== formRegister.password) {
          callback(new Error("The passwords do not match!"));
        } else {
          callback();
        }
      },
      required: true,
      trigger: "blur",
    },
  ],
  role: [validator.required],
  email: [validator.email, validator.required],
  mobile: [validator.phone],
  termsConditions: {
    type: "boolean",
    validator: (rule, value, callback) => {
      if (termsConditions.value) {
        callback();
      } else {
        callback(new Error("Please accept the terms and conditions"));
      }
    },
    required: true,
    trigger: "change",
  },
};

const onRegister = async () => {
  formRegisterRef.value?.validate((valid) => {
    if (valid) {
      loading.startLoading("Registering...");
      useStore
        .userRegister(formRegister)
        .then(async () => {
          ElMessage.success(
            "Congrats, successfully sign up. Pls confirm email and login"
          );
          await sleep(1000);
          emit("changeForm");
        })
        .catch(() => {
          ElMessage.error("Register failed");
        })
        .finally(() => {
          loading.stopLoading();
        });
    } else {
      return false;
    }
  });
};
</script>
<style scoped lang="scss">
@import url("../../style/login.scss");
:deep(.el-link) {
  margin-left: 10px !important;
  margin-bottom: 15px !important;
}
</style>
