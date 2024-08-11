import fetchCharacter from '@/api/fetchCharacter';
import { Character } from '@/types';
import { singleCharacter } from '../data/testData';

describe('fetchCharacter', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should return character data when the API request is successful', async () => {
    const mockResponse: Character = singleCharacter;

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await fetchCharacter(1);

    expect(result?.name).toEqual(mockResponse.name);
    expect(fetchMock).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1');
  });

  it('should return undefined when the API returns 404', async () => {
    fetchMock.mockResponseOnce('', { status: 404 });

    const result = await fetchCharacter(999);

    expect(result).toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/999');
  });

  it('should throw an error for other network errors', async () => {
    fetchMock.mockResponseOnce('', { status: 500 });

    await expect(fetchCharacter(1)).rejects.toThrow('Network response was not ok (status 500)');
    expect(fetchMock).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1');
  });
});
