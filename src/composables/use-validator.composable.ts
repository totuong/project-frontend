import type { FormItemRule } from "element-plus";

type validateTypes =
  | "required"
  | "email"
  | "password"
  | "confirmPassword"
  | "phone"
  | "username"
  | "fullName"
  | "termsConditions";

const validator: Record<validateTypes, FormItemRule> = {
  username: {
    type: "string",
    validator: (rule, value, callback) => {
      const pattern = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/; // Bắt đầu bằng chữ cái, dài từ 4 đến 20 ký tự
      if (!value) {
        callback(new Error("Username is required"));
      } else if (value.length < 4 || value.length > 20) {
        callback(new Error("Username must be between 4 and 20 characters long."));
      } else if (!/^[a-zA-Z]/.test(value)) {
        callback(new Error("Username must start with a letter."));
      } else if (!pattern.test(value)) {
        callback(new Error("Username can only contain letters, numbers, and underscores."));
      } else {
        callback(); 
      }
    },
    required: true,
    trigger: "blur",
  },
  required: {
    required: true,
    message: "This field is required",
    trigger: "blur",
  },
  email: {
    type: "email",
    trigger: "blur",
    message: "Please enter a valid email address",
  },
  fullName: {
    type: "string",
    pattern: /^[^\d!@#$%^&*()_+=-]+$/, // Kiểm tra không chứa số và ký tự đặc biệt
    min: 2,
    max: 50,
    message: "Full name is invalid",
    trigger: "blur",
  },

  password: {
    type: "string",
    min: 6,
    message: "Password must be at least 6 characters long",
    // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/g,
    // message:
    //   "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    trigger: "blur",
  },

  phone: {
    type: "string",
    min: 5,
    max: 16,
    message: "Please enter a valid phone number",
    trigger: "blur",
  }
};

function useValidators() {
  return validator;
}

export { useValidators };
