import { ref, watch } from "vue";
import { useFilterOrderStore } from "@/store/modules/filterOrder";
import { createOrder, deleteOrder, getOrders, updateOrder, updateStatus } from "@/api/order";
import type { ShowTop } from "@/types/api/order";

export function useOrderHook() {
  const orders = ref([]);
  const showTopValue = ref<ShowTop[]>([]);
  const loading = ref(false);
  const pagination = ref({
    page: 1,
    total: 0,
  });
  const type = ref("user");

  async function onGetOrders() {
    loading.value = true;
    const { getQuery } = useFilterOrderStore();
    const params = {
      params: {
        ...getQuery,
        type: type.value,
        page: (pagination.value.page ?? 1) - 1,
        limit: 10,
      },
    };

    const result = await getOrders(params);
    orders.value = result.data;
    pagination.value.total = result.meta?.total ?? 0;
    loading.value = false;
  }

  function onGetShowTop() {
    loading.value = true;
    console.log("🚀 ~ onGetShowTop ~  loading.value:", loading.value);
    const { getQuery } = useFilterOrderStore();

    // Giả sử bạn đang lấy dữ liệu trong showTopValue
    showTopValue.value = [
      { key: "2024-12-01", value: 200000 },
      { key: "2024-12-02", value: 250000 },
      { key: "2024-12-03", value: 240000 },
      { key: "2024-12-04", value: 300000 },
    ];

    loading.value = false;
  }

  watch(showTopValue, (newValue) => {
    console.log("Updated showTopValue:", newValue);
    // Bạn có thể thực hiện các hành động khác khi showTopValue thay đổi
  });

  async function onUpdateOrder(data: OrderForm) {
    const result = await updateOrder(data);
    return result;
  }

  async function onUpdateStatus(id: string, status: string, reason?: string) {
    const result = await updateStatus(id, status, reason);
    return result;
  }

  async function onDeleteOrder(id: string) {
    const result = await deleteOrder(id);
    return result;
  }

  async function onCreateOrder(data: OrderForm) {
    const result = await createOrder(data);
    return result;
  }

  function onChangePage(val: number) {
    pagination.value.page = val;
    onGetOrders();
  }

  function onChangeType(val: string) {
    type.value = val;
  }

  return {
    onGetOrders,
    onCreateOrder,
    onUpdateOrder,
    onDeleteOrder,
    onUpdateStatus,
    onChangePage,
    onChangeType,
    onGetShowTop,
    orders,
    type,
    pagination,
    loading,
    showTopValue,
  };
}
