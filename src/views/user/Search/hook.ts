import { ref } from "vue";
import {
  getHistories,
  saveHistory,
  deleteHistory,
  search,
} from "@/apis/search";
import type { SearchForm } from "@/types/apis/user";
import type { Profile, SearchHistory } from "@/types/modules/User";

export function useSearchHook() {
  const searchHistories = ref<SearchHistory[]>([]);
  const profiles = ref<Profile[]>([]);

  const loading = ref(false);
  const pagination = ref({
    page: 1,
    total: 0,
  });
  async function onSearch(form: SearchForm) {
    loading.value = true;
    const params = {
        params: {
          ...form,
          page: (pagination.value.page ?? 1) - 1,
          limit: 5,
        },
      };

    const { data, meta }= await search(params);
    const { total } = meta;
    pagination.value.total = total;
    profiles.value = data;
    loading.value = false;
  }

  async function onGetSearchHistories() {
    loading.value = true;
    const { data } = await getHistories();
    searchHistories.value = data;
    loading.value = false;
  }

  async function onSaveSearchHistory(data: SearchForm) {
    const result = await saveHistory(data);
    return result;
  }

  async function onDeleteSearchHistory(id: string) {
    const result = await deleteHistory(id);
    return result;
  }

  return {
    onGetSearchHistories,
    onDeleteSearchHistory,
    onSaveSearchHistory,
    searchHistories,
    loading,
    onSearch,
    profiles,
    pagination,
  };
}
