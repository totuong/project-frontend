export const env = {
  // backend service
  VITE_APP_BASE_API: import.meta.env.VITE_APP_BASE_API?.toString() ?? '$VITE_APP_BASE_API'.toString()
}
export default { env }
