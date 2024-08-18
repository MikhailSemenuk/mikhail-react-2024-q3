import { object, string, ObjectSchema, boolean, ref, number } from 'yup';
import { FormItem } from '../types';

export const userSchema: ObjectSchema<FormItem> = object({
  name: string()
    .required('Name is required')
    .matches(/^[A-Z][a-zA-Z]*$/, 'Name must start with an uppercase letter'),

  email: string().email('Email must be a valid email').required('Email is required'),

  password: string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @, #, $, %, &, *)',
    ),

  repeatPassword: string()
    .required('Password is required')
    .oneOf([ref('password')], 'Passwords must match')
    .required('Repeat Password is required'),

  gender: string()
    .oneOf(['male', 'female', 'other'], 'Please choose a valid gender')
    .required('Please choose your gender'),

  age: number().required('Age is required').positive('Age must be a positive number').integer('Age must be an integer'),

  acceptTerms: boolean().isTrue('You must accept the terms and conditions').required('Acceptance of terms is required'),
});
