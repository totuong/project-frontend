import type { RegisterFormData } from "../apis/auth";
import type { User } from "../user";

// Kiểu dữ liệu cho trạng thái của module Auth trong store
export interface AuthState {
    user: User | null; // Thông tin người dùng
    token: string | null;  // Token JWT
    isAuthenticated: boolean; // Trạng thái đăng nhập
  }
  
  // Kiểu dữ liệu cho các hành động Auth
  export interface AuthActions {
    login(email: string, password: string): Promise<void>;
    logout(): void;
    register(data: RegisterFormData): Promise<void>;
  }
  