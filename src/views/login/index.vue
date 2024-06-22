<template>
  <div class="screen">
    <h1 class="welcome text-2xl mb-10">
      Chào mừng đến với nền tảng kết nối Nghệ sĩ với chúng tôi
    </h1>
    <div :class="{ container: true, active: isContainerActive }">
      <!-- <Loading v-if="isLoading" /> -->
      <div class="form-container sign-up">
        <el-form
          ref="formRegisterRef"
          :model="formRegister"
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
          <br />
          <br />
          <el-row :gutter="32" class="input-form">
            <el-col :span="12" style="padding-left: 0px">
              <el-form-item
                label="Tên đầy đủ"
                :rules="[
                  {
                    required: true,
                    message: 'Xin hãy điền tên đẩy đủ',
                    trigger: 'blur',
                  },
                ]"
                prop="fullName"
              >
                <el-input
                  clearable
                  v-model="formRegister.fullName"
                  placeholder="Tên đầy đủ"
                  :prefix-icon="EditPen"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="Vai trò"
                :rules="[
                  {
                    required: true,
                    trigger: 'blur',
                  },
                ]"
              >
                <el-radio-group v-model="formRegister.role" style="padding-right: 0px">
                  <el-radio border value="1">Người dùng</el-radio>
                  <el-radio border value="2">Nghệ sĩ</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            class="input-form"
            label="Email"
            :rules="[
              {
                required: true,
                message: 'Điền email',
                trigger: 'blur',
              },
            ]"
            prop="email"
          >
            <el-input
              clearable
              v-model="formRegister.email"
              placeholder="abc@gmail.com"
              :prefix-icon="EditPen"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="input-form"
            label="Tên đăng nhập"
            :rules="[
              {
                required: true,
                message: 'Điền tên đăng nhập',
                trigger: 'blur',
              },
            ]"
            prop="username"
          >
            <el-input
              clearable
              v-model="formRegister.username"
              placeholder="Tên đăng nhập"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="input-form"
            label="Mật khẩu"
            :rules="[
              {
                required: true,
                message: 'Điền mật khẩu',
                trigger: 'blur',
              },
            ]"
            prop="username"
          >
            <el-input
              clearable
              show-password
              v-model="formRegister.password"
              placeholder="Mật khẩu"
              :prefix-icon="Lock"
            ></el-input>
          </el-form-item>

          <el-button class="login-btn" type="primary" round @click="onRegister"
            >ĐĂNG KÝ</el-button
          >
        </el-form>
      </div>

      <div class="form-container sign-in">
        <el-form ref="formLoginRef" :model="formLogin" label-position="top" size="large">
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
          <span>Đăng nhập bằng gmail</span>
          <br />
          <br />
          <el-form-item
            class="input-form"
            label="Tên đăng nhập"
            :rules="[
              {
                required: true,
                message: 'Điền tên đăng nhập',
                trigger: 'blur',
              },
            ]"
            prop="username"
          >
            <el-input
              clearable
              v-model="formLogin.username"
              :rule="loginFormRules"
              placeholder="Tên đăng nhập"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>

          <el-form-item
            class="input-form"
            label="Mật khẩu"
            :rules="[
              {
                required: true,
                message: 'Điền mật khẩu',
                trigger: 'blur',
              },
            ]"
            prop="username"
          >
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
            <el-button link type="primary" @click="push('/forgot-password')">
              Quên mật khẩu?
            </el-button>
          </div>
          <el-button class="login-btn" round type="primary" @click="onLogin"
            >ĐĂNG NHẬP</el-button
          >
        </el-form>
      </div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Login",
  components: {},
});
import { ref, reactive } from "vue";
import { Icon } from "@iconify/vue";
import { useValidators } from "@/composables/use-validator.composable";
import { useRouter } from "vue-router";
import { EditPen, User, Lock } from "@element-plus/icons-vue";
import { useAuthService } from "@/service/auth.service";
import { useLoading } from "@/composables/loading.composable";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";

const authService = useAuthService();
const router = useRouter();

const loading = useLoading();

const checked = ref(false);
const validator = useValidators();
const formLoginRef = ref<FormInstance>();
const formRegisterRef = ref<FormInstance>();

