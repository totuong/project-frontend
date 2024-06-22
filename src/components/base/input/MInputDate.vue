<template>
    <DxDateBox v-model="selectedDate" :type="type" :validation-message-mode="'never'"
            height="100%"
		    width="100%"
            :value-change-event="['keyup', 'blur', 'change', 'input', 'focusout']" cancelButtonText="Huỷ"
            applyButtonText="Lưu" todayButtonText="Hôm nay" :display-format="diplayFormat" @value-changed="onChange"
            :placeholder="placeholder" :show-drop-down-button="true" :open-on-field-click="true" dateSerializationFormat="yyyy-MM-ddTHH:mm:ss"
            @initialized="initialized" />
    <div class="m-icon-mask m-icon-validate" v-if="isValidate" :id="label" />
    <DxTooltip :target="'#' + label" show-event="dxhoverstart" hide-event="dxhoverend" position="top">
        <template v-slot:content>
                <div class="m-tooltip">{{ tooltip }}</div>
        </template>
    </DxTooltip>
</template>

<script setup>
import { DxDateBox, DxTooltip } from 'devextreme-vue'
import { ref, watch, watchEffect } from 'vue';

const props = defineProps({
    modelValue: [Date],
    label: {
        type: String,
    },
    diplayFormat:
    {
        type: String,
        default : "dd/MM/yyyy HH:mm"
    },
    placeholder:{
        type: String,
        default : "DD/MM/YYYY HH:mm"
    },
    type:{
        type: String,
        default : "datetime"
    },
    required: {
        type: Boolean,
        default: false,
    },
    requiredTooltip: {
        type: String,
        default: "Trường này không được bỏ trống"
    },
    maxDate: {
        type: Date,
        default: null,
    },
    minDate: {
        type: Date,
        default: null,
    },
    maxDateTooltip: {
        type: String,
        default: null,
    },
    minDateTooltip: {
        type: String,
        default: null,
    },
});
const emit = defineEmits();
const selectedDate = ref();
const elementDate = ref();
const isValidate = ref(false);
const tooltip = ref("");
selectedDate.value = props.modelValue;

/**
 * @author TXBach
 * @created 30/10/2023
 * @description Hàm thực hiện emit thông tin validate lên cha
 */
const initialized = (e) => {
    elementDate.value = e.component;
    emit("validate", { element: elementDate.value, validate })
}

/**
 * @author TXBach
 * @created 30/10/2023
 * @description Hàm validate ở component
 */
const validate = () => {
    let validateTmp = true;
    if (props.required && !selectedDate.value) {
        tooltip.value = props.requiredTooltip;
    }
    else if (props.maxDate && (new Date(props.maxDate) < new Date(selectedDate.value))) {
        tooltip.value = props.maxDateTooltip;
    }
    else if (props.minDate && (new Date(props.minDate) > new Date(selectedDate.value))) {
        tooltip.value = props.minDateTooltip;
    }
    else validateTmp = false;
    isValidate.value = validateTmp;
    return isValidate.value;
}

/**
 * @author TXBach
 * @created 30/10/2023
 * @description Hàm xử lý khi chọn sang 1 ngày mới
 */
const onChange = (data) => {
    selectedDate.value = data.value;
    emit("update:modelValue", data.value);
    validate();
}

watch(() => [props.minDate, props.maxDate], ()=> {
    isValidate.value = false;
})


</script>