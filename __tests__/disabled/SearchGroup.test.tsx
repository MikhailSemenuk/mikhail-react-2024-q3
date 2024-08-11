import SearchGroup from '@/components/SearchGroup';
import { render, screen, fireEvent } from '@testing-library/react';

describe('SearchGroup', () => {
  it('renders the search input and button', () => {
    const mockSetUserSearch = jest.fn();

    render(<SearchGroup userSearch='' setUserSearch={mockSetUserSearch} />);

    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Search');
  });

  it('updates input value on change', () => {
    const mockSetUserSearch = jest.fn();

    render(<SearchGroup userSearch='' setUserSearch={mockSetUserSearch} />);

    const input = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(input, { target: { value: 'Rick' } });

    expect(input).toHaveValue('Rick');
  });

  it('calls setUserSearch with trimmed input value on button click', () => {
    const mockSetUserSearch = jest.fn();
    const initialInputValue = ' Rick ';

    render(<SearchGroup userSearch={initialInputValue} setUserSearch={mockSetUserSearch} />);

    const input = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(input, { target: { value: initialInputValue } });
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));

    expect(mockSetUserSearch).toHaveBeenCalledWith('Rick');
  });

  it('calls setUserSearch with trimmed input value on Enter key press', () => {
    const mockSetUserSearch = jest.fn();
    const initialInputValue = ' Rick ';

    render(<SearchGroup userSearch={initialInputValue} setUserSearch={mockSetUserSearch} />);

    const input = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(input, { target: { value: initialInputValue } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mockSetUserSearch).toHaveBeenCalledWith('Rick');
  });
});
