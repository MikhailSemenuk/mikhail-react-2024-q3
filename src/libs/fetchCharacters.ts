import { LoaderFunctionArgs } from 'react-router-dom';
import { CharacterPages } from './../types';
import { getUserSearchLS } from './userSearchLS';

// TODO: delete isCallFromParams
export default async function fetchCharacters(
  search: string = '',
  page: string = '1',
  isCallFromParams: boolean = false,
): Promise<CharacterPages> {
  console.log(`${isCallFromParams ? 'params' : 'fetch'}   fetchCharacters search=${search} page=${page}`);

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
  const search = getUserSearchLS(); // TODO: Delete this later
  return await fetchCharacters(search, params.page ?? page, true);
}
