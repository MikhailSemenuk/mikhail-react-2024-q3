import SearchGroup from './components/SearchGroup';
import './App.css';
import { Character } from './types';
import CharacterCardList from './components/CharacterCardList';
import ErrorBoundary from './components/ErrorBoundary';
import SpinerLoading from './components/SpinerLoading';
import { useEffect, useState } from 'react';
import { getUserSearchLS } from './components/userSearchLS';
import fetchCharacters from './fetchCharacters';

function App() {
  const [userSearch, setUserSearch] = useState(getUserSearchLS());
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setCharacters([]);
    // Вызов fetchCharacters с новым значением userSearch
    fetchCharacters(userSearch).then((newCharacters) => {
      setIsLoading(false);
      setCharacters(newCharacters);
    });
  }, [userSearch]);

  return (
    <>
      <div className="app">
        <ErrorBoundary>
          <h1 className="text-center mt-2">Characters from Rick and Morty</h1>
          <SearchGroup userSearch={userSearch} setUserSearch={setUserSearch} />
          <SpinerLoading isLoading={isLoading}></SpinerLoading>
          <CharacterCardList characters={characters} />
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
