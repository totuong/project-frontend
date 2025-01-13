<template>
  <el-select v-model="value" class="select-source" placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script lang="ts">
import { ref, watch, defineComponent } from "vue";

export default defineComponent({
  props: {
    options: {
      type: Array as () => { label: string; value: string }[],
      required: true,
      default: () => [],
    },
    modelValue: {
      type: String,
      required: false,
      default: () => "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const value = ref(props.modelValue);

    watch(value, (newValue) => {
      emit("update:modelValue", newValue);
    });

    return {
      value,
    };
  },
});
</script>

<style lang="scss" scoped>
.select-source {
  display: inline-block;
  min-width: 120px;
  max-width: 180px;
  ::v-deep .el-input__suffix {
    display: none;
  }
  ::v-deep .el-input--small {
    --el-input-height: 28px;
    font-size: 12px;
  }
  ::v-deep .el-input__inner {
    padding: 0 10px;
  }
}
</style>
