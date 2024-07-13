import { LoaderFunctionArgs } from 'react-router-dom';
import { CharacterPages } from './../types';

export default async function fetchCharacters(search: string, page: string = '1'): Promise<CharacterPages> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${encodeURIComponent(search)}`,
  );
  if (!response.ok && response.status === 404) {
    return { characters: [], pages: 0 };
  } else if (!response.ok) {
    throw new Error(`Network response was not ok (status ${response.status})`);
  }
  const data = await response.json();

  return {
    characters: data.results,
    pages: data.info.pages,
  };
}

export async function fetchCharactersParams({ params }: LoaderFunctionArgs): Promise<CharacterPages> {
  const page = params.page ?? '1';
  const search = params.search ?? 'Rick'; // TODO: del

  console.log(JSON.stringify(params));

  console.log(`fetchCharactersParams search=${search} page=${page}`);

  return fetchCharacters(search, page);
}
