import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';
import { RootState } from '../../store/store';
import { FormItem, Gender, stringFormItem } from '../../types';
import fileToBase64 from '../../libs/fileToBase64';
import { addForm } from '../../store/formsSlice';
import { formSchema } from '../../validation/formSchema';
import UncontrolledInput from './UncontrolledInput';

export default function UncontrolledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.countries.countries);
  const [invalidFeedback, setInvalidFeedback] = useState<stringFormItem>(getEmptyInvalidFeedback());
  const [files, setFiles] = useState<FileList | undefined>(undefined);

  const handleFileChange = (file: FileList | undefined) => {
    setFiles(file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const prepareForm: FormItem = {
      name: formData.get(getNameForm('name')) as string,
      email: formData.get(getNameForm('email')) as string,
      password: formData.get(getNameForm('password')) as string,
      age: Number(formData.get(getNameForm('age'))),
      gender: formData.get(getNameForm('gender')) as Gender,
      repeatPassword: formData.get(getNameForm('repeatPassword')) as string,
      files: files,
      fileBase64: files === undefined ? '' : await fileToBase64(files[0]),
      acceptTerms: formData.get(getNameForm('acceptTerms')) === 'on',
      country: formData.get(getNameForm('country')) as string,
    };

    try {
      await formSchema.validate(prepareForm, { abortEarly: false });
      setInvalidFeedback(getEmptyInvalidFeedback());
      dispatch(addForm(prepareForm));
      navigate('/');
    } catch (err) {
      setInvalidFeedback(parseNewInvalidFeedback(err));
    }
  };

  return (
    <div className='page mt-2'>
      <h1>Form (uncontrolled components)</h1>
      <form onSubmit={handleSubmit}>
        <UncontrolledInput name='name' label='Name' type='text' invalidFeedback={invalidFeedback} />

        <UncontrolledInput name='email' label='Email address' type='email' invalidFeedback={invalidFeedback} />

        <div className='row my-2'>
          <div className='col'>
            <UncontrolledInput name='password' label='Password' type='password' invalidFeedback={invalidFeedback} />
          </div>
          <div className='col'>
            <UncontrolledInput
              name='repeatPassword'
              label='Password repeat'
              type='password'
              invalidFeedback={invalidFeedback}
            />
          </div>
        </div>

        <UncontrolledInput name='age' label='Age' type='number' invalidFeedback={invalidFeedback} />

        <UncontrolledInput
          name='files'
          label='File'
          type='file'
          invalidFeedback={invalidFeedback}
          onFileChange={handleFileChange}
        />
        <UncontrolledInput
          name='gender'
          label='Gender'
          type='select'
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ]}
          invalidFeedback={invalidFeedback}
        />

        <UncontrolledInput
          name='country'
          label='Country'
          type='text'
          datalistOptions={countries}
          invalidFeedback={invalidFeedback}
        />

        <UncontrolledInput
          name='acceptTerms'
          label='Accept Terms and Conditions'
          type='checkbox'
          invalidFeedback={invalidFeedback}
        />

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
      <footer className='my-3'>
        <Link to='/'>Back</Link>
      </footer>
    </div>
  );
}

function parseNewInvalidFeedback(err: unknown) {
  const newError: stringFormItem = getEmptyInvalidFeedback();

  if (err instanceof ValidationError) {
    err.inner.forEach((error) => {
      if (error.path && error.path in newError) {
        newError[error.path as keyof FormItem] += `${error.message}. `;
      }
    });
  }
  return newError;
}

function getNameForm<K extends keyof FormItem>(key: K): K {
  return key;
}

function getEmptyInvalidFeedback() {
  const emptyInvalidFeedback: stringFormItem = {
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    repeatPassword: '',
    acceptTerms: '',
    files: '',
    fileBase64: '',
    country: '',
  };
  return emptyInvalidFeedback;
}
