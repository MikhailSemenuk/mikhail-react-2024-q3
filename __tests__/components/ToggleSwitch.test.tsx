import { render, screen, fireEvent } from '@testing-library/react';
import * as useThemeModule from '@/hooks/useTheme';
import { ToggleSwitch } from '@/components/ToggleSwitch';

jest.mock('@/hooks/useTheme', () => ({
  useTheme: jest.fn(),
}));

describe('ToggleSwitch', () => {
  it('renders the toggle switch and label', () => {
    (useThemeModule.useTheme as jest.Mock).mockReturnValue({
      darkTheme: false,
      toggleTheme: jest.fn(),
    });

    render(<ToggleSwitch />);

    expect(screen.getByRole('switch')).toBeInTheDocument();
    expect(screen.getByLabelText(/Dark theme/i)).toBeInTheDocument();
  });

  it('sets the checked state based on darkTheme', () => {
    (useThemeModule.useTheme as jest.Mock).mockReturnValue({
      darkTheme: true,
      toggleTheme: jest.fn(),
    });

    render(<ToggleSwitch />);

    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('calls toggleTheme when the switch is changed', () => {
    const mockToggleTheme = jest.fn();

    (useThemeModule.useTheme as jest.Mock).mockReturnValue({
      darkTheme: false,
      toggleTheme: mockToggleTheme,
    });

    render(<ToggleSwitch />);

    fireEvent.click(screen.getByRole('switch'));

    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
