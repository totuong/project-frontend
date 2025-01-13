import { defineStore } from "pinia";
import type { filterType } from "./types/types";
import dayjs from "dayjs";

export const useFilterOrderStore = defineStore({
  id: "filter",
  state: (): filterType => ({
    from: dayjs().startOf("month").format("YYYY-MM-DD"),
    to: dayjs().endOf("month").format("YYYY-MM-DD"),
    artistIds: [],
    bookerIds: [],
    status: [],
  }),
  getters: {
    getQuery(state: filterType) {
      const from = state.from;
      const to = state.to;
      const artistIds = state.artistIds;
      const bookerIds = state.bookerIds;
      const { status } = state;
      return { from, to,artistIds,bookerIds, status };
    },
  },
  actions: {
    setFrom(from: string) {
      this.from = from;
    },
    setTo(to: string) {
      this.to = to;
    },
    setArtistIds(artistIds: string[]) {
      this.artistIds = artistIds;
    },
    setBookerIds(bookerIds: string[]) {
      this.bookerIds = bookerIds;
    },
  },
});
