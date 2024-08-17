import { object, string, ObjectSchema, boolean } from 'yup';
import { FormItem } from '../types';

export const userSchema: ObjectSchema<FormItem> = object({
  name: string().required().min(4),
  email: string().email().required(),
  password: string().min(4).max(10).required(),
  acceptTerms: boolean().isTrue().required(),
});
