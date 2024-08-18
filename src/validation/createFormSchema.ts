import { object, string, ObjectSchema, boolean, ref, number, mixed } from 'yup';
import { FormItem } from '../types';

export const createFormSchema = (validCountries: string[]): ObjectSchema<FormItem> => {
  return object({
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
      .required('Password repeat is required')
      .oneOf([ref('password')], 'Passwords must match'),

    gender: string().oneOf(['male', 'female', 'other'], 'Please choose a gender').required('Please choose your gender'),

    age: number()
      .required('Age is required')
      .min(0, 'Age cannot be a negative value.')
      .integer('Age must be an integer'),

    files: mixed<FileList>()
      .test('fileProvided', 'File is required', (value) => {
        return value && value.length > 0;
      })
      .test('fileSize', 'File size must be less than 2 MB', function (value) {
        if (value && value.length > 0) {
          return value[0].size <= 2 * 1024 * 1024; // 2 MB
        }
        return true;
      })
      .test('fileType', 'Only PNG and JPEG formats are allowed', function (value) {
        if (value && value.length > 0) {
          return ['image/png', 'image/jpeg'].includes(value[0].type);
        }
        return true;
      }),

    fileBase64: string(),

    country: string()
      .required('Country is required')
      .test('isValidCountry', 'Country is not in the list', (value) => {
        return validCountries.includes(value || '');
      }),

    acceptTerms: boolean()
      .isTrue('You must accept the terms and conditions')
      .required('Acceptance of terms is required'),
  });
};
