interface PageSearch {
  page: number;
  search: string;
  detailId: number | undefined;
}

export default function parseQueryContext(query: { [key: string]: string | string[] | undefined }): PageSearch {
  const pageParam = Array.isArray(query.page) ? query.page[0] : query.page;

  const detailIdParam = Array.isArray(query.detailId) ? query.detailId[0] : query.detailId;

  const page = Number(pageParam);
  const detailId = Number(detailIdParam);

  const validPage = !isNaN(page) && page > 0 ? page : 1;
  const validId = !isNaN(detailId) && detailId > 0 ? detailId : undefined;

  return {
    page: validPage,
    search: Array.isArray(query.search) ? query.search[0] : query.search || '',
    detailId: validId,
  };
}
