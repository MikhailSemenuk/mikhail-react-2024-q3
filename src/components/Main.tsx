import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SavedForm } from '../types';

export default function Main() {
  // TODO: Maybe rewrite it
  const formArray = useSelector((state: { savedForm: { forms: SavedForm[] } }) => state.savedForm.forms);

  return (
    <div className='page'>
      <h1>Main page</h1>
      <nav>
        <ul>
          <li>
            <Link to='/UncontrolledForm'>Go to uncontrolled components form</Link>
          </li>
          <li>
            <Link to='/ReactHookForm'>Go to react hook form</Link>
          </li>
        </ul>
      </nav>

      <h2>Saved Forms</h2>
      <ul>
        {formArray.length > 0 ? (
          formArray.map((form, index) => (
            <li key={index}>
              Email: {form.email}, Password: {form.password}, Accepted Terms:{' '}
              {form.acceptTermsConditions ? 'Yes' : 'No'}
            </li>
          ))
        ) : (
          <li>No forms saved yet.</li>
        )}
      </ul>
    </div>
  );
}
