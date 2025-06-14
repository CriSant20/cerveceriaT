export interface UserFormData {
  name: string;
  surname?: string; // Hice surname opcional
  email: string;
  password: string;
  repeatPassword: string;
}

export type FormErrors = Partial<{
  isRepeatPasswordNotEqual: boolean;
  isPasswordTooShort: boolean;
  isInvalidEmail: boolean;
  isNameInvalid: boolean;
  isWeakPassword: boolean;
}>;
