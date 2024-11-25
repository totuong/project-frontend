import Cookies from 'js-cookie';

// Key lưu trữ token (có thể thay đổi theo dự án)
const TOKEN_KEY = 'auth_token';

/**
 * Lấy token từ cookie hoặc localStorage
 */
export function getToken(): string | null {
  return Cookies.get(TOKEN_KEY) || null;
}

/**
 * Lưu token vào cookie (hoặc localStorage nếu cần)
 * @param token - Chuỗi token
 * @param expires - Thời gian tồn tại (ngày)
 */
export function setToken(token: string, expires = 7): void {
  Cookies.set(TOKEN_KEY, token, { expires });
}

/**
 * Xóa token khỏi cookie (hoặc localStorage)
 */
export function removeToken(): void {
  Cookies.remove(TOKEN_KEY);
}
