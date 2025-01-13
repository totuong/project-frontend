<template>
  <el-dialog
    v-model="isShowModel"
    title="Thông tin ngân hàng"
    width="400px"
    :show-close="true"
    class="text-center"
  >
    <el-descriptions
      v-if="order?.artist.bank"
      border
      :column="1"
      class="mt-4"
      title="Chi tiết ngân hàng"
    >
      <el-descriptions-item label="Tên ngân hàng">
        {{ order?.artist.bank.bankName }}
      </el-descriptions-item>
      <el-descriptions-item label="Số tài khoản">
        {{ order?.artist.bank.bankNumber }}
      </el-descriptions-item>
      <el-descriptions-item label="Chủ tài khoản">
        {{ order?.artist.bank.name }}
      </el-descriptions-item>
      <el-descriptions-item label="Địa chỉ ngân hàng">
        {{ order?.artist.bank.bankAddress }}
      </el-descriptions-item>
      <el-descriptions-item label="Số tiền">
        {{ moneyFormat(order.price) }}
      </el-descriptions-item>
    </el-descriptions>
    <div v-if="order?.artist.bank?.qr" class="qr-container mt-4">
      <p>Quét mã QR:</p>
      <el-image
        :src="convertLocalPathToUrl(order?.artist.bank.qr)"
        alt="QR Code"
        class="qr-code"
        fit="contain"
      />
    </div>
    <div v-else class="text-orange-600 mt-4">Không có mã QR để hiển thị</div>
  </el-dialog>
</template>

<script setup lang="ts">
import type { Order } from "@/types/modules/Order";
import { moneyFormat } from "@/utils/filter";
import { convertLocalPathToUrl } from "@/utils/image";
import { ref } from "vue";

const order = ref<Order | null>(null);
const isShowModel = ref(false);

const showModel = (data: Order) => {
  order.value = data;
  isShowModel.value = true;
};

defineExpose({ showModel });
</script>

<style scoped>
.qr-container {
  text-align: center;
}
.qr-code {
  width: 200px;
  height: 200px;
  margin: auto;
}

</style>
