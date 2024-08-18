export interface FormItem {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  age: number;
  acceptTerms: boolean;
}

export type stringFormItem = Record<keyof FormItem, string>;

export const emptyInvalidFeedback: stringFormItem = {
  name: '',
  email: '',
  password: '',
  age: '',
  repeatPassword: '',
  acceptTerms: '',
};
