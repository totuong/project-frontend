<template>
    <div class="m-selectbox" :class="{'m-validate': isValidate}">
        <DxSelectBox :data-source="dataSource" :search-enabled="true" :show-drop-down-button="false"
            :no-data-text="'Không có dữ liệu'" :placeholder="placeholder" :item-template="itemTemplate" :value-expr="valueExpr"
            :display-expr="displayExpr" @value-changed="onValueChanged" :value="modelValue" @initialized="initialized">
            <template #employee="{ data }">
                <div class="m-selectbox-employee">
                    <div class="m-avt magrin-right-8">
                        {{ helper.getInitials(data?.fullName) }}
                    </div>
                    <div class="m-flex">
                        <div><strong>{{ data?.fullName }}</strong> ({{ data?.employeeCode }})</div>
                        <div>{{ data?.position }}</div>
                    </div>
                </div>
            </template>
        </DxSelectBox>
        <div class="m-icon-dropdown">
            <i class="fa-solid fa-angle-down"></i>
        </div>
        <div class="m-icon-mask m-icon-validate" v-if="isValidate" :id="label" />
        <DxTooltip :target="'#' + label" show-event="dxhoverstart" hide-event="dxhoverend" position="top">
            <template v-slot:content>
                <div class="m-tooltip">{{ tooltip }}</div>
            </template>
        </DxTooltip>
    </div>
</template>

<script setup>
import { ref, watchEffect, watch, inject } from 'vue';
import { DxSelectBox, DxTooltip } from 'devextreme-vue';
const emit = defineEmits();
const helper = inject('helper');
const props = defineProps({
    dataSource: Array,
    placeholder: String,
    itemTemplate: {
        type: String,
        default: "item"
    },
    valueExpr: {
        type: String,
        default: "this"
    },
    displayExpr: {
        type: String,
    },
    label: {
        type: String,
    },
    modelValue: {
        type: [String, Number]
    },
    required: {
        type: Boolean,
        default: false,
    },
    requiredTooltip:{
        type : String,
        default: "Trường này không được bỏ trống"
    }
})

const isValidate = ref(false);
const valueOutput = ref(null);
const tooltip = ref();
const elementSelectBox = ref();

/**
 * @author TXBach
 * @created 30/10/2023
 * @description Hàm thực hiện emit thông tin validate lên cha
 */
const initialized = (e) => {
    elementSelectBox.value = e.component;
    emit("validate", {element: elementSelectBox , validate})
}

/**
 * @author TXBach
 * @created 30/10/2023
 * @description Hàm xử lý khi dữ liệu thay đổi
 */
const onValueChanged = (newValue) => {
    valueOutput.value = newValue.value;
    validate();
    emit("update:modelValue", newValue.value);
}

/**
 * @author TXBach
 * @created 30/10/2023
 * @description Hàm validate ở component
 */
const validate = () => {
    if(props.required && !valueOutput.value){
        isValidate.value = true;
        tooltip.value = props.requiredTooltip;
    }
    else isValidate.value = false;
    return isValidate.value;
}

const focus = () => {
    elementSelectBox.value.focus();
}

watchEffect(()=>{
    valueOutput.value = props.modelValue;
    if(props.modelValue && isValidate.value)validate();
})

watch(valueOutput.value, (newValue) => {
    emit("update:modelValue", newValue);
    validate();
})

</script>

<style>
.m-selectbox {
  position: relative;
  height: 36px;
  font-family: Roboto, Helvetica, Arial, sans-serif !important;
}

.m-selectbox .m-icon-dropdown {
  position: absolute;
  right: 8px;
  top: 18%;
  pointer-events: none;
}
</style>