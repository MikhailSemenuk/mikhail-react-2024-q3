import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, ThemeContext } from './ThemeProvider';
import { getThemeIsDark, saveThemeIsDark } from '../../libs/appLocalStorage';

vi.mock('../../libs/appLocalStorage', () => ({
  getThemeIsDark: vi.fn(),
  saveThemeIsDark: vi.fn(),
}));

describe('ThemeProvider', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should use default darkTheme value from local storage', () => {
    (getThemeIsDark as Mock).mockReturnValue(true);

    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ darkTheme }) => <div>Dark theme is {darkTheme ? 'enabled' : 'disabled'}</div>}
        </ThemeContext.Consumer>
      </ThemeProvider>,
    );

    expect(screen.getByText(/Dark theme is enabled/i)).toBeInTheDocument();
  });

  it('should toggle theme on button click', () => {
    (getThemeIsDark as Mock).mockReturnValue(false); // Start with light theme

    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ darkTheme, toggleTheme }) => (
            <>
              <div>Dark theme is {darkTheme ? 'enabled' : 'disabled'}</div>
              <button onClick={toggleTheme}>Toggle Theme</button>
            </>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>,
    );

    expect(screen.getByText(/Dark theme is disabled/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Toggle Theme/i));

    expect(screen.getByText(/Dark theme is enabled/i)).toBeInTheDocument();
    expect(saveThemeIsDark).toHaveBeenCalledWith(true); // Verify local storage update
  });

  it('should update body attribute and local storage on theme change', () => {
    (getThemeIsDark as Mock).mockReturnValue(false); // Start with light theme

    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ darkTheme }) => (
            <>
              <div>Dark theme is {darkTheme ? 'enabled' : 'disabled'}</div>
            </>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>,
    );

    expect(document.body.getAttribute('data-bs-theme')).toBe('light'); // Initial check

    // Simulate theme change
    (getThemeIsDark as Mock).mockReturnValue(true);
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ darkTheme }) => (
            <>
              <div>Dark theme is {darkTheme ? 'enabled' : 'disabled'}</div>
            </>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>,
    );

    expect(document.body.getAttribute('data-bs-theme')).toBe('dark');
    expect(saveThemeIsDark).toHaveBeenCalledWith(true);
  });
});
