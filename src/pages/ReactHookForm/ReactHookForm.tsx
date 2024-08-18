import { useForm, useWatch } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FormItem } from '../../types';
import { yupResolver } from '@hookform/resolvers/yup';
import fileToBase64 from '../../libs/fileToBase64';
import ControlledInput from './ControlledInput';
import { addForm } from '../../store/formsSlice';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { createFormSchema } from '../../validation/createFormSchema';

export default function ReactHookForm() {
  const countries = useSelector((state: RootState) => state.countries.countries);
  const formSchema = createFormSchema(countries);
  const form = useForm<FormItem>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, getValues, control } = form;
  const { errors, isValid, isDirty } = formState;
  const password = useWatch({ control, name: 'password' });
  const repeatPassword = useWatch({ control, name: 'repeatPassword' });

  const onSubmit = async (data: FormItem) => {
    const files = getValues('files');

    let fileBase64 = '';
    if (files instanceof FileList) {
      const newFile = files[0] || undefined;
      fileBase64 = await fileToBase64(newFile);
    } else {
      console.error('problem with convection in base64');
    }

    const prepareForm: FormItem = { ...data };
    prepareForm['fileBase64'] = fileBase64;

    try {
      await formSchema.validate(prepareForm, { abortEarly: false });
      dispatch(addForm(prepareForm));
      navigate('/');
    } catch (validationErrors) {
      console.error('Validation errors:', validationErrors);
    }
  };

  return (
    <div className='page mt-2 p-2'>
      <h1>Form (react-hook-form)</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput name='name' label='Name' type='text' errors={errors.name?.message} register={register} />

        <ControlledInput
          name='email'
          label='Email address'
          type='email'
          errors={errors.email?.message}
          register={register}
        />

        <div className='row my-2'>
          <div className='col'>
            <ControlledInput
              name='password'
              label='Password'
              type='password'
              errors={errors.password?.message}
              register={register}
              passwordForIndicator={password}
            />
          </div>
          <div className='col'>
            <ControlledInput
              name='repeatPassword'
              label='Password repeat'
              type='password'
              errors={errors.repeatPassword?.message}
              register={register}
              passwordForIndicator={repeatPassword}
            />
          </div>
        </div>

        <ControlledInput name='age' label='Age' type='number' errors={errors.age?.message} register={register} />

        <ControlledInput name='files' label='File' type='file' errors={errors.files?.message} register={register} />

        <ControlledInput
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

        <ControlledInput
          name='country'
          label='Country'
          type='text'
          datalistOptions={countries}
          errors={errors.country?.message}
          register={register}
        />

        <ControlledInput
          name='acceptTerms'
          label='Accept Terms and Conditions'
          type='checkbox'
          errors={errors.acceptTerms?.message}
          register={register}
        />

        <button type='submit' className='btn btn-primary' disabled={!isValid || !isDirty}>
          Submit
        </button>
      </form>
      <footer className='my-3'>
        <Link to='/'>Back</Link>
      </footer>
    </div>
  );
}
