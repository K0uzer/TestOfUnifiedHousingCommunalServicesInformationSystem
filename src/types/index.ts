export interface Meter {
  id: string;
  _type: string[];
  area: { id: string };
  is_automatic: boolean | null;
  description: string;
  installation_date: string;
  initial_values: number[];
}

export interface Area {
  id: string;
  number: number;
  str_number: string;
  str_number_full: string;
  house: {
    address: string;
    id: string;
  };
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
