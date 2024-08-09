import HomeForTest from '@/components/HomeForTest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
  it('renders a heading', () => {
    render(HomeForTest());

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
