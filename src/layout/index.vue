<script setup lang="ts">
import Main from "./main/index.vue";
import Noti from "./Notification/index.vue";
import Messenger from "./Messenger/index.vue";
import Order from "./Order/index.vue";
import useLayOutSettingStore from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";
import { useRouter } from "vue-router";
import {
  User,
  Search,
  Lock,
  HomeFilled,
  Setting,
} from "@element-plus/icons-vue";
import { Icon } from "@iconify/vue";
import { computed, onMounted, ref } from "vue";
import { removeToken } from "@/utils/auth";
import { convertLocalPathToUrl } from "@/utils/image";

const userStore = useUserStore();
const router = useRouter();
const handleSelect = (item: Record<string, any>) => {
  console.log(item);
};
interface LinkItem {
  value: string;
  link: string;
}
let timeout: ReturnType<typeof setTimeout>;

const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value;

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cb(results);
  }, 3000 * Math.random());
};
const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};

const avatarUrl = computed(() => convertLocalPathToUrl(userStore?.avatar));
const handleProfileClick = () => {
  router.push("/user/profile"); // Điều hướng tới /user/profile
};
const handleChangePasswordClick = () => {
  router.push("/user/change-password"); // Điều hướng tới /user/profile
};

const handleHomeClick = () => {
  router.push("/user/index"); // Điều hướng tới /user/profile
};
const logout = () => {
  userStore.userLogout();
};
const links = ref<LinkItem[]>([]);
const loadAll = () => {
  return [
    { value: "vue", link: "https://github.com/vuejs/vue" },
    { value: "element", link: "https://github.com/ElemeFE/element" },
    { value: "cooking", link: "https://github.com/ElemeFE/cooking" },
    { value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
    { value: "vuex", link: "https://github.com/vuejs/vuex" },
    { value: "vue-router", link: "https://github.com/vuejs/vue-router" },
    { value: "babel", link: "https://github.com/babel/babel" },
  ];
};
onMounted(() => {
  links.value = loadAll();
});
const state = ref("");
let LayOutSettingStore = useLayOutSettingStore();
</script>
<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-header class="flex flex-row items-center top-0 z-10 fixed w-full">
      <div class="first">
        <el-button size="large" @click="handleHomeClick"
          ><el-icon class="mr-2"><HomeFilled /></el-icon>Home</el-button
        >
      </div>

      <div class="second w-64 ml-20 rounded-xl">
        <el-autocomplete
          class="w-[240px]"
          v-model="state"
          size="large"
          :fetch-suggestions="querySearchAsync"
          placeholder="Search..."
          clearable
          @select="handleSelect"
        >
          <template #prefix>
            <el-icon>
              <Search />
            </el-icon>
          </template>
        </el-autocomplete>
      </div>
      <div class="last ml-auto flex items-center">
        <div class="flex flex-row mr-8 space-x-6">
          <Order />
          <Messenger />
          <Noti />
        </div>
        <el-dropdown class="flex" trigger="click">
          <span class="flex flex-row items-center">
            <img
              v-if="avatarUrl"
              :src="avatarUrl"
              alt="Avatar"
              class="mr-3 rounded-full"
              width="32"
              height="32"
            />
            <!-- Thay thế bằng icon nếu avatar không tồn tại -->
            <Icon
              v-else
              class="mr-3"
              icon="icon-park:avatar"
              width="22"
              height="32"
            />
            <!-- v-if="username" -->
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
  background-color: #7a2f2f !important;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  z-index: 999;
}
.el-main {
  padding: 0;
}
</style>
