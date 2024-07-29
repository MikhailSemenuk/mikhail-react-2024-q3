import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useUserSearch from './useUserSearch';

export function useSearchAndPagination() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let detailsURL: number | undefined = Number(searchParams.get('details')) ?? undefined;
  if (detailsURL === 0) {
    detailsURL = undefined;
  }
  const isDetailsNumber = !Number.isNaN(detailsURL);

  const { page } = useParams<{ page: string }>();
  const isPageNumber = !isNaN(Number(page));

  const [userSearch, setUserSearch] = useUserSearch();
  const [currentPage, setCurrentPage] = useState(Number(page));

  useEffect(() => {
    const newPath = `/list/${currentPage}` + location.search;
    navigate(newPath);
  }, [currentPage, navigate]);

  useEffect(() => {
    if (!isPageNumber || !isDetailsNumber) {
      navigate('/404', { replace: true });
    }
  }, [isPageNumber, isDetailsNumber, navigate]);

  return {
    userSearch,
    setUserSearch,
    currentPage,
    setCurrentPage,
    detailsURL,
  };
}
