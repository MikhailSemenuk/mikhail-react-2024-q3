import { render } from '@testing-library/react';
import Layout from '@/components/Layout';

jest.mock('@/components/ThemeSwitchHeder', () => ({
  ThemeSwitchHeder: () => <div data-testid='theme-switch-header'>ThemeSwitchHeder Mock</div>,
}));

describe('Layout component', () => {
  it('renders the ThemeSwitchHeder component', () => {
    const { getByTestId } = render(
      <Layout>
        <div>Test Child</div>
      </Layout>,
    );

    expect(getByTestId('theme-switch-header')).toBeInTheDocument();
  });

  it('renders children passed to Layout', () => {
    const { getByText } = render(
      <Layout>
        <div>Test Child</div>
      </Layout>,
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });
});
