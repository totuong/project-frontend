const baseUrl = "http://localhost:3000";

// Chuyển đổi đường dẫn cục bộ thành URL hợp lệ
export const convertLocalPathToUrl = (path: string) => {
  if (!path) return null;

  const normalizedPath = path.replace(/\\/g, "/");

  const relativePath = normalizedPath.split("project-frontend")[1];

  return relativePath ? `${baseUrl}${relativePath}` : null;
};
