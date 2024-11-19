<template>
  <div class="form-container sign-in">
    <el-form
      ref="formLoginRef"
      :model="formLogin"
      label-position="top"
      size="large"
    >
      <div class="flex justify-start w-full">
        <el-button :icon="Back" @click="onBackLogin" type="text">
          <span class="text-lg font-medium text-blue-600">Đăng nhập</span>
        </el-button>
      </div>

      <h1 class="text-3xl font-semibold text-blue-600">Quên mật khẩu</h1>
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
      <el-form-item class="input-form" label="Email xác thực" prop="email">
        <el-input
          clearable
          v-model="email"
          :rule="loginFormRules"
          placeholder="Email"
          :prefix-icon="User"
        ></el-input>
      </el-form-item>
      <el-form-item style="text-align: left; width: 100%">
        <el-button type="primary" @click="sendMail">Gửi yêu cầu</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "forgot-password-form",
});
import { ref, reactive } from "vue";
import { Icon } from "@iconify/vue";
import { useValidators } from "@/composables/use-validator.composable";
import { User } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import { Back } from "@element-plus/icons-vue";

const email = ref("");
const emit = defineEmits(["onSuccess","onBack"]);
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

const sendMail = () => {
  emit("onSuccess");
};

const onBackLogin=()=>{
  emit("onBack");
}

</script>
<style lang="css" scoped>
@import "../../style/login.scss";

</style>
