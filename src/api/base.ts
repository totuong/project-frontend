// export type Result = {
//   success: boolean;
//   data?: any;
//   meta?: object
// };

export interface Result {
  message?: string;
  ok?: boolean;
  success: boolean;
  meta?: object;
  statusCode?: number;
}
