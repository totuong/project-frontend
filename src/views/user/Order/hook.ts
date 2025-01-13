import { ref, watch } from "vue";
import { useFilterOrderStore } from "@/store/modules/filterOrder";
import {
  createOrder,
  deleteOrder,
  getOrders,
  updateOrder,
  updateStatus,
  getScheduledOrder,
  getShowTop,
} from "@/apis/order";
import type { OrderForm, ShowTop } from "@/types/apis/order";
import type { Order } from "@/types/modules/Order";

export function useOrderHook() {
  const orders = ref<Order[]>([]);
  const scheduledOrders = ref<Order[]>([]);

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

    const { data, meta } = await getOrders(params);
    const { total } = meta;
    orders.value = data;
    pagination.value.total = total;
    loading.value = false;
  }

  async function onGetScheduledOrders(artistId: string) {
    loading.value = true;
    const { data } = await getScheduledOrder(artistId);
    scheduledOrders.value = data;
    loading.value = false;
  }

  async function onGetShowTop() {
    loading.value = true;
    const { getQuery } = useFilterOrderStore();
    const params = {
      params: {
        ...getQuery,
      },
    };

    const { data } = await getShowTop(params);
    showTopValue.value = data;
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
    onGetScheduledOrders,
    orders,
    type,
    pagination,
    loading,
    showTopValue,
    scheduledOrders,
  };
}
