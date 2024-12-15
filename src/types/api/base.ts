export type Result = {
  success: boolean;
  data?: any;
  meta?: Meta;
};

type Meta = {
  message: string;
  page?: number;
  total?: number;
};
