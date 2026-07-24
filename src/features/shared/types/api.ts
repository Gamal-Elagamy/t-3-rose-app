export interface ApiResponse<T> {
  status: boolean;
  message?: string;
  payload?: T;
}
