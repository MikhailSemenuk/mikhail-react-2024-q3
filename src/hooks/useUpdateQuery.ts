import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';

export function useUpdateQuery(
  initialPage: number,
  initialSearch: string,
  initialDetailId: number | undefined = undefined,
) {
  const router = useRouter();
  const pushRef = useRef(router.push); // fix looped render
  const queryRef = useRef(router.query);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [detailId, setDetailId] = useState<number | undefined>(initialDetailId);

  useEffect(() => {
    const updateQueryParams = () => {
      const queryParams = new URLSearchParams(queryRef.current as Record<string, string>);
      if (search) {
        queryParams.set('search', search);
      }
      if (detailId !== undefined) {
        queryParams.set('detailId', String(detailId));
      } else {
        queryParams.delete('detailId');
      }
      queryParams.set('page', currentPage.toString());
      pushRef.current(`?${queryParams.toString()}`);
    };

    updateQueryParams();
  }, [currentPage, search, detailId]);

  return { currentPage, setCurrentPage, search, setSearch, detailId, setDetailId };
}
