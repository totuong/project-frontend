<template>
    <el-select
      v-model="modelValue"
      :multiple="multiple"
      collapse-tags
      :clearable="clearable"
      reserve-keyword
      automatic-dropdown
      collapse-tags-tooltip
      filterable
      :allow-create="allowCreate"
      remote
      placeholder=""
      style="min-width: 220px"
      @visible-change="updatePrefixWidth"
    >
      <template #prefix>
        <span class="select-prefix">{{ label }}</span>
      </template>
      <el-option v-for="item in options" :key="item.key" :value="item.key" :label="item.value">
        <div>
          <span v-if="item.icon" class="icon" :style="{ background: `url('${item.icon}')` }" />
          <span>{{ item.value }}</span>
        </div>
      </el-option>
    </el-select>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
  
  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      value: {
        type: [String, Array],
        default: ''
      },
      filterData: {
        type: Array,
        default() {
          return []
        }
      },
      multiple: {
        type: Boolean,
        default: false
      },
      maxWidth: {
        type: Number,
        default: 200
      },
      defaultFirstOption: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: true
      },
      allowCreate: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const select = ref(null)
      const prefixWidth = ref(0)
  
      const modelValue = ref(props.value)
  
      const updatePrefixWidth = () => {
        if (select.value && select.value.$el) {
          const tag = select.value.$el.querySelector('.el-select__tags')
          const prefix = select.value.$el.querySelector('.select-prefix')
          if (prefix) {
            prefixWidth.value = Math.max(prefix.getBoundingClientRect().width + 5, 30)
            if (tag) {
              tag.style.marginLeft = `${prefixWidth.value}px`
            }
          }
        }
      }
  
      onMounted(() => {
        updatePrefixWidth()
        window.addEventListener('resize', updatePrefixWidth)
      })
  
      onBeforeUnmount(() => {
        window.removeEventListener('resize', updatePrefixWidth)
      })
      const options = computed(() => props.filterData
          .map((value) => value?.key ? value : { key: value, value })
          .sort((a, b) => a?.value?.localeCompare(b.value)))
  
      return {
        select,
        modelValue,
        updatePrefixWidth,
        options
      }
    }
  }
  </script>
  
  <style scoped>
  ::v-deep(.el-select__selection) {
    flex-wrap: unset;
  }
  ::v-deep(.el-select__wrapper) {
    min-width: 180px;
    height: 38px;
  }
  
  </style>
  