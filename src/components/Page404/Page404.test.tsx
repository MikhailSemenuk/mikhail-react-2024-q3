import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Page404 from './Page404';

describe('Page404', () => {
  it('renders with default text', () => {
    render(
      <Router>
        <Page404 />
      </Router>,
    );
    expect(screen.getByTestId('Page404')).toHaveTextContent('Page 404');
  });
});
