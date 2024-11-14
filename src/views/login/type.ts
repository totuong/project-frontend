interface RuleFormLogin {
  username: string;
  password: string;
}
interface RuleFormRegister {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  role: number;
}
export type { RuleFormLogin, RuleFormRegister };
