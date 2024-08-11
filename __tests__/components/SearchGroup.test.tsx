import { render, screen, fireEvent } from '@testing-library/react';
import SearchGroup from '@/components/SearchGroup';
import { useRouter } from 'next/navigation';
import { changePagesURL } from '@/libs/changePagesURL';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/libs/changePagesURL', () => ({
  changePagesURL: jest.fn(),
}));

describe('SearchGroup', () => {
  const mockChangePagesURL = changePagesURL as jest.MockedFunction<typeof changePagesURL>;
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the search input and button', () => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
    } as unknown as ReturnType<typeof useRouter>);

    render(<SearchGroup urlData={{ search: '', page: 1, detailId: undefined }} />);

    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Search');
  });

  it('updates input value on change', () => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
    } as unknown as ReturnType<typeof useRouter>);

    render(<SearchGroup urlData={{ search: '', page: 1, detailId: undefined }} />);

    const input = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(input, { target: { value: 'Rick' } });

    expect(input).toHaveValue('Rick');
  });

  it('calls changePagesURL with trimmed input value on button click', () => {
    const initialInputValue = ' Rick ';
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
    } as unknown as ReturnType<typeof useRouter>);

    render(<SearchGroup urlData={{ search: initialInputValue, page: 1, detailId: undefined }} />);

    const input = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(input, { target: { value: initialInputValue } });
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));

    expect(mockChangePagesURL).toHaveBeenCalledWith(expect.anything(), { search: 'Rick', page: 1 });
  });

  it('calls changePagesURL with trimmed input value on Enter key press', () => {
    const initialInputValue = ' Rick ';
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
    } as unknown as ReturnType<typeof useRouter>);

    render(<SearchGroup urlData={{ search: initialInputValue, page: 1, detailId: undefined }} />);

    const input = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(input, { target: { value: initialInputValue } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mockChangePagesURL).toHaveBeenCalledWith(expect.anything(), { search: 'Rick', page: 1 });
  });
});
