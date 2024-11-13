<template>
  <el-card>
    <!-- Expand/Collapse Button -->
    <div class="mb-4 text-right">
      <el-button @click="toggleExpandAll" type="primary">
        {{ allExpanded ? "Thu gọn tất cả" : "Mở rộng tất cả" }}
      </el-button>
    </div>

    <!-- Table -->
    <el-table
      :data="tableData"
      :border="parentBorder"
      :row-key="rowKey"
      :expand-row-keys="expandRowKeys"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template #default="props">
          <div class="ml-14" m="4">
            <p v-if="props.row.totalTime" class="font-bold" m="t-0 b-2">
              Tổng thời gian:
              <span class="font-normal">{{ props.row.totalTime }}h</span>
            </p>
            <p v-if="props.row.company" class="font-bold" m="t-0 b-2">
              Công ty: <span class="font-normal">{{ props.row.company }}</span>
            </p>
            <p class="font-bold" m="t-0 b-2">
              Address: <span class="font-normal">{{ props.row.address }}</span>
            </p>
            <p class="font-bold" m="t-0 b-2">
              Note: <span class="font-normal">{{ props.row.note }}</span>
            </p>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Name" prop="name">
        <template  #default="scope">
          <el-dropdown>
            <el-button link>{{ scope.row.name }}</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Nhắn tin</el-dropdown-item>
                <el-dropdown-item>Xem trang cá nhân</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column label="Date" prop="date" sortable />
      <el-table-column label="From" prop="from" sortable />
      <el-table-column label="To" prop="to" sortable />
      <el-table-column
        label="Price"
        prop="price"
        sortable
        :formatter="formatMoney"
      />
      <el-table-column label="Status" prop="status" sortable />
      <el-table-column label="Action" prop="price" min-width="160px">
        <el-button type="success" plain>Xác nhận</el-button>
        <el-button type="info" plain>Hủy</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { moneyFormat } from "@/utils/filter";

const parentBorder = ref(false);
const formatMoney = (row: any, column: any, cellValue: number) =>
  moneyFormat(cellValue);
const rowKey = "id"; // Define the unique row key property

// State to track expanded rows and the button text
const expandRowKeys = ref<string[]>([]);
const allExpanded = ref(false);

// Table data
const tableData = [
  {
    id: 1,
    date: "2024-10-10",
    name: "Tom",
    company: "Adflex",
    price: 200000,
    from: "18:30:00",
    totalTime: "3.5",
    to: "21:00:00",
    address: "58 Tố Hữu",
    status: "Chờ xác nhận",
    note: "Phí đi lại có thể hỗ trợ sau, yêu cầu đúng giờ, nếu diễn tốt có thể thưởng thêm",
  },
  {
    id: 2,
    date: "2024-10-12",
    name: "Jane",
    company: "GHTK",
    price: 350000,
    from: "08:00:00",
    to: "12:00:00",
    address: "75 Nguyễn Trãi",
    status: "Đã xác nhận",
    note: "Mang theo tài liệu, chuẩn bị trước nội dung",
  },
  {
    id: 3,
    date: "2024-10-15",
    name: "Alice",
    company: "VNPost",
    price: 150000,
    from: "09:30:00",
    to: "10:30:00",
    address: "45 Cầu Giấy",
    status: "Đang xử lý",
    note: "Điều chỉnh giờ nếu cần",
  },
];

// Function to toggle expand/collapse for all rows
const toggleExpandAll = () => {
  if (allExpanded.value) {
    expandRowKeys.value = []; // Collapse all rows
  } else {
    expandRowKeys.value = tableData.map((item) => item.id.toString()); // Expand all rows
  }
  allExpanded.value = !allExpanded.value; // Toggle the expand button text
};
</script>

<style scoped>
.el-table .el-table__expand-icon {
  display: none; /* Hide the default expand icon */
}
::v-deep(.el-table__row) {
  background-color: lightpink;
}
::v-deep(.el-dropdown) {
    justify-items: center;
    display:flex
}
</style>
