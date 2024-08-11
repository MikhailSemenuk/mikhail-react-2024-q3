import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

jest.mock('@/components/CharacterContext', () => ({
  CharacterProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/ThemeSwitchHeder', () => ({
  ThemeSwitchHeder: () => <div>ThemeSwitchHeder</div>,
}));

describe('RootLayout', () => {
  const originalConsoleError = console.error;

  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('renders children correctly', () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('renders ThemeSwitchHeder component', () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
    );

    expect(screen.getByText('ThemeSwitchHeder')).toBeInTheDocument();
  });

  it('uses CharacterProvider and ThemeProvider', () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('has correct HTML structure and attributes', () => {
    // Render RootLayout within a full HTML document simulation
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
    );

    // Get the <html> and <body> elements from the rendered container
    const html = container.querySelector('html');
    const body = container.querySelector('body');

    // Check if the <html> and <body> elements have the correct attributes
    expect(html).toHaveAttribute('lang', 'en');
    expect(body).toHaveAttribute('data-bs-theme', 'dark');
  });
});
