import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { Link } from 'react-router-dom';
import { FormItem } from '../../types';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from '../../validation/formSchema';
import InputWrapper from './InputWrapper';

export default function ReactHookForm() {
  const form = useForm<FormItem>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors, isValid, isDirty } = formState;

  const onSubmit = (data: FormItem) => {
    console.log('form submit', data);
  };

  return (
    <div className='page mt-2'>
      <h1>Form (uncontrolled components)</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper name='name' label='Name' type='text' errors={errors.name?.message} register={register} />
        <InputWrapper name='email' label='Email' type='email' errors={errors.email?.message} register={register} />
        <InputWrapper
          name='password'
          label='Password'
          type='password'
          errors={errors.password?.message}
          register={register}
        />
        <InputWrapper
          name='repeatPassword'
          label='Repeat Password'
          type='password'
          errors={errors.repeatPassword?.message}
          register={register}
        />
        <InputWrapper name='age' label='Age' type='number' errors={errors.age?.message} register={register} />
        <InputWrapper
          name='gender'
          label='Gender'
          type='select'
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
          errors={errors.gender?.message}
          register={register}
        />
        <InputWrapper
          name='acceptTerms'
          label='Accept Terms'
          type='checkbox'
          errors={errors.acceptTerms?.message}
          register={register}
        />
        <InputWrapper name='file' label='Upload File' type='file' errors={errors.file?.message} register={register} />
        <InputWrapper name='country' label='Country' type='text' errors={errors.country?.message} register={register} />

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
