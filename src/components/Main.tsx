import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <div>
      <h1>Main page</h1>
      <nav>
        <ul>
          <li>
            <Link to='/ReactHookForm'>Go to ReactHookForm</Link>
          </li>
          <li>
            <Link to='/UncontrolledForm'>Go to UncontrolledForm</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
