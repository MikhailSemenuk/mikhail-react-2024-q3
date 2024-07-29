import { Character } from '../src/types';

export const sampleCharacters: Character[] = [
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
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'https://example.com/morty.png',
    origin: { name: 'Earth', url: 'https://example.com/earth' },
    location: { name: 'Earth', url: 'https://example.com/earth' },
    episode: ['S01E01', 'S01E03'],
  },
];

export const emptyCharacters: Character[] = [];

export const singleCharacter: Character[] = [
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
  },
];
