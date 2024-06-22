export const LOCALKEYS = {
	TOKEN: 'TOKEN',
	REFRESH_TOKEN: 'REFRESH_TOKEN',
	USER: 'USER',
};

/**
 * @description Lưu thông tin vào localStorage
 * @param {string} key
 * @param {any} value
 */
export function setItemLocal(key:string, value:string) {
	localStorage.setItem(key, JSON.stringify(value));
}

/**
 * @description Lấy thông tin từ localStorage
 * @param {string} key
 * @returns
 */
export function getItemLocal(key:string) {
	const value = localStorage.getItem(key);
	if (value) {
		return JSON.parse(value);
	}
	return null;
}
/**
 * @description Lấy thông tin từ localStorage
 * @param {string} key
 * @returns
 */
export function delItemLocal(key:string) {
	localStorage.removeItem(key);
}
