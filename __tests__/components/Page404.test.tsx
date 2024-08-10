import Custom404 from '@/_pages/404';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Page404', () => {
  it('renders with default text', () => {
    render(
      <Router>
        <Custom404></Custom404>
      </Router>,
    );
    expect(screen.getByTestId('Page404')).toHaveTextContent('Page 404');
  });
});
