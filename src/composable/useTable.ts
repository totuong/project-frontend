import { computed, ref } from 'vue';
import { debounce, formatNumberSplitBy } from '../utills/CommonFunction';
import Enum from '../utills/Enum';
import { buildSortQuery as sortQuery } from '../utills/FilterTools';
export const useTable = (loadFunc) => {
	const pager = ref({
		pageSize: 15,
		pageIndex: 1,
		totalRecords: 10,
	});
	const searchValue = ref('');
	const itemsChecked = ref([]);
	const tableRef = ref();
	const searchDebounce = ref();
	const sort = ref({
		field: null,
		type: null,
	});

	const displayRowsOnPagingFrontend = ref([]);
	/**
	 * Set lại visible rows khi phân trang frontend
	 * @param {Array} rows
	 */
	const visibleRowsChanged = (rows) => {
		displayRowsOnPagingFrontend.value = rows;
	};

	/**
	 * Hiển thị số lượng item đã đc chọn, phân cách bởi dấu .
	 * @author NTVu 11/11/2023
	 */
	const displayItemsChecked = computed(() => {
		return formatNumberSplitBy(itemsChecked.value.length, '.');
	});

	/**
	 * Bỏ chọn toàn bộ
	 * @author NTVu 30/10/2023
	 */
	function deselectAll() {
		tableRef.value.deselectAll();
	}

	/**
	 * Show column choose
	 * @author NTVu 30/10/2023
	 */
	const showColumnChooser = (isShow = true) => {
		tableRef.value.showColumnChooser(isShow);
	};

	/**
	 * set thay đổi item checked
	 * @author NTVu 20/10/2023
	 * @param {any} value
	 */
	const selectionChange = (value) => {
		itemsChecked.value = value;
	};

	/**
	 * Update search và load dữ liệu
	 * @author NTVu 28/10/2023
	 * @param {string} newValue
	 */
	const handleSearchChange = (newValue) => {
		searchValue.value = newValue;
		if (!searchDebounce.value) {
			searchDebounce.value = debounce(() => {
				pager.value.pageIndex = 1;
				loadFunc();
			}, 600);
		}
		searchDebounce.value();
	};

	/**
	 * Đưa trang về 1 và search
	 * @author NTVu 28/10/2023
	 */
	const searchOnEnter = () => {
		pager.value.pageIndex = 1;
		loadFunc();
	};

	/**
	 * Thay đổi kiểu sắp xếp khi click header
	 * @param {string} fieldName
	 */
	const handleSortChange = (fieldName) => {
		if (sort.value.field === fieldName) {
			if (!sort.value.type) {
				sort.value.type = Enum.SortType.ASC;
			} else {
				sort.value.type =
					sort.value.type === Enum.SortType.DESC
						? null
						: Enum.SortType.DESC;
			}
		} else {
			sort.value.field = fieldName;
			sort.value.type = Enum.SortType.ASC;
		}
		loadFunc();
	};
	/**
	 * handle kích thước trang thay đổi
	 * @author NTVu 26/10/2023
	 * @param {number} newPage
	 */
	const handlePageChange = (newPage) => {
		pager.value.pageIndex = newPage;
		loadFunc();
	};

	/**
	 * handle trang thay đổi
	 * @author NTVu 26/10/2023
	 * @param {number} newPage
	 */
	const handlePageSizeChange = (newPage) => {
		pager.value.pageIndex = 1;
		pager.value.pageSize = newPage;
		loadFunc();
	};

	/**
	 * Build sorter theo convention để truyền lên backend
	 * @author NTVu 11/11/2023
	 * @returns {string}
	 */
	const buildSortQuery = () => {
		return sortQuery(sort);
	};

	return {
		displayRowsOnPagingFrontend,
		pager,
		itemsChecked,
		tableRef,
		searchValue,
		sort,
		visibleRowsChanged,
		deselectAll,
		showColumnChooser,
		selectionChange,
		handlePageChange,
		handlePageSizeChange,
		handleSearchChange,
		handleSortChange,
		buildSortQuery,
		searchOnEnter,
		displayItemsChecked,
	};
};
