<template>
  <div class="mx-auto flex flex-col items-center h-full container-parent">
    <div class="w-4/5 mt-10">
      <!-- Thanh tìm kiếm -->
      <el-card>
        <el-form :inline="true">
          <el-form-item>
            <div class="w-64">
              <el-autocomplete
                class="search-custom"
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
          </el-form-item>
          <el-form-item>
            <CustomSelect
              v-model="form.type"
              :filter-data="filterData.type"
              label="Vai trò:"
              clearable
              style="width: 200px"
            >
            </CustomSelect>
          </el-form-item>
          <el-form-item>
            <CustomSelect
              v-model="form.category"
              :filter-data="filterData.category"
              label="Nghệ thuật:"
              clearable
              style="width: 200px"
            >
            </CustomSelect>
          </el-form-item>
          <el-form-item>
            <CustomSelect
              v-model="form.people"
              :filter-data="filterData.people"
              label="Mọi người:"
              clearable
              style="width: 200px"
            >
            </CustomSelect>
          </el-form-item>

          <el-form-item>
            <div class="flex flex-row content-center w-40">
              <div class="flex flex-col justify-center">
                <span class="text-nowrap">Đánh giá </span>
                <div class="flex justify-center">
                  <el-icon color="#f7ba2b"><Star /></el-icon>
                </div>
              </div>
              <el-slider
                class="ml-3 mt-2"
                v-model="form.rate"
                :min="0"
                :max="5"
                :format-tooltip="formatTooltip"
              />
            </div>
          </el-form-item>
        </el-form>
      </el-card>

      <!-- Kết quả tìm kiếm -->
      <div class="result-container space-y-2">
        <ProfileCard :data="profiles" :pagination="pagination" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { Search, Star } from "@element-plus/icons-vue";
import CustomSelect from "@/components/CustomSelect/index.vue";
import ProfileCard from "./components/ProfileCard.vue";
import { useSearchHook } from "./hook";
import type { SearchForm } from "@/types/apis/user";

const {
  onGetSearchHistories,
  onSearch,
  profiles,
  pagination,
  searchHistories,
} = useSearchHook();
// Dữ liệu tìm kiếm
const state = ref<string>(""); // Giá trị tìm kiếm hiện tại
const form = ref<SearchForm>({
  key: "",
  type: "",
  category: "",
  rate: 0,
  people: "",
});

const filterData = {
  type: [
    { key: "user", value: "Người dùng" },
    { key: "artist", value: "Nghệ sỹ" },
  ],
  category: [
    "Ca sỹ",
    "Ảo thuật",
    "Nhạc sĩ",
    "Vũ công",
    "Diễn viên",
    "Hài hước",
    "Thiếu nhi",
    "Khác",
  ],
  people: ["Bạn bè", "Bạn của bạn bè", "Không phải bạn bè"],
};
// Mảng người dùng
interface User {
  value: string; // Tên người dùng
  profileCode: string; // Mã hồ sơ
  avatar: string; // Ảnh đại diện
  friendCount: number; // Số bạn bè
  isArtist: boolean; // Có phải nghệ sĩ không
}

const formatTooltip = (val: number) => {
  return val + " sao";
};
// Xử lý khi tìm kiếm
const querySearchAsync = (queryString: string, cb: (arg: User[]) => void) => {
  const results = queryString
    ? profiles.value.filter((user) =>
        user.fullName.toLowerCase().includes(queryString.toLowerCase())
      )
    : profiles.value;
  cb(results);
};

const handleSelect = (item: User) => {
  console.log("Đã chọn:", item);
};

watch(form, (val) => {
  onSearch(val);
});

onBeforeMount(() => {
  onSearch(form.value);
  onGetSearchHistories();
});
</script>

<style scoped>
.result-container {
  margin-top: 20px;
}
.el-form--inline .el-form-item {
  margin-bottom: 0px;
}

.demonstration {
  font-size: 14px;
  line-height: 44px;
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
</style>
