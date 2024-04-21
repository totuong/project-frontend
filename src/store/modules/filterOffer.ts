import { defineStore } from "pinia";
import { store } from "@/store";
import { filterType } from "./types";
import dayjs from 'dayjs'
export const useFilterOfferStore = defineStore({
  id: "filterOffer",
  state: (): filterType => ({
    from: dayjs().startOf('month').toDate(),
    to: new Date(),
    offerIds: [],
    categories: [],
    status: [],
    events: [],
    keyword: ''
  }),
  getters: {
    getQuery (state: filterType) {
      const from = dayjs(state.from).format('YYYY-MM-DD')
      const to = dayjs(state.to).format('YYYY-MM-DD')
      const { offerIds, categories, status, events ,keyword } = state
      return { from, to, offerIds, categories, status, events, keyword }
    }
  }
});

export function useFilterOfferStoreHook() {
  return useFilterOfferStore(store);
}
