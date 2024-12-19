<template>
  <el-card>
    <!-- Expand/Collapse Button -->
    <div class="mb-4 text-right">
      <el-button @click="toggleExpandAll" type="primary">
        {{ allExpanded ? "Thu gọn tất cả" : "Mở rộng tất cả" }}
      </el-button>
    </div>

    <el-table
      :data="tableData"
      :border="parentBorder"
      :row-key="rowKey"
      :expand-row-keys="expandRowKeys"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template #default="{ row }">
          <el-row :gutter="24" class="px-10">
            <el-col :span="12">
              <el-descriptions
                direction="vertical"
                :column="3"
                border
                style="margin-top: 10px"
              >
                <el-descriptions-item
                  :rowspan="3"
                  :width="140"
                  :hight="140"
                  label="Booker"
                  align="center"
                >
                  <img
                    class="h-[124px] object-cover"
                    :src="
                      row.booker.avatar
                        ? convertLocalPathToUrl(row.booker.avatar)
                        : '/logo.png'
                    "
                  />
                </el-descriptions-item>
                <el-descriptions-item label="Tên đầy đủ">{{
                  row.booker.fullName
                }}</el-descriptions-item>
                <el-descriptions-item label="Telephone">{{
                  row.booker.mobile
                }}</el-descriptions-item>
                <el-descriptions-item label="Email">{{
                  row.booker.email
                }}</el-descriptions-item>
                <el-descriptions-item label="Address">{{
                  row.booker.address
                }}</el-descriptions-item>
              </el-descriptions></el-col
            >
            <el-col :span="12">
              <el-descriptions
                direction="vertical"
                :column="3"
                border
                style="margin-top: 10px"
              >
                <el-descriptions-item
                  :rowspan="3"
                  :width="140"
                  label="Artist"
                  align="center"
                >
                  <img
                    class="h-[124px] object-cover"
                    :src="
                      row.artist.avatar
                        ? convertLocalPathToUrl(row.artist.avatar)
                        : '/default-artist-avatar.jpg'
                    "
                  />
                </el-descriptions-item>
                <el-descriptions-item label="Nghệ danh">{{
                  row.artist.nickName ?? row.artist.fullName
                }}</el-descriptions-item>
                <el-descriptions-item label="Telephone">{{
                  row.artist.mobile
                }}</el-descriptions-item>
                <el-descriptions-item label="Email">{{
                  row.artist.email
                }}</el-descriptions-item>
                <el-descriptions-item label="Address">{{
                  row.artist.address
                }}</el-descriptions-item>
              </el-descriptions></el-col
            >
          </el-row>

          <div class="my-4 px-10" m="4">
            <p v-if="row.totalTime" class="font-bold" m="t-0 b-2">
              Tổng thời gian:
              <span class="font-normal">{{ row.totalTime }}</span>
            </p>
            <p v-if="row.company" class="font-bold" m="t-0 b-2">
              Công ty: <span class="font-normal">{{ row.company }}</span>
            </p>
            <p class="font-bold" m="t-0 b-2">
              Address: <span class="font-normal">{{ row.address }}</span>
            </p>
            <p class="font-bold" m="t-0 b-2">
              Note: <span class="font-normal">{{ row.note }}</span>
            </p>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Booker Name">
        <template #default="scope">
          <el-dropdown>
            <router-link :to="`/user/profile/${scope.row.booker.profileCode}`">
              <el-button link>{{
                scope.row.booker.fullName
              }}</el-button></router-link
            >
            <template v-if="type !== 'user'" #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Nhắn tin</el-dropdown-item>
                <el-dropdown-item>Xem trang cá nhân</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column label="Artist Name">
        <template #default="scope">
          <el-dropdown>
            <router-link :to="`/user/profile/${scope.row.artist.profileCode}`">
              <el-button link>{{
                scope.row.artist.fullName
              }}</el-button></router-link
            >
            <template v-if="type !== 'artist'" #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Nhắn tin</el-dropdown-item>
                <el-dropdown-item>Xem trang cá nhân</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column label="From" prop="from" sortable>
        <template #default="{ row }">
          {{ formatDateTime(row.from) }}
        </template>
      </el-table-column>
      <el-table-column label="To" prop="to" sortable>
        <template #default="{ row }">
          {{ formatDateTime(row.to) }}
        </template>
      </el-table-column>
      <el-table-column
        label="Price"
        prop="price"
        sortable
        :formatter="formatMoney"
      />
      <el-table-column label="Status" prop="status">
        <template #default="scope">
          <el-tag effect="dark" :type="getTagType(scope.row.status)">
            {{ scope.row.status }}
          </el-tag></template
        >
      </el-table-column>
      <el-table-column
        label="Action"
        prop="price"
        min-width="160px"
        align="center"
      >
        <template #default="scope">
          <el-button
            v-if="type === 'user' && scope.row.status === 'pending'"
            plain
            @click="onEdit(scope.row)"
            >Edit</el-button
          >
          <el-button
            v-if="
              type === 'user' &&
              scope.row.status !== 'cancel' &&
              scope.row.status !== 'deleted'
            "
            plain
            @click="showBank(scope.row)"
            >Thanh toán</el-button
          >
          <el-button
            v-if="type === 'artist'"
            :disabled="scope.row.status !== 'pending'"
            type="success"
            plain
            @click="updateStatus(scope.row.id, 'confirmed')"
            >{{
              scope.row.status === "pending"
                ? "Xác nhận"
                : scope.row.status === "confirmed"
                ? "Đã xác nhận"
                : "Đã xóa"
            }}
          </el-button>
          <el-button
            v-if="type === 'user'"
            :disabled="
              scope.row.status === 'deleted' ||
              scope.row.status === 'confirmed' ||
              scope.row.status === 'success'
            "
            type="info"
            plain
            @click="updateStatus(scope.row.id, 'deleted')"
            >Hủy</el-button
          >
          <el-button
            v-if="type === 'artist'"
            :disabled="scope.row.status !== 'pending'"
            type="info"
            plain
            @click="cancelOrder(scope.row.id)"
            >Từ chối</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-4"
      background
      layout="total, prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="onChangePage"
    />
    <BookForm ref="bookFormRef" @on-update="onLoad" />
    <BankInfo ref="bankInfoRef" />
    <CancelForm ref="cancelFormRef" @on-update="onLoad" />
  </el-card>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import { moneyFormat } from "@/utils/filter";
