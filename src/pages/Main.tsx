// TODO: Maybe rewrite it
//TODO: Beatiful forms
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormItem } from '../types';
import CardForm from '../components/CardForm';

export default function Main() {
  const formArray = useSelector((state: { savedForm: { forms: FormItem[] } }) => state.savedForm.forms);

  return (
    <div className='page p-1'>
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
      {formArray.length > 0 ? (
        formArray
          .slice()
          .reverse()
          .map((form, index) => <CardForm key={`formKey${index}`} formItem={form} isLastForm={index === 0} />)
      ) : (
        <p>No forms saved yet.</p>
      )}
    </div>
  );
}
