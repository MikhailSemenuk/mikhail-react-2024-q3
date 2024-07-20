import generateArray from '../libs/generateArray';

interface PaginationProps {
  currentPage: number;
  pages: number;
  setCurrentPage: (value: number) => void;
}

export default function Pagination({ currentPage, pages, setCurrentPage }: PaginationProps) {
  const LimitPagesWithNormalWidth = 20;
  const isMinWidth = pages > LimitPagesWithNormalWidth;

  if (!pages) {
    return null;
  }

  const handlePageClick = (page: number) => {
    if (page > 0 && page <= pages) {
      setCurrentPage(page);
    }
  };

  return (
    <nav className="my-3" aria-label="Page navigation">
      <ul className={'pagination flex-wrap ' + (isMinWidth ? 'pagination-sm' : '')}>
        <PageLink value="Previous" isDisabled={currentPage === 1} onClick={() => handlePageClick(currentPage - 1)} />
        {generateArray(pages).map((pageNumber) => (
          <PageLink
            key={pageNumber}
            value={pageNumber}
            isActive={pageNumber === currentPage}
            isMinWidth={isMinWidth}
            onClick={() => handlePageClick(pageNumber)}
          />
        ))}
        <PageLink value="Next" isDisabled={currentPage === pages} onClick={() => handlePageClick(currentPage + 1)} />
      </ul>
    </nav>
  );
}

interface PageLinkProps {
  value: number | 'Previous' | 'Next';
  isActive?: boolean;
  isDisabled?: boolean;
  isMinWidth?: boolean;
  onClick: () => void;
}

function PageLink({ value, isActive = false, isDisabled = false, isMinWidth = false, onClick }: PageLinkProps) {
  const getLabel = (value: number | 'Previous' | 'Next') => {
    if (value === 'Previous') return 'Previous';
    if (value === 'Next') return 'Next';
    return undefined;
  };

  const getContent = (value: number | 'Previous' | 'Next') => {
    if (value === 'Previous') {
      return <span aria-hidden="true">&laquo;</span>;
    } else if (value === 'Next') {
      return <span aria-hidden="true">&raquo;</span>;
    }
    return value;
  };

  return (
    <li className={`page-item ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}>
      <a
        className={'page-link ' + (isMinWidth ? 'px-1' : '')}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        aria-label={getLabel(value)}
      >
        {getContent(value)}
      </a>
    </li>
  );
}
