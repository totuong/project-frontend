<template>
	<div class="tableWrapper">
		<Loading v-if="isLoading" />
		<div
			class="tableWrapper__table"
			:style="{
				height: tableHeight,
				'max-height': tableHeight,
			}">
			<DxDataGrid
				id="table"
				:allow-column-reordering="false"
				:allow-column-resizing="true"
				:auto-navigate-to-focused-row="false"
				column-resizing-mode="widget"
				@content-ready="handleContentReady"
				:data-source="dataSource"
				:error-row-enabled="false"
				:focused-row-enabled="true"
				:hover-state-enabled="true"
				@initialized="saveGridInstance"
				:key-expr="keyExpr"
				@option-changed="handleOptionChanged"
				@row-click="clickRow"
				:repaint-changes-only="true"
				:show-row-lines="false"
				:show-borders="false"
				@selection-changed="setSelectedItem"
				width="100%"
				height="100%">
				<DxColumnFixing :enabled="true"> </DxColumnFixing>

				<DxColumn
					v-for="(col, index) in tableCols"
					:key="index"
					:allow-sorting="false"
					:allow-fixing="false"
					:data-field="col.dataField"
					:caption="col.caption"
					:data-type="col.dataType || 'string'"
					:visible="col.visible"
					:width="col.width"
					:alignment="col.alignment || 'left'"
					:calculate-display-value="
						columns[col.defaultIndex - 1].calculateDisplayValue
					"
					:format="col.format"
					:cell-template="col.cellTemplate"
					header-cell-template="headerTemplate" />
				<DxSelection
					v-if="haveCheckBox"
					select-all-mode="allPages"
					show-check-boxes-mode="always"
					css-class="max-width-36"
					mode="multiple"
					:fixed="true"
					fixed-position="left" />

				<!-- <DxPager :visible="false" /> -->

				<DxPaging :enabled="false" />

				<DxScrolling
					:row-rendering-mode="scrollingMode"
					:column-rendering-mode="scrollingMode" />

				<DxSearchPanel
					v-if="searchPanel"
					:visible="true"
					width="320px"
					:highlight-search-text="false" />

				<template #headerTemplate="{ data }">
					<div class="tableHeader" @click="handleClickHeader(data)">
						<span>{{ data.column.caption }}</span>
						<div
							v-show="sort.field === data.column.dataField"
							class="tableHeader__sortIcon"
							:class="`type-${sort.type}`"></div>
					</div>
					<div
						v-if="fixable"
						class="tableHeader__fixedIcon"
						:class="`${data.column.fixed ? 'fixed' : 'unFixed'}`"
						:id="data.column.dataField"
						@click.prevent="toggleFixCol(data)">
						<DxTooltip
							:target="`#${data.column.dataField}`"
							show-event="dxhoverstart"
							hide-event="dxhoverend"
							position="bottom"
							><p class="m-tooltip">{{
								data.column.fixed ? 'Bỏ ghim' : 'Ghim'
							}}</p>
						</DxTooltip>
					</div>
				</template>

				<template #accountCol="{ data }">
					<div class="">
						<h1 class="font-bold text-l">{{
							data.data.firstName + ' ' + data.data.lastName
						}}</h1>
						<p class="text-grey-500 text-sm">{{
							data.data.email
						}}</p>
					</div>
				</template>
				<template #roleCol="{ data }">
					<RoleVue :role="data.data.role" />
				</template>
				<template #statusCol="{ data }">
					<StatusVue :status="Number(data.data.isActive)" />
				</template>
				<template #approvalStatusCol="{ data }">
					<ApprovalStatus :status="Number(data.data.status)" />
				</template>
			</DxDataGrid>
		</div>
		<div></div>
		<div v-if="havePaging" class="table__pager">
			<div>
				Tổng số:
				<b>{{ displayTotalRecords }}</b>
				bản ghi
			</div>

			<nav class="table-pagination-controls">
				<div class="pager__recordsPerPage">
					<DxSelectBox
						:data-source="pageSizeOptions"
						value-expr="value"
						width="80px"
						display-expr="label"
						@value-changed="handlePageSizeChange"
						:value="pager.pageSize" />
				</div>

				<div class="table-paging__records">
					Từ {{ pageRecordInfo.from }}
					đến
					<b>{{ pageRecordInfo.to }}</b>
					bản ghi
				</div>
				<DxButton
					styling-mode="text"
					@click="prevPage"
					:disabled="pager.pageIndex <= 1"
					icon="chevronleft"></DxButton>

				<DxButton
					:disabled="pager.pageIndex >= totalPages"
					@click="nextPage"
					styling-mode="text"
					icon="chevronright"></DxButton>
			</nav>
		</div>
		<CustomColumnChooser
			v-if="isShowColumnChooser"
			container="body"
			button="#columnChooser"
			:columns="tableCols"
			@close="isShowColumnChooser = false"
			@apply-default="applyDefault"
			@apply="applyChangesColumnChooser" />
	</div>
