import ErrorBoundary from '@/app/error';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('ErrorBoundary', () => {
  it('renders with default text', () => {
    render(
      <Router>
        <ErrorBoundary />
      </Router>,
    );
    expect(screen.getByTestId('ErrorText')).toHaveTextContent('Dimensional glitch detected');
  });
});
