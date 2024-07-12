import { useEffect, useState } from 'react';
import { getUserSearchLS, setUserSearchLS } from './libs/userSearchLS';
import { Character } from './types';
import fetchCharacters from './libs/fetchCharacters';
import SearchGroup from './components/SearchGroup';
import SpinerLoading from './components/SpinerLoading';
import CharacterCardList from './components/CharacterCardList';
import Pagination from './components/Pagination';

export default function LeftSide() {
  const [userSearch, setUserSearch] = useState(getUserSearchLS());
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setCharacters([]);
    // TODO: Double fetch
    fetchCharacters(userSearch).then((newData) => {
      setUserSearchLS(userSearch);
      setIsLoading(false);
      setCharacters(newData.characters);
      setPages(newData.pages);
    });
  }, [userSearch]);

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <SearchGroup userSearch={userSearch} setUserSearch={setUserSearch} />
        <SpinerLoading isLoading={isLoading}></SpinerLoading>
        <CharacterCardList characters={characters} />
        <Pagination currentPage={1} pages={pages}></Pagination>
      </div>
    </>
  );
}
