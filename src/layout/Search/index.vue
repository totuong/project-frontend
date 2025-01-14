<template>
  <div class="w-64 ml-20">
    <el-autocomplete
      class="search-custom"
      v-model="state"
      size="large"
      :fetch-suggestions="querySearchAsync"
      placeholder="Search..."
      clearable
      @select="handleSelect"
    >
      <template #prefix>
        <el-icon>
          <Search />
        </el-icon>
      </template>
    </el-autocomplete>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const handleSelect = (item: Record<string, any>) => {
  console.log(item);
};
interface LinkItem {
  value: string;
  link: string;
}
let timeout: ReturnType<typeof setTimeout>;
const links = ref<LinkItem[]>([]);
const loadAll = () => {
  return [
    { value: "vue", link: "https://github.com/vuejs/vue" },
    { value: "element", link: "https://github.com/ElemeFE/element" },
    { value: "cooking", link: "https://github.com/ElemeFE/cooking" },
    { value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
    { value: "vuex", link: "https://github.com/vuejs/vuex" },
    { value: "vue-router", link: "https://github.com/vuejs/vue-router" },
    { value: "babel", link: "https://github.com/babel/babel" },
  ];
};
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value;

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cb(results);
  }, 1000 * Math.random());
};
const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};
onMounted(() => {
  links.value = loadAll();
});
const state = ref("");
</script>

<style></style>
