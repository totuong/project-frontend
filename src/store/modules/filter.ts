import { defineStore } from "pinia";
import { store } from "@/store";
import { filterType } from "./types";
import dayjs from 'dayjs'
import { LocationQueryValue } from 'vue-router'

export const useFilterStore = defineStore({
  id: "filter",
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
    }
  }
});

export function useFilterStoreHook() {
  return useFilterStore(store);
}
