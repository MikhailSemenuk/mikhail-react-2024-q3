import { object, string, ObjectSchema, boolean } from 'yup';
import { FormItem } from '../types';

export const userSchema: ObjectSchema<FormItem> = object({
  name: string().required(),
  email: string().email().required(),
  password: string().min(4).max(10).required(),
  acceptTermsConditions: boolean().required(),
});

// export const userSchema = yup.object().shape({
//   name: yup.string().required(),
//   email: yup.string().email().required(),
//   password: yup.string().min(4).max(10).required(),
// });