</template>

<script setup>
import { DxButton } from 'devextreme-vue/button';
import DxTooltip from 'devextreme-vue/tooltip';
import DxSelectBox from 'devextreme-vue/select-box';
import { pageSizeOptions } from './options';

import DxDataGrid, {
	DxScrolling,
	DxColumnFixing,
	DxPaging,
	DxColumn,
	DxSelection,
	DxSearchPanel,
} from 'devextreme-vue/data-grid';
import { Loading } from '..';

import { ref, computed } from 'vue';
import CustomColumnChooser from './CustomColumnChooser.vue';

import { formatNumberSplitBy } from '../../../utills/CommonFunction';
import RoleVue from '../../accounts/Role.vue';
import StatusVue from '../../accounts/Status.vue';
import ApprovalStatus from '../../recruiter/ApprovalStatus.vue';
const props = defineProps({
	haveCheckBox: {
		type: Boolean,
		default: true,
	},
	columnReorder: { type: Boolean, default: true },
	dataSource: {
		type: Array,
	},
	columns: {
		type: Array,
	},
	keyExpr: {
		type: String,
		default: 'id',
	},
	pager: {
		type: Object,
		default: () => ({
			pageSize: 10,
			pageIndex: 1,
			totalRecords: 0,
		}),
	},
	havePaging: {
		type: Boolean,
		default: true,
	},
	editBtn: {
		type: Boolean,
		default: true,
	},
	buttonsCol: {
		type: Boolean,
		default: true,
	},
	searchPanel: {
		type: Boolean,
		default: false,
	},
	sort: {
		type: Object,
		default: {
			field: null,
			type: 1,
		},
	},
	fixable: {
		type: Boolean,
		default: true,
	},
});

/**
 * Emit các sự kiện ra ngoài
 */
const emit = defineEmits([
	'selectionChange',
	'pageSizeChanged',
	'pageChanged',
	'clickDelete',
	'clickEdit',
	'clickRow',
	'sortChanged',
	'visibleRowsChanged',
]);
const scrollingMode = ref('virtual');
const isLoading = ref(true);
const tableCols = ref(props.columns);
const isShowColumnChooser = ref(false);
const isPreventSelectionChange = ref(false);
/**
 * Tính toán chiều cao của table
 */
const tableHeight = computed(
	() => `calc(100% - ${props.havePaging ? '60px' : '0'})`,
);
/**
 * Tính toán tổng số trang
 */
const totalPages = computed(() =>
	formatNumberSplitBy(
		Math.ceil(props.pager.totalRecords / props.pager.pageSize),
	),
);

/**
 * Tính toán tổng số bản ghi
 */
const displayTotalRecords = computed(() => {
	return formatNumberSplitBy(props.pager.totalRecords);
});

/**
 * Tính toán số bản ghi hiện tại đang hiển thị
 */
const pageRecordInfo = computed(() => {
	const to = Math.min(
		props.pager.pageIndex * props.pager.pageSize,
		props.pager.totalRecords,
	);
	const from = Math.min(
		(props.pager.pageIndex - 1) * props.pager.pageSize + 1,
		to,
	);
	return {
		from: formatNumberSplitBy(from),
		to: formatNumberSplitBy(to),
	};
});

const dataGridEl = ref(null);

const selectedItemsObj = ref({});

/**
 * Lưu lại instance để sử dụng,
 * @param {InitializedEvent} e
 * @author NTVu 24/10/2023
 */
const saveGridInstance = (e) => {
	dataGridEl.value = e.component;
};

/**
 * Xử lý click cell
 * @author NTVu - 24/10/2023
 * @param {RowClickEvent} e
 */
const clickRow = (e) => {
	emit('clickRow', e.data);
};
/**
 * Hiển thị popup custom column
 * @author NTVu 19/10/2023
 * @param {boolean} isShow
 */
const showColumnChooser = (isShow) => {
	isShowColumnChooser.value = isShow;
};

/**
 * Thay đổi row checked
 * @author NTVu 23/10/2023
 * @param {SelectionChangedEvent} e
 */
const setSelectedItem = (e) => {
	// Prevent sự kiện
	if (isPreventSelectionChange.value) {
		isPreventSelectionChange.value = false;
		return;
	}

	//Xóa các item bị deselected
	if (e.currentDeselectedRowKeys.length > 0) {
		e.currentDeselectedRowKeys.forEach((key) => {
			delete selectedItemsObj.value[key];
		});
	}
	// Thêm các item được selected
	if (e.currentSelectedRowKeys.length > 0) {
		e.selectedRowsData.forEach((data) => {
			selectedItemsObj.value[data[props.keyExpr]] = data;
		});
	}

	emit('selectionChange', Object.values(selectedItemsObj.value));
};

