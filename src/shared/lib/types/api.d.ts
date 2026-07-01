// API Response type
declare type IApiResponse<T> = IApiSuccess<T> | IApiError;

// API Error interface
declare type IApiError = {
  status: false;
  code: number;
  message: string;
  errors?: Array<{ path: string; message: string }>;
};

// API Success interface
declare type IApiSuccess<T> = {
  status: true;
  code: number;
  payload?: T;
  message?: string;
};
