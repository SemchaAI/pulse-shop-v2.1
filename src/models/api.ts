export type TCountedType<T> = T & {
  _count: {
    productVariant: number;
  };
};

export interface PaginationMeta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export type PaginateOptions = {
  page?: number | string;
  perPage?: number | string;
};
export type PaginateFunction = <T, K>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any,
  args?: K,
  options?: PaginateOptions
) => Promise<PaginatedResult<T>>;
