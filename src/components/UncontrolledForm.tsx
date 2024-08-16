import { useRef, useId } from 'react';
import { SavedForm } from '../types';
import { useDispatch } from 'react-redux';
import { addForm } from '../formsSlice';
import { Link } from 'react-router-dom';

export default function UncontrolledForm() {
  const dispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const emailId = useId();
  const passwordId = useId();
  const checkboxId = useId();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current?.value ?? '';
    const password = passwordRef.current?.value ?? '';
    const acceptTermsConditions = checkboxRef.current?.checked ?? false;

    const newForm: SavedForm = {
      email,
      password,
      acceptTermsConditions,
    };

    dispatch(addForm(newForm));
  };

  return (
    <div className='page'>
      <h1>UncontrolledForm page</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor={emailId} className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id={emailId}
            aria-describedby={`${emailId}-help`}
            ref={emailRef}
          />
          <div id={`${emailId}-help`} className='form-text'>
            We will never share your email with anyone else.
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor={passwordId} className='form-label'>
            Password
          </label>
          <input type='password' className='form-control' id={passwordId} ref={passwordRef} />
        </div>
        <div className='mb-3 form-check'>
          <input type='checkbox' className='form-check-input' id={checkboxId} ref={checkboxRef} />
          <label className='form-check-label' htmlFor={checkboxId}>
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
