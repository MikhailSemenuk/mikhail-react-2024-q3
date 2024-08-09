import { render, screen } from '@testing-library/react';
import { ThemeSwitchHeder } from '@/components/ThemeSwitchHeder';

jest.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    darkTheme: false,
    toggleTheme: jest.fn(),
  }),
}));

describe('ThemeSwitchHeader', () => {
  it('renders the ToggleSwitch component', () => {
    render(<ThemeSwitchHeder />);

    const toggleSwitch = screen.getByRole('switch');
    expect(toggleSwitch).toBeInTheDocument();
  });
});
