import { useGetAllCharactersQuery } from '../state/slices/charactersApi';
import { Character } from '../types';

export function useCharacters(search: string, page: number) {
  const { data, isLoading } = useGetAllCharactersQuery({ search, page: `${page}` });
  const characters: Character[] = data?.results ?? [];
  const pages: number = data?.info.pages ?? 0;

  return { characters, pages, isLoading };
}
