export type AccountSettingsFieldError = {
  path: string;
  message: string;
};

type AccountSettingsApiErrorPayload = {
  message: string;
  code: number;
  errors?: AccountSettingsFieldError[];
};

export class AccountSettingsApiError extends Error {
  readonly code: number;
  readonly errors?: AccountSettingsFieldError[];

  constructor({ message, code, errors }: AccountSettingsApiErrorPayload) {
    super(message);
    this.name = 'AccountSettingsApiError';
    this.code = code;
    this.errors = errors;
  }

  static fromApiResponse(response: {
    message: string;
    code: number;
    errors?: AccountSettingsFieldError[];
  }): AccountSettingsApiError {
    return new AccountSettingsApiError({
      message: response.message,
      code: response.code,
      errors: response.errors,
    });
  }
}

export function isAccountSettingsApiError(error: unknown): error is AccountSettingsApiError {
  return error instanceof AccountSettingsApiError;
}
