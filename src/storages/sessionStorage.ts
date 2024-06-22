export const SESSIONKEYS = {
	USER: 'USER',
};

/**
 * @description Lưu thông tin vào localStorage
 * @param {string} key
 * @param {string} value
 */
export function setItemSession(key:string, value:string) {
	sessionStorage.setItem(key, JSON.stringify(value));
}

/**
 * @description Lấy thông tin từ localStorage
 * @param {string} key
 * @returns
 */
export function getItemSession(key:string) {
	const value = sessionStorage.getItem(key);
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
export function delItemSession(key:string) {
	sessionStorage.removeItem(key);
}
