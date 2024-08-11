import NotFound from '@/app/not-found';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Page404', () => {
  it('renders with default text', () => {
    render(
      <Router>
        <NotFound />
      </Router>,
    );
    expect(screen.getByTestId('Page404')).toHaveTextContent('Page 404');
  });
});
