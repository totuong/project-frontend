<template>
  <div
    class="bg-[#c9d6ff] min-h-screen flex flex-col items-center justify-center"
  >
    <div class="flex-grow flex flex-col items-center justify-center">
      <h1 class="welcome text-2xl mb-10">
        Chào mừng đến với nền tảng kết nối Nghệ sĩ với chúng tôi
      </h1>
      <el-card
        :class="{ container: true, active: isContainerActive }"
        class="mb-5"
      >
        <LoginForm
          v-if="!showForgotPassword"
          @onChange="onShowForgotPassword"
        />
        <forgot-password-form
          v-else
          @onSuccess="onShowDialog"
          @on-back="showForgotPassword = false"
        />
        <RegisterForm @changeForm="onRegisterSuccess" />

        <div class="toggle-container">
          <div class="toggle">
            <div class="toggle-panel toggle-left">
              <h1>Xin chào!</h1>
              <p>Nếu bạn đã có tài khoản hãy đăng nhập ở đây</p>
              <el-button class="login-btn hiden" round @click="toggleSignIn"
                >ĐĂNG NHẬP</el-button
              >
            </div>
            <div class="toggle-panel toggle-right">
              <h1>Xin chào!</h1>
              <p>Đăng kí tài khoản mới</p>
              <el-button class="login-btn hiden" round @click="toggleSignUp"
                >ĐĂNG KÝ</el-button
              >
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <footer class="w-full bg-white py-4 text-center">
      <div
        class="flex flex-wrap justify-center space-x-3 text-gray-500 text-sm mb-4"
      >
        <a href="#" class="hover:underline">English (UK)</a>
        <a href="#" class="hover:underline">Tiếng Việt</a>
        <a href="#" class="hover:underline">日本語</a>
      </div>
      <div
        class="flex flex-wrap justify-center space-x-3 text-gray-500 text-xs"
      >
        <a href="#" class="hover:underline">Sign Up</a>
        <a href="#" class="hover:underline">Log in</a>
        <a href="#" class="hover:underline">Video</a>
        <a href="#" class="hover:underline">Places</a>
        <a href="#" class="hover:underline">Ray-Ban Meta</a>
        <a href="#" class="hover:underline">Threads</a>
        <a href="#" class="hover:underline">Fundraisers</a>
        <a href="#" class="hover:underline">Services</a>
        <a href="#" class="hover:underline">About</a>
        <a href="#" class="hover:underline">Cookies</a>
        <a href="#" class="hover:underline">AdChoices</a>
        <a href="#" class="hover:underline">Terms</a>
        <a href="#" class="hover:underline">Help</a>
        <a href="#" class="hover:underline">Contact uploading and non-users</a>
        <a href="#" class="hover:underline">Settings</a>
      </div>
      <div class="text-gray-500 text-xs mt-2">Meta © 2024</div>
    </footer>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="Thông báo"
    width="500"
    :show-close="false"
    @close="
      showForgotPassword = false;
      dialogVisible = false;
    "
  >
    <span
      >Mật khẩu mới đã gửi tới email của bạn, hãy kiểm tra và đăng nhập với mật
      khẩu mới</span
    >
    <template #footer>
      <div class="dialog-footer">
        <el-button
          type="primary"
          @click="
            showForgotPassword = false;
            dialogVisible = false;
          "
        >
          Login
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog
    v-model="dialogConfirmEmailVisible"
    title="Thông báo"
    width="500"
    :show-close="false"
    @close="
      isContainerActive = false;
      dialogConfirmEmailVisible = false;
    "
  >
    <span
      >Mật khẩu mới đã gửi tới email của bạn, hãy kiểm tra và đăng nhập với mật
      khẩu mới</span
    >
    <template #footer>
      <div class="dialog-footer">
        <el-button
          type="primary"
          @click="
            isContainerActive = false;
            dialogConfirmEmailVisible = false;
          "
        >
          Confirm mail
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
defineOptions({
  name: "login-home",
});
import { ref } from "vue";

import LoginForm from "./login.vue";
import ForgotPasswordForm from "./forgotPassword.vue";
import RegisterForm from "./register.vue";

const isContainerActive = ref(false);
const showForgotPassword = ref(false);
const dialogVisible = ref(false);
const dialogConfirmEmailVisible = ref(false);

const toggleSignUp = () => {
  isContainerActive.value = true;
};

const toggleSignIn = () => {
  isContainerActive.value = false;
};

const onShowForgotPassword = () => {
  showForgotPassword.value = true;
};

const onShowDialog = () => {
  dialogVisible.value = true;
};

const onRegisterSuccess = () => {
  toggleSignIn()
  dialogConfirmEmailVisible.value = true;
};
</script>

<style lang="scss" scoped>
@import url("../../styles/login.scss");
</style>
