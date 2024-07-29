import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeSwitchHeder } from './ThemeSwitchHeder';

vi.mock('../../hooks/useTheme', () => ({
  useTheme: () => ({
    darkTheme: false,
    toggleTheme: vi.fn(),
  }),
}));

describe('ThemeSwitchHeader', () => {
  it('renders the ToggleSwitch component', () => {
    render(<ThemeSwitchHeder />);

    const toggleSwitch = screen.getByRole('switch');
    expect(toggleSwitch).toBeInTheDocument();
  });
});
