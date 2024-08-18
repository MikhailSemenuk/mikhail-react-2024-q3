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
