import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';

export function useUpdateQuery(initialPage: number, initialSearch: string) {
  const router = useRouter();
  const pushRef = useRef(router.push); // fix looped render
  const queryRef = useRef(router.query);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    const updateQueryParams = () => {
      const queryParams = new URLSearchParams(queryRef.current as Record<string, string>);
      if (search) {
        queryParams.set('search', search);
      }
      queryParams.set('page', currentPage.toString());
      pushRef.current(`?${queryParams.toString()}`);
    };

    updateQueryParams();
  }, [currentPage, search]);

  return { currentPage, setCurrentPage, search, setSearch };
}
