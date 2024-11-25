<template>
  <div class="form-container sign-in">
    <el-form
      ref="formLoginRef"
      :model="formLogin"
      label-position="top"
      :rules="loginFormRules"
      size="large"
    >
      <h1 class="text-3xl font-semibold text-blue-600">Đăng nhập</h1>
      <br />
      <div class="social-icons">
        <a href="#" class="icon">
          <Icon icon="skill-icons:gmail-light" width="36" height="36" />
        </a>
        <a href="#" class="icon">
          <Icon icon="logos:facebook" width="36" height="36" />
        </a>
      </div>
      <span>Đăng nhập bằng gmail hoặc facebook</span>
      <el-form-item class="input-form" label="Tên đăng nhập" prop="username">
        <el-input
          clearable
          v-model="formLogin.username"
          placeholder="Tên đăng nhập"
          :prefix-icon="User"
        ></el-input>
      </el-form-item>

      <el-form-item class="input-form" label="Mật khẩu" prop="username">
        <el-input
          clearable
          show-password
          v-model="formLogin.password"
          placeholder="Mật khẩu"
          :prefix-icon="Lock"
        ></el-input>
      </el-form-item>
      <div class="input-form flex justify-between">
        <el-checkbox v-model="checked" label="Ghi nhớ đăng nhập"> </el-checkbox>
        <el-button link type="primary" @click="onForgotPassword">
          Quên mật khẩu?
        </el-button>
      </div>
      <el-button class="login-btn" round type="primary" @click="onLogin"
        >ĐĂNG NHẬP</el-button
      >
    </el-form>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "login-form",
});
import { ref, reactive } from "vue";
import { Icon } from "@iconify/vue";
import { useValidators } from "@/composables/use-validator.composable";
import { useRouter } from "vue-router";
import { User, Lock } from "@element-plus/icons-vue";
import useUserStore from "@/store/modules/user";
import { useLoading } from "@/composables/loading.composable";
import type { FormInstance, FormRules } from "element-plus";

import { ElMessage } from "element-plus";

const useStore = useUserStore();
const router = useRouter();

const loading = useLoading();

const checked = ref(false);
const validator = useValidators();

const loginFormRules: FormRules = {
  username: [validator.username, validator.required],
  password: [validator.required, validator.password],
};

const formLogin = reactive({
  username: "",
  password: "",
});
const formLoginRef = ref<FormInstance>();
const emit = defineEmits(["onChange"]);

const onLogin = async () => {
  formLoginRef.value?.validate().then(async (valid) => {
    if (valid) {
      loading.startLoading("Logging in...");
      try {
        useStore.userLogin(formLogin).then((res) => {
          if (res.success) {
            ElMessage({
              type: "success",
              message: "Login success",
            });

            router.push("/user");
            loading.stopLoading();
          } else {
            ElMessage.error({ message: res.data });
            loading.stopLoading();
          }
        });
      } catch (error) {
        console.error(error);
        ElMessage.error({ message: "Oops, login failed :(" });
        loading.stopLoading();
      } finally {
        loading.stopLoading();
      }
    }
  });
};
const onForgotPassword = () => {
  emit("onChange");
};
</script>
<style lang="scss" scoped>
@import url("../../style/login.scss");
</style>
