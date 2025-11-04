
export enum FormStatus {
  IDLE = 'idle',
  SUBMITTING = 'submitting',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface FormData {
  username: string;
  email: string;
  phone: string;
}

export interface FormErrors {
  username?: string;
  email?: string;
  phone?: string;
}
