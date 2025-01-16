export type Result = {
  success: boolean;
  data?: any;
  meta?: Meta;
  statusCode: number;
};

type Meta = {
  message: string;
  page: number;
  total: number;
};