import dayjs from "dayjs";
import { useOrderHook } from "../hook";
import { ElMessage } from "element-plus";
import BookForm from "@/components/BookForm/index.vue";
import type { OrderForm } from "@/types/api/order";
import type { Order } from "@/types/module/Order";
import { convertLocalPathToUrl } from "@/utils/image";
import BankInfo from "./BankInfo.vue";
import CancelForm from "./CancelForm.vue";

const bookFormRef = ref<InstanceType<typeof BookForm>>();
const bankInfoRef = ref<InstanceType<typeof BankInfo>>();
const cancelFormRef = ref<InstanceType<typeof CancelForm>>();

const { onUpdateStatus } = useOrderHook();

const parentBorder = ref(false);
const formatMoney = (row: any, column: any, cellValue: number) =>
  moneyFormat(cellValue);
const rowKey = "id"; // Define the unique row key property

// State to track expanded rows and the button text
const expandRowKeys = ref<string[]>([]);
const allExpanded = ref(false);

const props = defineProps({
  tableData: {
    type: Array as PropType<Order[]>,
    default: () => [],
  },
  total: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    default: "user",
  },
  size: {
    type: Number,
    default: 20,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["onChangePage", "onUpdate", "onGetSelect"]);

const onChangePage = (val: Number) => {
  emit("onChangePage", val);
};

const onEdit = (data: OrderForm) => {
  bookFormRef.value?.showModel("edit", data);
};

const updateStatus = async (id: string, status: string, reason?: string) => {
  try {
    await onUpdateStatus(id, status, reason);
    setTimeout(() => {
      emit("onUpdate");
    }, 500);
    ElMessage.success({
      message: "Success",
    });
  } catch (error) {
    ElMessage.error({
      message: error.message || "Something went wrong!",
    });
  }
};

const onLoad = () => {
  emit("onUpdate");
};

const cancelOrder = async (id: string) => {
  cancelFormRef.value?.showModel(id);
};
const showBank = (data: Order) => {
  bankInfoRef.value?.showModel(data);
};

const formatDateTime = (datetime: string) => {
  return dayjs(datetime).format("HH:mm DD-MM");
};

const getTagType = (status: string): string => {
  switch (status) {
    case "cancel":
      return "danger";
    case "success":
      return "success";
    case "deleted":
      return "warning";
    case "pending":
      return "primary";
    case "confirmed":
      return "info";
    default:
      return "";
  }
};

// Function to toggle expand/collapse for all rows
const toggleExpandAll = () => {
  if (allExpanded.value) {
    expandRowKeys.value = []; // Collapse all rows
  } else {
    expandRowKeys.value = props.tableData.map((item) => item.id.toString()); // Expand all rows
  }
  allExpanded.value = !allExpanded.value; // Toggle the expand button text
};
</script>

<style scoped>
.el-table .el-table__expand-icon {
  display: none; /* Hide the default expand icon */
}
/* ::v-deep(.el-table__row) {
  background-color: lightpink;
} */
::v-deep(.el-dropdown) {
  justify-items: center;
  display: flex;
}
</style>
