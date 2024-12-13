const baseUrl = "http://localhost:3000";

// Chuyển đổi đường dẫn cục bộ thành URL hợp lệ
export const convertLocalPathToUrl = (path: string) => {
  if (!path) return null;
  const relativePath = path
    .replace(/\\/g, "/") // Thay backslash bằng slash
    .split("project-frontend")[1]; // Lấy phần sau "project-frontend"
  return relativePath ? `${baseUrl}${relativePath}` : null;
};
