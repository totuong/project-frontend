import { inject } from 'vue';

/**
 * Hook sử dụng thông báo lỗi
 * @returns
 */
export const useNotification = () => {
	/**
	 * Mở thông báo lỗi
	 * @type {Function}
	 * @param {string} title
	 * @param {string} content
	 * @param {Function} onClose
	 */
	const openDialogError = inject('openDialogError')as Function;

	return {
		openDialogError,
	};
};
