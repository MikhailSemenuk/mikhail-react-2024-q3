import { FormEvent, useId, useState } from 'react';
import { FormItem } from '../types';
import { useDispatch } from 'react-redux';
import { addForm } from '../formsSlice';
import { Link } from 'react-router-dom';
import { userSchema } from '../validation/UserValidation';
import { ValidationError } from 'yup';
import classNames from 'classnames';

function getNameForm<K extends keyof FormItem>(key: K): K {
  return key;
}

type stringFormItem = Record<keyof FormItem, string>;

// TODO: how make reset
// TODO: make form green after submit

export default function UncontrolledForm() {
  const dispatch = useDispatch();

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const acceptTermsConditionsId = useId();

  const emptyTextInvalid = {
    name: '',
    email: '',
    password: '',
    acceptTerms: '',
  };

  const [textInvalid, setTextInvalid] = useState<stringFormItem>(emptyTextInvalid);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const prepareForm: FormItem = {
      name: formData.get(getNameForm('name')) as string,
      email: formData.get(getNameForm('email')) as string,
      password: formData.get(getNameForm('password')) as string,
      acceptTerms: formData.get(getNameForm('acceptTerms')) === 'on',
    };

    try {
      await userSchema.validate(prepareForm, { abortEarly: false });
      setTextInvalid(emptyTextInvalid);
      dispatch(addForm(prepareForm));
      console.log('все ок');
    } catch (err) {
      const newError: stringFormItem = { ...emptyTextInvalid };

      if (err instanceof ValidationError) {
        err.inner.forEach((error) => {
          if (error.path && error.path in newError) {
            newError[error.path as keyof FormItem] += `${error.message} `;
          }
        });
      }

      // TODO: delete later
      if (err instanceof ValidationError) {
        err.inner.forEach((error) => {
          console.log(`Field: ${error.path}, Error: ${error.message}`);
        });
      }

      console.log(newError);
      setTextInvalid(newError);
    }
  };

  const nameClass = classNames({
    'form-control': true,
    'is-invalid': textInvalid.name,
  });

  const emailClass = classNames({
    'form-control': true,
    'is-invalid': textInvalid.email,
  });

  const passwordClass = classNames({
    'form-control': true,
    'is-invalid': textInvalid.password,
  });

  const acceptTermsConditionsClass = classNames({
    'me-1': true,
    'form-check-input': true,
    'is-invalid': textInvalid.acceptTerms,
  });

  return (
    <div className='page'>
      <h1>UncontrolledForm page</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor={nameId} className='form-label'>
            Name
          </label>

          <div className='input-group has-validation'>
            <input type='text' className={nameClass} id={nameId} name={getNameForm('name')} />
            <div className='invalid-feedback'>{textInvalid.name}</div>
          </div>
        </div>

        <div className='mb-3'>
          <label htmlFor={emailId} className='form-label'>
            Email address
          </label>

          <div className='input-group has-validation'>
            <input
              type='text'
              className={emailClass}
              id={emailId}
              name={getNameForm('email')}
              aria-describedby='email-help'
            />
            <div className='invalid-feedback'>{textInvalid.email}</div>
          </div>

          <div id='email-help' className='form-text'>
            We will never share your email with anyone else.
          </div>
        </div>

        <div className='mb-3'>
          <label htmlFor={passwordId} className='form-label'>
            Password
          </label>
          <div className='input-group has-validation'>
            <input type='password' className={passwordClass} id={passwordId} name={getNameForm('password')} />
            <div className='invalid-feedback'>{textInvalid.password}</div>
          </div>
        </div>

        <div className='mb-3'>
          <input
            type='checkbox'
            name={getNameForm('acceptTerms')}
            className={acceptTermsConditionsClass}
            id={acceptTermsConditionsId}
          />
          <label className='form-check-label' htmlFor={acceptTermsConditionsId}>
            accept Terms and Conditions agreement
          </label>
          <div className='invalid-feedback'>{textInvalid.acceptTerms}</div>
        </div>

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
