// TODO: Problem if too big pagination

interface PageLinkProps {
  value: number | 'Previous' | 'Next';
  isActive?: boolean;
  isDisabled?: boolean;
}

interface PageLinkProps {
  value: number | 'Previous' | 'Next';
  isActive?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

function PageLink({ value, isActive = false, isDisabled = false, onClick }: PageLinkProps) {
  return (
    <li className={`page-item ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}>
      <a
        className="page-link"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        {value}
      </a>
    </li>
  );
}
function generateArray(n: number) {
  if (n <= 0) {
    return []; // Возвращаем пустой массив, если число меньше или равно 0
  }

  return Array.from({ length: n }, (_, index) => index + 1);
}

interface PaginationProps {
  currentPage: number;
  pages: number;
  setCurrentPage: (value: number) => void;
}

export default function Pagination({ currentPage, pages, setCurrentPage }: PaginationProps) {
  if (!pages) {
    return <></>;
  }

  const handlePageClick = (page: number) => {
    console.log('handlePageClick');
    if (page > 0 && page <= pages) {
      setCurrentPage(page);
    }
  };

  console.log(`рендер пагинации currentPage=${currentPage} + pages=${pages}`);
  return (
    <nav className="my-3" aria-label="Page navigation">
      <ul className="pagination">
        <PageLink value="Previous" isDisabled={currentPage === 1} onClick={() => handlePageClick(currentPage - 1)} />
        {generateArray(pages).map((pageNumber) => (
          <PageLink
            key={pageNumber}
            value={pageNumber}
            isActive={pageNumber === currentPage}
            onClick={() => handlePageClick(pageNumber)}
          />
        ))}
        <PageLink value="Next" isDisabled={currentPage === pages} onClick={() => handlePageClick(currentPage + 1)} />
      </ul>
    </nav>
  );
}