const isContainerActive = ref(false);
const toggleSignUp = () => {
  isContainerActive.value = true;
};
const toggleSignIn = () => {
  isContainerActive.value = false;
};
const sleep = (ms: number | undefined) => new Promise((res) => setTimeout(res, ms));
const formRegister = reactive({
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  role: 0,
});

const formLogin = reactive({
  username: "",
  password: "",
});

const loginFormRules: FormRules = {
  username: [validator.username, validator.required],
  password: [validator.required, validator.password],
};

const onLogin = async () => {
  formLoginRef.value?.validate().then(async (valid) => {
    if (valid) {
      loading.startLoading("Logging in...");
      try {
        const response = await authService.login({
          username: formLogin.username,
          password: formLogin.password,
        });
        const role = response.role;
        if (role === 0) {
          router.push("/admin");
          ElMessage({
            message: "Congrats, successfully logged in.",
            type: "success",
          });
        } else if (role === 1) {
          router.push("/artist");
          console.log("dcdc");
          ElMessage({
            message: "Congrats, successfully logged in.",
            type: "success",
          });
        } else {
          router.push("/");
          ElMessage({
            message: "Congrats, successfully logged in.",
            type: "success",
          });
        }
      } catch (error) {
        console.error(error);
        ElMessage.error({ message: "Oops, login failed :(" });
      } finally {
        loading.stopLoading();
      }
    }
  });
};
const onRegister = async () => {
  console.log(formRegisterRef.value);
  formRegisterRef.value?.validate((valid) => {
    if (valid) {
      loading.startLoading("Registering...");
      authService
        .register({
          username: formRegister.username,
          password: formRegister.password,
          confirmPassword: formRegister.password,
          email: formRegister.email,
          fullName: formRegister.fullName,
          role: formRegister.role,
        })
        .then(async () => {
          ElMessage.success("Congrats, successfully sign up. Pls login now");
          await sleep(2000);
          isContainerActive.value = false;
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

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

.screen {
  background-color: #c9d6ff;
  background: linear-gradient(to right, #e2e2e2, #c9d6ff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}

.container {
  background-color: "#fff";
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  position: relative;
  width: 1400px;
  max-width: 100%;
  min-height: 600px;
}

.container p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0, 3px;
  margin: 20px 0;
}

.container span {
  font-size: 12px;
}

.container a {
  color: #333;
  font-size: 13px;
  text-decoration: none;
  margin: 15px 0 10px;
}

.login-btn {
  color: #dc1d16;
}

.container button.hidden {
  background-color: transparent;
  border-color: #fff;
}

.container form {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;
}

.input-type {
  background-color: #eee;
  border: none;
  margin: 8px 0;
  font-size: 13px;

  border-radius: 8px;
  width: 100%;
  outline: none;
}

.input-form {
  width: 100%;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.active .sign-in {
  transform: translateX(100%);
}

.sign-up {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.active .sign-up {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: move 0.6s;
}

@keyframes move {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.social-icons a {
  border: 1px solid #ccc;
  border-radius: 20%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 3px;
  width: 40px;
  height: 40px;
}

.toggle-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  border-radius: 150px 0 0 100px;
  z-index: 1000;
}

.container.active .toggle-container {
  transform: translateX(-100%);
  border-radius: 0 150px 100px 0;
}

.toggle {
  background-image: url("https://images.pexels.com/photos/20000875/pexels-photo-20000875/free-photo-of-thanh-ph-m-c-du-l-ch-ton-giao.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  color: #fff;
  position: relative;
  left: -100%;
  width: 200%;
  height: 100%;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.container.active .toggle {
  transform: translateX(50%);
}

.toggle-panel {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 30px;
  text-align: center;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.toggle-left {
  transform: translateX(-200%);
}

.container.active .toggle-left {
  transform: translateX(0);
}

.toggle-right {
  right: 0;
  transform: translateX(0);
}

.container.active .toggle-right {
  transform: translateX(200%);
}

:deep(.el-form-item--large) {
  margin-bottom: 16px;
}

:deep(.el-checkbox.el-checkbox--large .el-checkbox__label) {
  color: #999797;
}

:deep(span.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: #999797;
}

:deep(.el-button.is-link) {
  background-color: unset;
  color: #dc1d16;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

:deep(.el-form--large.el-form--label-top .el-form-item .el-form-item__label) {
  line-height: 22px;
  margin-bottom: 6px;
}
</style>
