export class PaginationResult<T> {
  data: T[];
  page: number;
  per_page: number;
  total_pages: number;
  totalrecord: number;
}
