// TODO: submit in redux and redirect
// TODO: password validation broken
// TODO: maybe props name and error.?... - refactor

import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { Link } from 'react-router-dom';
import { FormItem } from '../../types';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from '../../validation/formSchema';
import InputWrapper from './InputWrapper';
import fileToBase64 from '../../libs/fileToBase64';

export default function ReactHookForm() {
  const form = useForm<FormItem>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });
  const { register, handleSubmit, formState, getValues, control } = form;
  const { errors, isValid, isDirty } = formState;

  const onSubmit = async (data: FormItem) => {
    const files = getValues('files');

    let fileBase64 = '';
    if (files instanceof FileList) {
      const newFile = files[0] || undefined;
      fileBase64 = await fileToBase64(newFile);
    } else {
      console.error('problem with convection in base64');
    }

    const preparedData: FormItem = {
      ...data,
      fileBase64,
    };

    try {
      await formSchema.validate(preparedData, { abortEarly: false });
      console.log('Form submit', preparedData);
    } catch (validationErrors) {
      console.error('Validation errors:', validationErrors);
    }
  };

  return (
    <div className='page mt-2'>
      <h1>Form (react-hook-form)</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper name='name' label='Name' type='text' errors={errors.name?.message} register={register} />

        <InputWrapper
          name='email'
          label='Email address'
          type='email'
          errors={errors.email?.message}
          register={register}
        />

        <div className='row my-2'>
          <div className='col'>
            <InputWrapper
              name='password'
              label='Password'
              type='password'
              errors={errors.password?.message}
              register={register}
            />
          </div>
          <div className='col'>
            <InputWrapper
              name='repeatPassword'
              label='Password repeat'
              type='password'
              errors={errors.repeatPassword?.message}
              register={register}
            />
          </div>
        </div>

        <InputWrapper name='age' label='Age' type='number' errors={errors.age?.message} register={register} />

        <InputWrapper name='files' label='File' type='file' errors={errors.files?.message} register={register} />

        <InputWrapper
          name='gender'
          label='Gender'
          type='select'
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ]}
          errors={errors.gender?.message}
          register={register}
        />

        <InputWrapper name='country' label='Country' type='text' errors={errors.country?.message} register={register} />

        <InputWrapper
          name='acceptTerms'
          label='Accept Terms and Conditions'
          type='checkbox'
          errors={errors.acceptTerms?.message}
          register={register}
        />

        <button type='submit' className='btn btn-primary' disabled={!isValid || !isDirty}>
          Submit
        </button>

        <DevTool control={control} />
      </form>
      <footer className='my-3'>
        <Link to='/'>Back</Link>
      </footer>
    </div>
  );
}
