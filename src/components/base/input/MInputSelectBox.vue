<template>
	<DxSelectBox
		v-bind="$attrs"
		width="100%"
		:height="36"
		ref="inputRef"
		@value-changed="handleInputChange"
		@selection-changed="handleSelectionChanged"
		@option-changed="handlePropertyChange"
		:value="modelValue"
		:data-source="dataSource"
		:search-enabled="search"
		:value-expr="keyExpr"
		:display-expr="displayExpr"
		:item-template="itemTemplate">
		<DxValidator @initialized="onInit">
			<slot name="rules" />
		</DxValidator>
	</DxSelectBox>
</template>

<script setup>
import DxSelectBox from 'devextreme-vue/select-box';
import { DxValidator } from 'devextreme-vue/validator';
import { ref, onBeforeMount } from 'vue';
import { useValidation } from '../../../composable/useValidation';

const props = defineProps({
	dataSource: {
		type: Array,
		default: () => [],
	},
	keyExpr: {
		type: String,
		default: 'id',
	},
	displayExpr: {
		type: String,
		default: 'text',
	},
	search: { type: Boolean, default: true },

	modelValue: {
		type: [String, Number, Date, Object, null],
	},

	itemTemplate: {
		type: [String, undefined, null],
		default: 'item',
	},
});
const inputRef = ref();
const emit = defineEmits([
	'update:modelValue',
	'initialized',
	'selectionChanged',
]);

const el = ref();
const { validate, onInit, handlePropertyChange, inputStatus } = useValidation();
const checkValid = () => inputStatus.value.isValid;

/**
 * Emit sự kiện update model value
 *
 * @param {object} e
 */
const handleInputChange = (e) => {
	emit('update:modelValue', e.value);
};

/**
 * Emit data lên khi selection thay đổi
 * @author NTVu 30/10/2023
 * @param {*} e
 */
const handleSelectionChanged = (e) => {
	emit('selectionChanged', e.selectedItem);
};

/**
 * focus
 * @author NTVu 23/10/2023
 */
const focus = () => {
	inputRef.value.instance.focus();
};
onBeforeMount(() => {
	emit('initialized', { validate, focus, checkValid });
});
</script>

<style scoped></style>
