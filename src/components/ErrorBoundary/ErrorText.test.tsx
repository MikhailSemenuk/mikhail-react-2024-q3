import { describe, expect, it } from 'vitest';
import { ErrorText } from './ErrorText';
import { render, screen } from '@testing-library/react';

describe('ErrorText', () => {
  it('render with default text', () => {
    render(<ErrorText></ErrorText>);
    expect(screen.getByTestId('ErrorText')).toHaveTextContent('Dimensional glitch detected');
  });
});
