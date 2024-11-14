export interface FilterStateTypes {
  paymentDate: string;
  publisherIds: any[];
  limit: number;
  page: number;
}

export interface StateTypes {
  show: boolean;
  invoices: any[];
  invoiceIds: any[];
  query: FilterStateTypes;
  isOnTax: boolean;
  pagination: {
    total: number;
  };
  loading: boolean;
  exportLoading: boolean;
}
