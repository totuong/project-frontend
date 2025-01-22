<script setup lang="ts">
import Main from "./main/index.vue";
import Noti from "./Notification/index.vue";
import Messenger from "./Messenger/index.vue";
import Order from "./Order/index.vue";
import Search from "./Search/index.vue";
import useLayOutSettingStore from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";
import { useRouter } from "vue-router";
import { User,Lock, Setting } from "@element-plus/icons-vue";
import { Icon } from "@iconify/vue";
import { computed} from "vue";
import { convertLocalPathToUrl } from "@/utils/image";

const userStore = useUserStore();
const router = useRouter();


const avatarUrl = computed(() => convertLocalPathToUrl(userStore?.avatar));
const handleChangePasswordClick = () => {
  router.push("/user/change-password"); // Điều hướng tới /user/profile
};

const logout = () => {
  userStore.userLogout();
};


let LayOutSettingStore = useLayOutSettingStore();
</script>
<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-header class="flex flex-row items-center top-0 z-10 fixed w-full">
      <div class="first">
        <el-tooltip content="Trang chủ">
        <router-link :to="'/'"
          ><Icon
            icon="twemoji:man-singer-light-skin-tone"
            width="2.5em"
            height="2.5em"
        /></router-link>
      </el-tooltip>
      </div>
      <Search />
  
      <div class="last ml-auto flex items-center">
        <div class="flex flex-row mr-8 space-x-6">
          <Order />
          <Messenger />
          <Noti />
        </div>
        <el-dropdown class="flex" trigger="click">
          <span class="flex flex-row items-center">
            <img
               :src="convertLocalPathToUrl(useUserStore().avatar)??(useUserStore().role==='USER'?'/logo.png':'/default-artist-avatar.jpg')"
              alt="Avatar"
              class="mr-3 w-8 h-8 rounded-full object-cover"
              width="32"
              height="32"
            />
            <!-- Thay thế bằng icon nếu avatar không tồn tại -->

            <p class="text-white text-xl font-bold">{{ userStore.fullName }}</p>
          </span>
          <template #dropdown>
            <el-dropdown-menu class="logout">
              <router-link :to="`/user/profile/${userStore.profileCode}`">
                <el-dropdown-item>
                  <el-icon> <user /> </el-icon>Profile
                </el-dropdown-item>
              </router-link>

              <el-dropdown-item @click="handleChangePasswordClick"
                ><el-icon><Lock /></el-icon>Change Password</el-dropdown-item
              >
              <el-dropdown-item
                ><el-icon><Setting /></el-icon>Setting</el-dropdown-item
              >
              <el-dropdown-item divided @click="logout">
                <Icon
                  icon="material-symbols:logout"
                  width="20"
                  height="20"
                />Logout</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-aside
      v-if="false"
      width="200px"
      :class="{ isCollapse: LayOutSettingStore.isCollapse ? true : false }"
    >
    </el-aside>
    <el-container class="w-full mt-[60px]">
      <el-main>
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
.el-aside {
  // background-color: #001529 !important;
  transition: all 0.3s;
}
.el-header {
  background-color: #6ba3be !important;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  z-index: 999;
}
.el-main {
  padding: 0;
}

</style>
