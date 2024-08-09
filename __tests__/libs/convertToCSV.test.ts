import { convertToCSV } from '../../src/libs/convertToCSV';
import { sampleCharacters, emptyCharacters } from '../../src/tests/testData';
// import { Character } from '../../src/types';

describe('convertToCSV', () => {
  const charactersOneArray = sampleCharacters.slice(0, 1);

  it('should convert an array of Character objects to a CSV string', () => {
    const expectedCSV = 'id;name;status;species';
    const result = convertToCSV(sampleCharacters);
    expect(result).toContain(expectedCSV);
  });

  it('should return an empty string when input array is empty', () => {
    const expectedCSV = '';
    const result = convertToCSV(emptyCharacters);
    expect(result).toBe(expectedCSV);
  });

  it('should handle episode array correctly', () => {
    const expectedCSV = 'id;name;status;species';
    const result = convertToCSV(charactersOneArray);
    expect(result).toContain(expectedCSV);
  });
});
