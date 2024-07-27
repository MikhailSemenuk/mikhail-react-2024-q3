import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpinnerLoading } from './SpinnerLoading';

describe('SpinnerLoading', () => {
  it('displays "Loading..." text when isLoading is true', () => {
    render(<SpinnerLoading isLoading={true} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('returns null when isLoading is false', () => {
    render(<SpinnerLoading isLoading={false} />);

    expect(screen.queryByText('Loading...')).toBeNull();
    expect(screen.queryByRole('status')).toBeNull();
  });
});
