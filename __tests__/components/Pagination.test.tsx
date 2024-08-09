import Pagination from '@/components/Pagination';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Pagination', () => {
  it('renders with class', () => {
    render(
      <Pagination
        currentPage={1}
        pages={5}
        setCurrentPage={function (value: number): void {
          console.log(value);
        }}
      />,
    );

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

  it('calls setCurrentPage when a page is clicked', () => {
    const mockSetCurrentPage = jest.fn();
    render(<Pagination currentPage={1} pages={5} setCurrentPage={mockSetCurrentPage} />);

    const secondPage = screen.getByText('2');
    fireEvent.click(secondPage);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  it('renders null when pages is zero', () => {
    render(
      <Pagination
        currentPage={1}
        pages={0}
        setCurrentPage={function (value: number): void {
          console.log(value);
        }}
      />,
    );

    // empty render
    expect(screen.queryByTestId('Pagination')).toBeNull();
  });
});
