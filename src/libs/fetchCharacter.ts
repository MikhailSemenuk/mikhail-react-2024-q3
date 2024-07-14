import { Character } from '../types';

export default async function fetchCharacter(id: string): Promise<Character | undefined> {
  console.log(`1️ fetchCharacter = ${id}`);

  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!response.ok && response.status === 404) {
    return undefined;
  } else if (!response.ok) {
    throw new Error(`Network response was not ok (status ${response.status})`);
  }
  const data = await response.json();

  return data;
}
