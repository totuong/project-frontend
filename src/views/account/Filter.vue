<template>
  <el-card>
    <el-form :inline="true">
      <el-row>
        <el-form-item>
          <DateRange v-model="dateRange" type="monthrange" />
        </el-form-item>

        <el-form-item>
          <CustomSelect
            v-model="filterOrderStore.status"
            :filter-data="filterData.status"
            label="Status:"
            clearable
            style="width: 200px"
          >
          </CustomSelect>
        </el-form-item>
      </el-row>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import CustomSelect from "@/components/CustomSelect/index.vue";
import DateRange from "@/components/DateRange/index.vue";
import { useFilterOrderStore } from "@/store/modules/filterOrder"; // sửa đường dẫn store nếu cần
import moment from "moment";

const filterOrderStore = useFilterOrderStore();

const dateRange = ref([
  moment().subtract(6, "months").startOf("month").toDate(),
  moment().endOf("month").toDate(),
]);

// Đồng bộ giá trị `dateRange` với `from` và `to` trong store
watch(
  dateRange,
  ([from, to]) => {
    filterOrderStore.setFrom(moment(from).format("YYYY-MM-DD"));
    filterOrderStore.setTo(moment(to).format("YYYY-MM-DD"));
  },
  { immediate: true }
);

const filterData = {
  status: [
    { key: "pending", value: "Chờ duyệt" },
    { key: "confirm", value: "Xác nhận" },
    { key: "success", value: "Thành công" },
    { key: "cancel", value: "Cancel" },
    { key: "delete", value: "Đã xóa" },
  ],
};
</script>

<style scoped type="scss">
.el-form::v-deep(.el-form-item) {
  margin-bottom: 0;
}
.el-form::v-deep(.el-select) {
  width: 100%;
}
</style>
