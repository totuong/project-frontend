<template>
  <el-date-picker
    v-model="values"
    type="daterange"
    unlink-panels
    range-separator="-"
    start-placeholder="Start date"
    end-placeholder="End date"
    :picker-options="{ shortcuts, disabledDate }"
    :clearable="false"
    style="height: 38px !important"
    @input="updateValue"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import moment, { type Moment } from "moment";

export default defineComponent({
  props: {
    from: {
      type: Object as () => Moment,
      default: () => moment().subtract(7, "days"),
    },
    to: {
      type: Object as () => Moment,
      default: () => moment(),
    },
    disabledDate: {
      type: Function as () => (date: Date) => boolean,
      default: null,
    },
  },
  emits: ["input"],
  setup(props, { emit }) {
    const values = ref<[Moment, Moment]>([props.from, props.to]);

    const shortcuts = [
      {
        text: "Today",
        onClick(picker: any) {
          values.value = [moment(), moment()];
          picker.$emit("pick", values.value);
        },
      },
      {
        text: "Yesterday",
        onClick(picker: any) {
          const yesterday = moment().subtract(1, "day");
          values.value = [yesterday, yesterday];
          picker.$emit("pick", values.value);
        },
      },
      {
        text: "Last 7 days",
        onClick(picker: any) {
          const startDate = moment().subtract(7, "days");
          const endDate = moment();
          values.value = [startDate, endDate];
          picker.$emit("pick", values.value);
        },
      },
      {
        text: "Last 30 days",
        onClick(picker: any) {
          const startDate = moment().subtract(30, "days");
          const endDate = moment();
          values.value = [startDate, endDate];
          picker.$emit("pick", values.value);
        },
      },
      {
        text: "This month",
        onClick(picker: any) {
          const startDate = moment().startOf("month");
          const endDate = moment();
          values.value = [startDate, endDate];
          picker.$emit("pick", values.value);
        },
      },
      {
        text: "Last month",
        onClick(picker: any) {
          const startDate = moment().subtract(1, "month").startOf("month");
          const endDate = moment().subtract(1, "month").endOf("month");
          values.value = [startDate, endDate];
          picker.$emit("pick", values.value);
        },
      },
      {
        text: "Last 3 months",
        onClick(picker: any) {
          const startDate = moment().subtract(3, "months");
          const endDate = moment();
          values.value = [startDate, endDate];
          picker.$emit("pick", values.value);
        },
      },
    ];

    watch(
      () => props.from,
      (newVal) => {
        values.value = [newVal, props.to];
      }
    );

    watch(
      () => props.to,
      (newVal) => {
        values.value = [props.from, newVal];
      }
    );

    onMounted(() => {
      values.value = [props.from, props.to];
    });

    const updateValue = (value: [Moment, Moment]) => {
      const newValue = value.map((v) => moment(v)) as [Moment, Moment];
      emit("input", newValue);
    };

    return {
      values,
      shortcuts,
      updateValue,
    };
  },
});
</script>

<style scoped></style>
