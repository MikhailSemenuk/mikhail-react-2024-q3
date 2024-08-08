interface PageSearch {
  page: number;
  search: string;
}

export default function parseQueryContext(query: { [key: string]: string | string[] | undefined }): PageSearch {
  const pageParam = Array.isArray(query.page) ? query.page[0] : query.page;

  const page = Number(pageParam);
  const validPage = !isNaN(page) && page > 0 ? page : 1;

  return {
    page: validPage,
    search: Array.isArray(query.search) ? query.search[0] : query.search || '',
  };
}
