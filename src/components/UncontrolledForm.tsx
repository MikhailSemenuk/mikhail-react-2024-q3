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

// TODO: initial errorTextValid
// TODO: how make reset

export default function UncontrolledForm() {
  const dispatch = useDispatch();

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const acceptTermsConditionsId = useId();

  const [errorTextValid, setErrorTextValid] = useState<stringFormItem>({
    name: '',
    email: '',
    password: '',
    acceptTermsConditions: '',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const prepareForm: FormItem = {
      name: formData.get(getNameForm('name')) as string,
      email: formData.get(getNameForm('email')) as string,
      password: formData.get(getNameForm('password')) as string,
      acceptTermsConditions: formData.get(getNameForm('acceptTermsConditions')) === 'on',
    };

    try {
      console.log('отдаем на проверку форму', prepareForm);

      await userSchema.validate(prepareForm, { abortEarly: false });
      setErrorTextValid({
        name: '',
        email: '',
        password: '',
        acceptTermsConditions: '',
      });
      dispatch(addForm(prepareForm));
      console.log('все ок');
    } catch (err) {
      const newError: stringFormItem = {
        name: '',
        email: '',
        password: '',
        acceptTermsConditions: '',
      };

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
      setErrorTextValid(newError);
    }
  };

  const nameClass = classNames({
    'form-control': true,
    'is-invalid': errorTextValid.name,
  });

  const emailClass = classNames({
    'form-control': true,
    'is-invalid': errorTextValid.email,
  });

  const passwordClass = classNames({
    'form-control': true,
    'is-invalid': errorTextValid.password,
  });

  const acceptTermsConditionsClass = classNames({
    'me-1': true,
    'form-check-input': true,
    'is-invalid': errorTextValid.acceptTermsConditions,
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
            <div className='invalid-feedback'>{errorTextValid.name}</div>
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
            <div className='invalid-feedback'>{errorTextValid.email}</div>
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
            <div className='invalid-feedback'>{errorTextValid.password}</div>
          </div>
        </div>

        <div className='mb-3'>
          <input
            type='checkbox'
            name={getNameForm('acceptTermsConditions')}
            className={acceptTermsConditionsClass}
            id={acceptTermsConditionsId}
          />
          <label className='form-check-label' htmlFor={acceptTermsConditionsId}>
            Check me out
          </label>
          <div className='invalid-feedback'>{errorTextValid.acceptTermsConditions}</div>
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
