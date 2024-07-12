import { NavLink } from 'react-router-dom';

export default function Page404() {
  // TODO: Make 404 page beautiful
  return (
    <>
      <h2>Page 404</h2>
      <p className="fs-5">
        Return to the{' '}
        <NavLink to="/" className="link-body-emphasis">
          Homepage
        </NavLink>
        .
      </p>
    </>
  );
}
