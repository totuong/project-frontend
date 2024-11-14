import { ref } from "vue";
import { downloadRawData, getConfirmations } from "@/api/payment";
import { useFilterPaymentStoreHook } from "@/store/modules/filterPayment";

export function usePaymentHook() {
  const invoices = ref();
  const pagination = ref({
    page: 1,
    total: 0
  });

  const onGetInvoices = async () => {
    invoices.value = [];
    const { getQuery } = useFilterPaymentStoreHook();

    const params = {
      params: {
        ...getQuery,
        page: (pagination.value.page ?? 1) - 1,
        limit: 10
      }
    };

    const { data, meta } = await getConfirmations(params);
    invoices.value = data;
    const { total } = meta;
    pagination.value.total = total;
  };

  const getPayout = (obj: object) => {
    return obj["publisher_payout_vnd"];
  };
  const getPaid = (obj: object) => {
    return obj["paid"] ?? 0;
  };

  const onDownloadRawData = async (id: string, offerId: string) => {
    downloadRawData(id, offerId).then(data => {
      const blob = new Blob([data], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `raw_data`;
      link.click();
      URL.revokeObjectURL(link.href);
    });
  };

  function onChangePage(val: number) {
    pagination.value.page = val;
    onGetInvoices();
  }

  return {
    invoices,
    pagination,
    onGetInvoices,
    getPayout,
    getPaid,
    onDownloadRawData,
    onChangePage
  };
}
