import { defineStore } from "pinia";
import { store } from "@/store";
import { filterType } from "./types";
import dayjs from 'dayjs'
import { LocationQueryValue } from 'vue-router'

export const useFilterPaymentStore = defineStore({
  id: "filterPayment",
  state: (): filterType => ({
    from: dayjs().startOf('month').toDate(),
    to: new Date(),
    offerIds: [],
    categories: [],
    status: [],
    events: []
  }),
  getters: {
    getQuery (state: filterType) {
      const from = dayjs(state.from).format('YYYY-MM-DD')
      const to = dayjs(state.to).format('YYYY-MM-DD')
      const { offerIds, categories, status, events } = state
      return { from, to, offerIds, categories, status, events }
    }
  },
  actions: {
    setOffers (offers: Array<String>){
      if (offers != null) {
        this.offerIds = offers
      }
    },
    toQuery() {
      const query = [];
      query.push("start_date=" + this.from);
      query.push("end_date=" + this.to);
      if (this.offer && this.offer.length > 0) {
        query.push("offer_id=" + this.offer.join(","));
      }
      if (this.category && this.category.length > 0) {
        query.push("category=" + this.category.join(","));
      }
      if (this.status && this.status.length > 0) {
        query.push("status=" + this.status.join(","));
      }
      if (this.event && this.event.length > 0) {
        query.push("event_name=" + this.event.join(","));
      }
      return query.join("&");
    }
  }
});

export function useFilterPaymentStoreHook() {
  return useFilterPaymentStore(store);
}
