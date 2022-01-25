export interface ResponseResult<T> {
  $id: string;
  code: number;
  message: string;
  data: T
}
