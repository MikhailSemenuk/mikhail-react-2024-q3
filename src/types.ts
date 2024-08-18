export type Gender = 'male' | 'female' | 'other';

export interface FormItem {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  age: number;
  gender: Gender;
  acceptTerms: boolean;
  files?: FileList | undefined;
  fileBase64?: string | undefined;
  country: string;
}

export type stringFormItem = Record<keyof FormItem, string>;

// TODO: separate this
export const emptyInvalidFeedback: stringFormItem = {
  name: '',
  email: '',
  password: '',
  age: '',
  gender: '',
  repeatPassword: '',
  acceptTerms: '',
  files: '',
  fileBase64: '',
  country: '',
};
