<template>
	<div class="flex justify-center">
		<div
			class="h-9 px-4 flex rounded font-bold text-center justify-center items-center"
			:class="bgColor[status]">
			{{ $Resource.Status[status] }}
		</div>
	</div>
</template>

<script setup>
import Enum from '../../utills/Enum';

const props = defineProps({
	status: {
		type: Number,
	},
});

const bgColor = {
	[Enum.AccountStatus.BLOCKED]: 'bg-red-400 text-white',
	[Enum.AccountStatus.ACTIVE]: 'bg-green-500 text-white',
};
</script>