/**
 * Khi build data xong thì select lại những item đã đc select
 * @author NTVu 7/11/2023
 */
const handleContentReady = () => {
	if (props.dataSource.length === 0) {
		setLoading(false);
		return;
	}
	// Navigate đến hàng đầu bảng
	dataGridEl.value.navigateToRow(props.dataSource[0][props.keyExpr]);
	if (scrollingMode.value !== 'standard') {
		setLoading(false);
		return;
	}
	// Select lại các item đã được select
	if (Object.keys(selectedItemsObj.value).length > 0) {
		dataGridEl.value.selectRows(Object.keys(selectedItemsObj.value), true);
	}
	// emit số bản ghi hiện có ra ngoài (Sử dụng khi phân trang front-end)
	emit('visibleRowsChanged', dataGridEl.value.getVisibleRows());

	setLoading(false);
};
/**
 * Kiểm soát data source để lưu lại checked row
 * @author NTVu 23/10/2023
 * @param {OptionChangedEvent} e
 */
const handleOptionChanged = (e) => {
	if (e.name === 'dataSource') {
		handleDataSourceChanged();
	}
};
/**
 * Set lại data source khi có thay đổi data source từ ngoài vào
 * Set lại trạng thái loading và scrolling mode
 * @param {OptionChangedEvent} e
 */
function handleDataSourceChanged() {
	setLoading(true);
	const currentPageSelectedKeys = dataGridEl.value.getSelectedRowKeys();

	// Ngăn event selection change nếu trạng hiện tại có item đc click, ko thì thôi
	isPreventSelectionChange.value = currentPageSelectedKeys.length !== 0;
	dataGridEl.value.deselectAll();
}
/**
 * Hủy check toàn bộ
 * @author NTVu 23/10/2023
 */
const deselectAll = () => {
	selectedItemsObj.value = {};
	emit('selectionChange', []);
	dataGridEl.value.deselectAll();
};
/**
 * Xử lí sự kiện click edit
 * @author NTVu 19/10/2023
 * @param {ColumnCellTemplateData} e
 */
const clickEdit = (e) => {
	emit('clickEdit', e.row.data);
};
/**
 * Xử lí sự kiện click remove
 * @author NTVu 19/10/2023
 * @param {ColumnCellTemplateData} e
 */
const clickRemove = (e) => {
	emit('clickDelete', e.row.data);
};

/**
 * Xử lý sự kiện thay đổi pageSize
 * @author NTVu 23/10/2023
 * @param {Object} e
 */
const handlePageSizeChange = (e) => {
	emit('pageSizeChanged', e.value);
	emitPageChange(1);
};

/**
 * Chuyển trang tiếp theo
 * @author NTVu 23/10/2023
 */
const nextPage = () => {
	if (props.pager.pageIndex >= totalPages) return;
	emitPageChange(props.pager.pageIndex + 1);
};

/**
 * Chuyển trang trước đó
 * @author NTVu 23/10/2023
 */
const prevPage = () => {
	if (props.pager.pageIndex <= 1) return;
	emitPageChange(props.pager.pageIndex - 1);
};
/**
 * Emit sự kiện thay đổi page
 * @param {number} page
 * @author NTVu 23/10/2023
 */
const emitPageChange = (page) => {
	if (props.pager.pageIndex === page) return;
	emit('pageChanged', page);
};

/**
 * Set thay đổi columns
 * @author NTVu 26/10/2023
 * @param {Array} cols
 */
const applyChangesColumnChooser = (cols) => {
	isShowColumnChooser.value = false;
	setLoading(true);
	tableCols.value = JSON.parse(JSON.stringify(cols));
};
/**
 * Set trạng thái cột về mặc định
 * @author NTVu 26/10/2023
 */
const applyDefault = () => {
	setLoading(true);
	tableCols.value = props.columns;
	isShowColumnChooser.value = false;
};

/**
 * Set loading
 * @author NTVu 01/11/2023
 * @param {boolean} loading
 */
function setLoading(loading) {
	scrollingMode.value = loading === true ? 'virtual' : 'standard';
	isLoading.value = loading;
}

/**
 * Thay đổi sort header
 * @param {ColumnCellTemplateData} dataHeader
 * @author NTVu 10/11/2023
 */
const handleClickHeader = (dataHeader) => {
	emit('sortChanged', dataHeader.column.dataField);
};

/**
 * Bỏ fix cột
 * @author NTVu 10/11/2023
 * @param {ColumnCellTemplateData} dataHeader
 */
const toggleFixCol = (dataHeader) => {
	dataGridEl.value.columnOption(dataHeader.column.caption, {
		fixed: !dataHeader.column.fixed,
		fixedPosition: 'left',
	});
};

/**
 * Các biến, hàm được expose ra ngoài
 */
defineExpose({
	deselectAll,
	showColumnChooser,
	setLoading,
});
</script>

<style scoped>
@import url(./table.css);
</style>
