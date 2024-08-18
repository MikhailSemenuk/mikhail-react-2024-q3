export type Gender = 'male' | 'female' | 'other';

export interface FormItem {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  age: number;
  gender: Gender;
  acceptTerms: boolean;
}

export type stringFormItem = Record<keyof FormItem, string>;

export const emptyInvalidFeedback: stringFormItem = {
  name: '',
  email: '',
  password: '',
  age: '',
  gender: '',
  repeatPassword: '',
  acceptTerms: '',
};
