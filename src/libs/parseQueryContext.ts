export default function parseQueryContext(query: { [key: string]: string | string[] | undefined }) {
  return {
    page: Array.isArray(query.page) ? query.page[0] : query.page || '1',
    search: Array.isArray(query.search) ? query.search[0] : query.search || '',
  };
}
