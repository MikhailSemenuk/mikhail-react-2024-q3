import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/components/Pagination';
import { useRouter } from 'next/navigation';
import { changePagesURL } from '@/libs/changePagesURL';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/libs/changePagesURL', () => ({
  changePagesURL: jest.fn(),
}));

describe('Pagination', () => {
  const mockChangePagesURL = changePagesURL as jest.MockedFunction<typeof changePagesURL>;
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with class', () => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
    } as unknown as ReturnType<typeof useRouter>);

    render(<Pagination urlData={{ search: '', page: 1, detailId: undefined }} pages={5} />);

    const ulElement = screen.getByTestId('Pagination-list');
    expect(ulElement).toHaveClass('pagination');

    // All btn-s
    const pageItems = screen.getAllByRole('listitem');
    expect(pageItems.length).toBe(7); // 5 pages + Previous + Next

    // Active btn
    expect(pageItems[1]).toHaveClass('active');

    // Previous btn
    expect(pageItems[0]).toHaveClass('page-item');
    expect(pageItems[0]).not.toHaveClass('active');
    expect(pageItems[0]).toHaveTextContent('«');

    // Next btn
    expect(pageItems[6]).toHaveClass('page-item');
    expect(pageItems[6]).not.toHaveClass('active');
    expect(pageItems[6]).toHaveTextContent('»');
  });

  it('calls changePagesURL when a page is clicked', () => {
    const mockRouter = { push: jest.fn() };
    mockUseRouter.mockReturnValue(mockRouter as unknown as ReturnType<typeof useRouter>);

    render(<Pagination urlData={{ search: '', page: 1, detailId: undefined }} pages={5} />);

    const secondPage = screen.getByText('2');
    fireEvent.click(secondPage);

    expect(mockChangePagesURL).toHaveBeenCalledWith(mockRouter, { search: '', page: 2, detailId: undefined });
  });

  it('renders null when pages is zero', () => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
    } as unknown as ReturnType<typeof useRouter>);

    render(<Pagination urlData={{ search: '', page: 1, detailId: undefined }} pages={0} />);

    // empty render
    expect(screen.queryByTestId('Pagination')).toBeNull();
  });
});
