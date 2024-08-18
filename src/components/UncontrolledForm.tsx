// TODO: how make reset
// TODO: make form green after submit
// TODO: Show password button

import { FormEvent, useState } from 'react';
import { emptyInvalidFeedback, FormItem, stringFormItem } from '../types';
import { useDispatch } from 'react-redux';
import { addForm } from '../formsSlice';
import { Link } from 'react-router-dom';
import { userSchema } from '../validation/UserValidation';
import { ValidationError } from 'yup';
import InputWrapper from './InputWrapper';

export default function UncontrolledForm() {
  const dispatch = useDispatch();

  const [invalidFeedback, setInvalidFeedback] = useState<stringFormItem>(emptyInvalidFeedback);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const prepareForm: FormItem = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      acceptTerms: formData.get('acceptTerms') === 'on',
    };

    try {
      await userSchema.validate(prepareForm, { abortEarly: false });
      setInvalidFeedback(emptyInvalidFeedback);
      dispatch(addForm(prepareForm));
      console.log('все ок');
    } catch (err) {
      setInvalidFeedback(parseNewInvalidFeedback(err));
    }
  };

  return (
    <div className='page'>
      <h1>Form (uncontrolled components)</h1>
      <form onSubmit={handleSubmit}>
        <InputWrapper name='name' label='Name' type='text' invalidFeedback={invalidFeedback} />

        <InputWrapper name='email' label='Email address' type='email' invalidFeedback={invalidFeedback} />

        <InputWrapper name='password' label='Password' type='password' invalidFeedback={invalidFeedback} />

        <InputWrapper
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
  const newError: stringFormItem = { ...emptyInvalidFeedback };

  if (err instanceof ValidationError) {
    err.inner.forEach((error) => {
      if (error.path && error.path in newError) {
        newError[error.path as keyof FormItem] += `${error.message} `;
      }
    });
  }

  // TODO: del later
  console.log(newError);
  return newError;
}
