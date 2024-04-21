export const env = {
  // backend service
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL?.toString() ?? '$VITE_BACKEND_URL'.toString()
}
export default { env }
