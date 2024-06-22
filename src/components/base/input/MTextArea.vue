<template>
	<DxTextArea
		v-bind="$attrs"
		:value="modelValue"
		ref="inputRef"
		:placeholer="placeholer"
		value-change-event="keyup"
		@value-changed="handleInputChange"
		@option-changed="handlePropertyChange"
		@enterKey="emit('enter')"
		height="100%"
		width="100%">
		<DxValidator @initialized="onInit">
			<slot name="rules" />
		</DxValidator>
	</DxTextArea>
</template>

<script setup>
import { DxValidator } from 'devextreme-vue/validator';
import DxTextArea from 'devextreme-vue/text-area';
import { useValidation } from '../../../composable/useValidation';
import { onBeforeMount, ref } from 'vue';
const props = defineProps({
	modelValue: {
		type: [String, Number, null],
	},

	placeholer: String
});
const inputRef = ref();
const emit = defineEmits(['update:modelValue', 'enter', 'initialized']);
const { validate, onInit, handlePropertyChange, inputStatus } = useValidation();
/**
 * Emit sự kiện update model value
 * @author NTVu 21/10/2023
 * @param {object} text
 */
const handleInputChange = (text) => {
	emit('update:modelValue', text.value);
};
const focus = () => {
	inputRef.value.instance.focus();
};
const checkValid = () => inputStatus.value.isValid;
onBeforeMount(() => {
	emit('initialized', { validate, focus, checkValid });
});
</script>

<style scoped></style>
