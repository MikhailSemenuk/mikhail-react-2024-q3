import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { Link } from 'react-router-dom';
import { FormItemShort } from '../../types';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchemaShort } from '../../validation/formSchema';

export default function ReactHookForm() {
  const form = useForm<FormItemShort>({
    resolver: yupResolver(formSchemaShort),
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormItemShort) => {
    console.log('form submit', data);
  };

  return (
    <div className='page mt-2'>
      <h1>Form (uncontrolled components)</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='my-2'>
          <label htmlFor='name'>Username</label>
          <input type='text' id='name' {...register('name')} />
        </div>
        <p>{errors.name?.message}</p>

        <button type='submit' className='btn btn-primary'>
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
