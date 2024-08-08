import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useUpdateQuery(initialPage: number, initialSearch: string) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    const updateQueryParams = () => {
      const queryParams = new URLSearchParams(router.query as Record<string, string>);
      if (search) {
        queryParams.set('search', search);
      }
      queryParams.set('page', currentPage.toString());
      router.push(`?${queryParams.toString()}`, undefined);
    };

    updateQueryParams();
  }, [currentPage, search]);

  return { currentPage, setCurrentPage, search, setSearch };
}
