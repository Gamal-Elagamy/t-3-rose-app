import { IUser } from './user';

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IRegisterResponse {
  code: number;
  status: string;
  message: string;
}

export interface IEmailVerificationResponse {
  code: number;
  status: string;
  message: string;
}
