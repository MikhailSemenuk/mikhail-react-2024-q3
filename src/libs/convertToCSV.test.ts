import { describe, it, expect } from 'vitest';
import { convertToCSV } from './convertToCSV';
import { sampleCharacters, emptyCharacters, singleCharacter } from '../../tests/testData';
import { Character } from '../types';

describe('convertToCSV', () => {
  it('should convert an array of Character objects to a CSV string', () => {
    const expectedCSV =
      'id;name;status;species;gender;image;origin;location;episode\n1;Rick Sanchez;Alive;Human;Male;https://example.com/rick.png;Earth;Earth;S01E01 S01E02\n2;Morty Smith;Alive;Human;Male;https://example.com/morty.png;Earth;Earth;S01E01 S01E03';
    const result = convertToCSV(sampleCharacters);
    expect(result).toBe(expectedCSV);
  });

  it('should return an empty string when input array is empty', () => {
    const expectedCSV = '';
    const result = convertToCSV(emptyCharacters);
    expect(result).toBe(expectedCSV);
  });

  it('should handle episode array correctly', () => {
    const expectedCSV =
      'id;name;status;species;gender;image;origin;location;episode\n1;Rick Sanchez;Alive;Human;Male;https://example.com/rick.png;Earth;Earth;S01E01 S01E02';
    const result = convertToCSV(singleCharacter);
    expect(result).toBe(expectedCSV);
  });

  it('should handle object properties correctly', () => {
    type ExtendedCharacter = Character & { extraProperty?: unknown };

    const characters: ExtendedCharacter[] = [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        image: 'https://example.com/rick.png',
        origin: { name: 'Earth', url: 'https://example.com/earth' },
        location: { name: 'Earth', url: 'https://example.com/earth' },
        episode: ['S01E01', 'S01E02'],
        extraProperty: { key: 'value' },
      },
    ];
    const expectedCSV =
      'id;name;status;species;gender;image;origin;location;episode;extraProperty\n1;Rick Sanchez;Alive;Human;Male;https://example.com/rick.png;Earth;Earth;S01E01 S01E02;{"key":"value"}';
    const result = convertToCSV(characters);
    expect(result).toBe(expectedCSV);
  });
});
