import { useAuditLogHttp } from "@/service/http.service";
import { reactive } from "vue";
import { useAuthStore } from "@/store/auth/index";
export interface LoginRequestDto {
  username: string,
  password: string
}
export interface RegisterRequestDto {
  username: string;
  password: string;
  confirmPassword: string,
  email: string | undefined;
  fullName: string;
  role: number;
}
export type UserResult = {
  id: string;
  name: string
  fullName: string
  username: string
  email: string
  role: number
};
class AuthService {
  constructor(
    private readonly httpService = useAuditLogHttp(),
    private readonly authStore = useAuthStore()
  ) { }

  async login(user: LoginRequestDto) {
    try {
      const loginResponse = await this.httpService.post<any>("auth/login", {
        username: user.username,
        password: user.password,
      });

      const token = loginResponse.data.data;

      const userResponse = await this.httpService.get<any>("auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData: UserResult = userResponse.data.data;
      this.authStore.login({
        jwtToken: token,
      });

      return userData; // Trả về thông tin người dùng
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async recovery(username: string, email: string) {
    return this.httpService
      .post<any>("auth/forgot-password", {
        username: username,
        email: email
      })
      .then((response) => {
        console.log("password recovery");
        console.log(response);
      });
  }


  async register(user: RegisterRequestDto) {
    return this.httpService.post<any>("auth/register", {
      username: user.username,
      password: user.password,
      confirmPassword: user.confirmPassword,
      email: user.email,
      fullName: user.fullName,
      role: user.role
    });
  }
}

let GLOBAL_AUTH_SERVICE: AuthService | null = null;

function useAuthService() {
  if (GLOBAL_AUTH_SERVICE === null) {
    GLOBAL_AUTH_SERVICE = new AuthService();
  }
  return reactive<AuthService>(GLOBAL_AUTH_SERVICE);
}
export { useAuthService };

