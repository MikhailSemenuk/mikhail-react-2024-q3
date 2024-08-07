import { describe, it, expect, vi, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToggleSwitch } from './ToggleSwitch';
import * as useThemeModule from '../../hooks/useTheme';

vi.mock('../../hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

describe('ToggleSwitch', () => {
  it('renders the toggle switch and label', () => {
    (useThemeModule.useTheme as Mock).mockReturnValue({
      darkTheme: false,
      toggleTheme: vi.fn(),
    });

    render(<ToggleSwitch />);

    expect(screen.getByRole('switch')).toBeInTheDocument();
    expect(screen.getByLabelText(/Dark theme/i)).toBeInTheDocument();
  });

  it('sets the checked state based on darkTheme', () => {
    (useThemeModule.useTheme as Mock).mockReturnValue({
      darkTheme: true,
      toggleTheme: vi.fn(),
    });

    render(<ToggleSwitch />);

    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('calls toggleTheme when the switch is changed', () => {
    const mockToggleTheme = vi.fn();

    (useThemeModule.useTheme as Mock).mockReturnValue({
      darkTheme: false,
      toggleTheme: mockToggleTheme,
    });

    render(<ToggleSwitch />);

    fireEvent.click(screen.getByRole('switch'));

    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
