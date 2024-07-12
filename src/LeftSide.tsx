import { useEffect, useState } from 'react';
import { setUserSearchLS } from './libs/userSearchLS';
import { Character } from './types';
import fetchCharacters from './libs/fetchCharacters';

// TODO: Simplefy it temporarly
import CharacterCardList from './components/CharacterCardList';

export default function LeftSide() {
  const userSearch = 'Rick';
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    setCharacters([]);
    // TODO: Double fetch
    fetchCharacters(userSearch).then((newData) => {
      setUserSearchLS(userSearch);
      setCharacters(newData.characters);
    });
  }, [userSearch]);

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <CharacterCardList characters={characters} />
      </div>
    </>
  );
}
