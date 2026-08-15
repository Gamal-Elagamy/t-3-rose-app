export interface ResetPasswordPayload {
  newPassword: string;
  confirmPassword: string;
  token: string;
}

export interface IResetPassordTypeResponse {
  status: boolean;
  code: number;
  message: string;
  payload: string;
}
