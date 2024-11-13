import { defineStore } from "pinia";
import type { filterType } from "./types/types";
import dayjs from "dayjs";

export const useFilterOrderStore = defineStore({
  id: "filter",
  state: (): filterType => ({
    from: dayjs().startOf("month").format("YYYY-MM-DD"),
    to: dayjs().endOf("month").format("YYYY-MM-DD"),

    status: [],
  }),
  getters: {
    getQuery(state: filterType) {
      const from = state.from;
      const to = state.to;
      const { status } = state;
      return { from, to, status };
    },
  },
  actions: {
    setFrom(from: string) {
      this.from = from;
    },
    setTo(to: string) {
      this.to = to;
    },
  },
});
