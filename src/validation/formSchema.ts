import { object, string, ObjectSchema, boolean, ref, number, mixed } from 'yup';
import { FormItem } from '../types';

const fileValidation = mixed<File>()
  .test('fileProvided', 'File is required', (value) => {
    return value !== undefined;
  })
  .test('fileSize', 'File size must be less than 2 MB', function (value) {
    if (value && value.size) {
      return value.size <= 2 * 1024 * 1024; // 2 MB
    }
    return true;
  })
  .test('fileType', 'Only PNG and JPEG formats are allowed', function (value) {
    if (value && value.type) {
      return ['image/png', 'image/jpeg'].includes(value.type);
    }
    return true;
  });

export const formSchema: ObjectSchema<FormItem> = object({
  name: string()
    .required('Name is required')
    .matches(/^[A-Z][a-zA-Z ]*$/, 'Name must start with an uppercase letter'),

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

  gender: string().oneOf(['male', 'female', 'other'], 'Please choose a gender').required('Please choose your gender'),

  age: number().required('Age is required').min(0, 'Age cannot be a negative value.').integer('Age must be an integer'),

  file: fileValidation,

  fileBase64: string(),

  country: string().required('Country is required'),

  acceptTerms: boolean().isTrue('You must accept the terms and conditions').required('Acceptance of terms is required'),
});
