<template>
	<div class="flex justify-center">
		<div
			class="h-9 px-8 rounded font-bold flex text-center justify-center items-center"
			:class="bgColor[role]">
			{{ $Resource.Roles[role] }}
		</div>
	</div>
</template>

<script setup>
import Enum from '../../utills/Enum';

const props = defineProps({
	role: {
		type: Number,
	},
});

const bgColor = {
	[Enum.ROLE.Admin]: 'bg-blue-400 text-white',
	[Enum.ROLE.Finder]: 'bg-stone-600 text-white',
	[Enum.ROLE.Worker]: 'bg-slate-300 text-gray-600',
};
</script>
