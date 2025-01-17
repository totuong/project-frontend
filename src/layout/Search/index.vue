<template>
  <div class="w-80 ml-20">
    <el-autocomplete
      class="search-custom"
      ref="autocompleteRef"
      v-model="state"
      size="large"
      :fetch-suggestions="querySearchAsync"
      placeholder="Search..."
      clearable
      @select="handleSelect"
    >
      <template #default="{ item }">
        <div class="flex flex-row justify-between items-center h-16 relative">
          <div class="flex flex-row items-center">
            <Icon
              icon="ic:outline-history"
              width="1.6em"
              height="1.6em"
              class="absolute top-[20px] left-[-16px]"
            />
            <div class="flex flex-row items-center ml-4">
              <img
                src="/logo.png"
                alt="avatar"
                class="w-10 h-10 rounded-full"
              />
              <div class="flex flex-col ml-3 h-10 rounded-lg relative">
                <span class="text-base font-bold text-black">
                  {{ item.name }}
                </span>
                <span class="absolute bottom-[-10px]"
                  >{{ item.friends }} friends</span
                >
              </div>
            </div>
          </div>
          <!-- <el-button
            size="small"
            circle
            class=""
            @click.stop.once="handleCloseClick"
          >
            <el-icon><Close /></el-icon>
          </el-button> -->
        </div>
      </template>
      <template #prefix>
        <el-icon>
          <Search />
        </el-icon>
      </template>

      <template #suffix>
        <router-link to="/user/search">
          <el-link type="primary" :underline="false">Bộ lọc</el-link>
        </router-link>
      </template>
    </el-autocomplete>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Icon } from "@iconify/vue";
const handleSelect = (item: Record<string, any>) => {
  console.log(item);
};
const autocompleteRef = ref(null);
interface User {
  avatar: string;
  name: string;
  friends: number;
}

const handleCloseClick = () => {
  console.log("Close button clicked");
};

const users = ref<User[]>([]);
let timeout: ReturnType<typeof setTimeout>;
const loadAllUsers = () => {
  return [
    { avatar: "https://via.placeholder.com/40", name: "Alice", friends: 5 },
    { avatar: "https://via.placeholder.com/40", name: "Bob", friends: 10 },
    { avatar: "https://via.placeholder.com/40", name: "Charlie", friends: 15 },
    { avatar: "https://via.placeholder.com/40", name: "Diana", friends: 8 },
    { avatar: "https://via.placeholder.com/40", name: "Eve", friends: 20 },
  ];
};
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
    ? users.value.filter(createFilter(queryString))
    : users.value;

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cb(results);
  }, 300);
};
const createFilter = (queryString: string) => {
  return (user: User) => {
    return user.name.toLowerCase().includes(queryString.toLowerCase());
  };
};

onMounted(() => {
  users.value = loadAllUsers();
});
const state = ref("");
</script>

<style scoped lang="scss">
::v-deep(.el-autocomplete-suggestion__list) {
  padding: 0 !important;
}
::v-deep(.el-popper) {
  display: contents !important;
}
</style>
