import { FormEvent } from 'react';
import { FormItem } from '../types';
import { useDispatch } from 'react-redux';
import { addForm } from '../formsSlice';
import { Link } from 'react-router-dom';
import { userSchema } from '../validation/UserValidation';

// TODO: input email already have validation, I guess better disable or rewrite it

export default function UncontrolledForm() {
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const prepareForm: FormItem = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      acceptTermsConditions: formData.get('acceptTermsConditions') === 'on',
    };

    const isValid = await userSchema.isValid(prepareForm);
    console.log(`isValid = ${isValid}`);
    if (isValid) {
      dispatch(addForm(prepareForm));
    }
  };

  return (
    <div className='page'>
      <h1>UncontrolledForm page</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input type='text' className='form-control' id='name' name='name' />
        </div>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input type='email' className='form-control' id='email' name='email' aria-describedby='email-help' />
          <div id='email-help' className='form-text'>
            We will never share your email with anyone else.
          </div>
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input type='password' className='form-control' id='password' name='password' />
        </div>

        <div className='mb-3 form-check'>
          <input type='checkbox' className='form-check-input' id='acceptTermsConditions' name='acceptTermsConditions' />
          <label className='form-check-label' htmlFor='acceptTermsConditions'>
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
