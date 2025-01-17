<template>
  <div class="mx-auto flex flex-col items-center h-full container-parent">
    <div class="w-4/5 mt-10">
      <!-- Thanh tìm kiếm -->
      <el-card>
        <el-form :inline="true">
          <el-form-item>
            <div class="w-64">
              <el-input
                class="search-custom"
                v-model="keyTemp"
                size="large"
                placeholder="Search..."
                clearable
              >
                <template #prefix>
                  <el-icon>
                    <Search />
                  </el-icon>
                </template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <CustomSelect
              v-model="form.role"
              :filter-data="filterData.role"
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
              v-model="form.relationsive"
              :filter-data="filterData.relationship"
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
        <ProfileCard
          :data="profiles"
          :pagination="pagination"
          @onChangePage="onChangePage"
        />
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
import { debounce } from "@/utils";

const { onGetSearchHistories, onSearch, profiles, pagination, loading } =
  useSearchHook();
const form = ref<SearchForm>({
  key: "",
  role: "",
  category: "",
  rate: 0,
  relationsive: "",
});
const keyTemp = ref(form.value.key);

const filterData = {
  role: [
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
  relationship: [
    { key: "isFriend", value: "Bạn bè" },
    { key: "isFriendOfFriend", value: "Bạn của bạn bè" },
    { key: "notIsFriend", value: "Không phải bạn bè" },
    { key: "requested", value: "Đã yêu cầu kết bạn" },
    { key: "isPending", value: "Chờ phê duyệt" },
  ],
};

const onChangePage = (val: number) => {
  pagination.value.page = val;
  onSearch(form.value);
};
const formatTooltip = (val: number) => {
  return val + " sao";
};

const debouncedSearch = debounce(() => {
  form.value.key = keyTemp.value; // Cập nhật `form.key` từ `keyTemp`
}, 1000);

// Theo dõi `keyTemp` và debounce tìm kiếm
watch(keyTemp, () => {
  loading.value = true;
  debouncedSearch();
  loading.value = false;
});
// Theo dõi toàn bộ `form`
watch(
  form,
  (val) => {
    onSearch(val);
  },
  { deep: true }
);

onBeforeMount(() => {
  onSearch(form.value);
});
</script>

<style scoped lang="scss">
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
