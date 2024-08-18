// TODO: how make reset
// TODO: make form green after submit
// TODO: Show password button
// TODO: Limit age min="0"

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
      name: formData.get(getNameForm('name')) as string,
      email: formData.get(getNameForm('email')) as string,
      password: formData.get(getNameForm('password')) as string,
      age: Number(formData.get(getNameForm('age'))),
      repeatPassword: formData.get(getNameForm('repeatPassword')) as string,
      acceptTerms: formData.get(getNameForm('acceptTerms')) === 'on',
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
    <div className='page m-2'>
      <h1>Form (uncontrolled components)</h1>
      <form onSubmit={handleSubmit}>
        <InputWrapper name='name' label='Name' type='text' invalidFeedback={invalidFeedback} />

        <InputWrapper name='email' label='Email address' type='email' invalidFeedback={invalidFeedback} />

        <InputWrapper name='password' label='Password' type='password' invalidFeedback={invalidFeedback} />

        <InputWrapper name='repeatPassword' label='Password repeat' type='password' invalidFeedback={invalidFeedback} />

        <InputWrapper name='age' label='Age' type='number' invalidFeedback={invalidFeedback} />

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
        newError[error.path as keyof FormItem] += `${error.message}. `;
      }
    });
  }

  // TODO: del later
  console.log(newError);
  return newError;
}

function getNameForm<K extends keyof FormItem>(key: K): K {
  return key;
}
