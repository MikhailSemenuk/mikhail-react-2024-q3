interface PaginationProps {
  currentPage: number;
  pages: number;
}

interface PageLinkProps {
  value: number | 'Previous' | 'Next';
  isActive?: boolean;
  isDisabled?: boolean;
}

function PageLink({ value, isActive = false, isDisabled = false }: PageLinkProps) {
  return (
    <>
      <li className={`page-item ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''} `}>
        <a className="page-link" href="#">
          {value}
        </a>
      </li>
    </>
  );
}

function generateArray(n: number) {
  if (n <= 0) {
    return []; // Возвращаем пустой массив, если число меньше или равно 0
  }

  return Array.from({ length: n }, (_, index) => index + 1);
}

export default function Pagination({ currentPage, pages }: PaginationProps) {
  console.log(currentPage, pages); // TODO: delete
  return (
    <>
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <PageLink value="Previous" isDisabled={currentPage === 1}></PageLink>
          {generateArray(pages).map((pageNumber) => (
            <PageLink key={pageNumber} value={pageNumber} isActive={pageNumber === currentPage}></PageLink>
          ))}
          <PageLink value="Next" isDisabled={currentPage === pages}></PageLink>
        </ul>
      </nav>
    </>
  );
}
