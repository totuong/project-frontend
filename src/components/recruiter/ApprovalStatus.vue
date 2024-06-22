<template>
	<div class="flex justify-center">
		<div
			class="h-9 px-4 flex rounded font-bold text-center justify-center items-center"
			:class="bgColor[status]">
			{{ $Resource.ApprovalStatus[status] }}
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
	[Enum.ApprovalStatus.REFUSE]: 'bg-red-400 text-white',
	[Enum.ApprovalStatus.SUCCESS]: 'bg-green-500 text-white',
    [Enum.ApprovalStatus.WAIT]: 'bg-blue-500 text-white',
};
</script>
