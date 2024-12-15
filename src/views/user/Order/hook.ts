import { ref } from "vue";
import {
  getOrders,
  deleteOrder,
  updateStatus,
  updateOrder,
  createOrder,
} from "@/api/order";
import { useFilterOrderStore } from "@/store/modules/filterOrder";
import type { OrderForm } from "@/types/api/order";
import type { Result } from "@/types/api/base";

export function useOrderHook() {
  const orders = ref([]);
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

  async function onUpdateOrder(data: OrderForm) {
    const result: Result = await updateOrder(data);
    return result;
  }

  async function onUpdateStatus(id: string, status: string, reason?: string) {
    const result: Result = await updateStatus(id,status,reason);
    return result;
  }

  async function onDeleteOrder(id: string) {
    const result: Result = await deleteOrder(id);
    return result;
  }

  async function onCreateOrder(data: OrderForm) {
    try {
      const result: Result = await createOrder(data);
      return result.success;
    } catch (error) {
      return false;
    }
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
    orders,
    type,
    pagination,
    loading,
  };
}
