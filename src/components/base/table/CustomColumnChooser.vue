<template>
	<DxPopup
		:wrapper-attr="{
			class: 'columnChooser',
		}"
		:container="container"
		title="Tùy chỉnh cột"
		:show-title="true"
		:width="350"
		height="auto"
		:shading="false"
		:show-close-button="false"
		:visible="true">
		<DxPosition at="right bottom" my="right top" :of="positionOf" />
		<div class="chooserWrapper">
			<div class="chooser__header">
				<MInput
					v-model:model-value="search"
					icon="search"
					placeholder="Tìm kiếm" />
				<DxButton
					icon="close"
					@click="emit('close')"
					class="chooser__closeBtn"
					styling-mode="text"
					type="text" />
			</div>
			<div class="chooser__body">
				<Draggable v-model="cols">
					<template v-slot:item="{ item }">
						<div v-if="checkIsShow(item)" class="chooser__item">
							<DxCheckBox
								icon-size="16"
								v-model:value="item.visible"
								:text="item.caption" />
							<DxButton
								class="chooser__itemBtn"
								icon="menu"
								styling-mode="text"
								type="text" />
						</div>
					</template>
				</Draggable>
			</div>
			<div class="chooser__footer">
				<DxButton
					@click="emit('applyDefault')"
					text="Mặc định"
					mode="normal" />
				<DxButton
					@click="emit('apply', cols)"
					text="Lưu"
					type="default" />
			</div>
		</div>
	</DxPopup>
</template>
<script setup>
import DxPopup, { DxPosition } from 'devextreme-vue/popup';
import { MInput } from '..';
import { DxButton, DxCheckBox } from 'devextreme-vue';
import Draggable from 'vue3-draggable';
import { removeSpecialCharactersAndAccents } from '../../../utills/CommonFunction';
import { ref } from 'vue';

const props = defineProps({
	visible: {
		type: Boolean,
		required: true,
		default: false,
	},
	container: {
		type: String,
		required: true,
		default: () => '',
	},
	button: {
		type: String,
		required: true,
		default: () => '',
	},

	columns: {
		type: Array,
		required: true,
		default: () => [],
	},
});
const cols = ref(JSON.parse(JSON.stringify(props.columns)));
const search = ref('');
const emit = defineEmits(['apply', 'close', 'applyDefault']);
const positionOf = `${props.container} ${props.button}`;

/**
 * Check search col
 * @author NTVu 1/11/2023
 * @param {Object} col
 */
const checkIsShow = (col) => {
	return removeSpecialCharactersAndAccents(col.caption).includes(
		removeSpecialCharactersAndAccents(search.value),
	);
};
</script>

<style lang="css" scoped>
@import url(./table.css);
</style>
