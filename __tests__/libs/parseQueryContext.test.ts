import parseQueryContext from '@/libs/parseQueryContext';

describe('parseQueryContext', () => {
  it('should parse valid page, search, and detailId parameters', () => {
    const query = { page: '2', search: 'test', detailId: '10' };
    const result = parseQueryContext(query);

    expect(result).toEqual({
      page: 2,
      search: 'test',
      detailId: 10,
    });
  });

  it('should return default values for invalid or missing parameters', () => {
    const query = { page: 'invalid', detailId: undefined };
    const result = parseQueryContext(query);

    expect(result).toEqual({
      page: 1,
      search: '',
      detailId: undefined,
    });
  });

  it('should handle array values for parameters by using the first element', () => {
    const query = { page: ['3'], search: ['example'], detailId: ['20'] };
    const result = parseQueryContext(query);

    expect(result).toEqual({
      page: 3,
      search: 'example',
      detailId: 20,
    });
  });
});
