import { CharacterPages } from './../types';

export default async function fetchCharacters(characterName: string, page = 1): Promise<CharacterPages> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${encodeURIComponent(characterName)}`,
  );
  if (!response.ok && response.status === 404) {
    return { characters: [], pages: 0 };
  } else if (!response.ok) {
    throw new Error(`Network response was not ok (status ${response.status})`);
  }
  const data = await response.json();
  // return data.results;

  return {
    characters: data.results,
    pages: data.info.pages,
  };
}
