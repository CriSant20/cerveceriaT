export interface UserFormData {
  cedula: number;
  name: string;
  surname?: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface FormErrors {
  isRepeatPasswordNotEqual?: boolean;
  isPasswordTooShort?: boolean;
  isInvalidEmail?: boolean;
  isNameInvalid?: boolean;
  isWeakPassword?: boolean;
  isCedulaInvalid?: boolean;
}