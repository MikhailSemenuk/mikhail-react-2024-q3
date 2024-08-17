import { FormEvent, useId } from 'react';
import { FormItem } from '../types';
import { useDispatch } from 'react-redux';
import { addForm } from '../formsSlice';
import { Link } from 'react-router-dom';
import { userSchema } from '../validation/UserValidation';
import { ValidationError } from 'yup';

function getNameForm<K extends keyof FormItem>(key: K): K {
  return key;
}

export default function UncontrolledForm() {
  const dispatch = useDispatch();

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const acceptTermsConditionsId = useId();

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
      await userSchema.validate(prepareForm, { abortEarly: false });
      dispatch(addForm(prepareForm));
    } catch (err) {
      if (err instanceof ValidationError) {
        err.inner.forEach((error) => {
          console.log(`Field: ${error.path}, Error: ${error.message}`);
        });
      }
    }
  };

  return (
    <div className='page'>
      <h1>UncontrolledForm page</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor={nameId} className='form-label'>
            Name
          </label>
          <input type='text' className='form-control' id={nameId} name={getNameForm('name')} />
        </div>

        <div className='mb-3'>
          <label htmlFor={emailId} className='form-label'>
            Email address
          </label>
          <input
            type='text'
            className='form-control'
            id={emailId}
            name={getNameForm('email')}
            aria-describedby='email-help'
          />
          <div id='email-help' className='form-text'>
            We will never share your email with anyone else.
          </div>
        </div>

        <div className='mb-3'>
          <label htmlFor={passwordId} className='form-label'>
            Password
          </label>
          <input type='password' className='form-control' id={passwordId} name={getNameForm('password')} />
        </div>

        <div className='mb-3 form-check'>
          <input
            type='checkbox'
            className='form-check-input'
            id={acceptTermsConditionsId}
            name={getNameForm('acceptTermsConditions')}
          />
          <label className='form-check-label' htmlFor={acceptTermsConditionsId}>
            Check me out
          </label>
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
