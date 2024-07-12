import SearchGroup from './components/SearchGroup';
import './App.css';
import { Character } from './types';
import CharacterCardList from './components/CharacterCardList';
import ErrorBoundary from './components/ErrorBoundary';
import SpinerLoading from './components/SpinerLoading';
import { useEffect, useState } from 'react';
import { getUserSearchLS, setUserSearchLS } from './libs/userSearchLS';
import Pagination from './components/Pagination';
import fetchCharacters from './libs/fetchCharacters';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Page404 from './components/Page404';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<AppInside />} />
      <Route path="*" element={<Page404 />} />
    </Route>,
  ),
);

function AppInside() {
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
      <div className="app">
        <ErrorBoundary>
          <h1 className="text-center mt-2">Characters from Rick and Morty</h1>
          <SearchGroup userSearch={userSearch} setUserSearch={setUserSearch} />
          <SpinerLoading isLoading={isLoading}></SpinerLoading>
          <CharacterCardList characters={characters} />
          <Pagination currentPage={1} pages={pages}></Pagination>
        </ErrorBoundary>
      </div>
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
