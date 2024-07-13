import { NavLink } from 'react-router-dom';

export default function Page404() {
  // TODO: Make 404 page beautiful
  return (
    <>
      <div className="page mt-2">
        <h1>Page 404</h1>
        <p className="fs-5">
          Return to the{' '}
          <NavLink to="/" className="link-body-emphasis">
            Homepage
          </NavLink>
          .
        </p>
      </div>
    </>
  );
}
