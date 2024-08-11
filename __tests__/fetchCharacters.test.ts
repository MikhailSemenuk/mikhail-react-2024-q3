import fetchCharacters from '@/pages/page/fetchCharacters';
import { InfoResults } from '@/types';

describe('fetchCharacters', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should return data when the API request is successful', async () => {
    const mockResponse = {
      info: { count: 100, pages: 10 },
      results: [{ id: 1, name: 'Rick Sanchez' }],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await fetchCharacters('Rick', 1);

    expect(result).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/?page=1&name=Rick');
  });

  it('should return empty data when the API returns 404', async () => {
    fetchMock.mockResponseOnce('', { status: 404 });

    const result = await fetchCharacters('NonExistingCharacter', 1);

    const expectedResponse: InfoResults = {
      info: { count: 0, pages: 0 },
      results: [],
    };

    expect(result).toEqual(expectedResponse);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?page=1&name=NonExistingCharacter',
    );
  });

  it('should throw an error for other network errors', async () => {
    fetchMock.mockResponseOnce('', { status: 500 });

    await expect(fetchCharacters('Rick', 1)).rejects.toThrow('Network response was not ok (status 500)');
    expect(fetchMock).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/?page=1&name=Rick');
  });
});
