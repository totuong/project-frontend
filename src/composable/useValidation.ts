import { ref } from 'vue';

export const useValidation = () => {
	const inputStatus = ref({ isValid: true });
	const handlePropertyChange = (e) => {
		if (e.name === 'isValid') {
			inputStatus.value.isValid = e.value;
		}
	};
	let validatorInstance;
	function onInit(e) {
		validatorInstance = e.component;
	}
	const validate = () => {
		validatorInstance?.validate();
	};

	return {
		inputStatus,
		handlePropertyChange,
		validate,
		onInit,
	};
};
