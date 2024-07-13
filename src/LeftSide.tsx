// TODO: Simplefy it temporarly
import { useEffect, useState } from 'react';
// import { CharacterCardListPath } from './components/CharacterCardList';
import SearchGroup from './components/SearchGroup';
import ErrorBoundary from './components/ErrorBoundary';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { CharacterPages } from './types';
import CharacterCardList from './components/CharacterCardList';
import Pagination from './components/Pagination';
import fetchCharacters from './libs/fetchCharacters';
import { getUserSearchLS, setUserSearchLS } from './libs/userSearchLS';

export default function LeftSide() {
  const obj = useLoaderData() as CharacterPages;
  const { page } = useParams<{ page: string }>();
  if (page === undefined || isNaN(Number(page))) {
    console.error('redirect 404');
  }
  const navigate = useNavigate();

  const [userSearch, setUserSearch] = useState(getUserSearchLS());
  const [pages, setPages] = useState(obj.pages);
  const [characters, setCharacters] = useState(obj.characters);
  const [currentPage, setCurrentPage] = useState(Number(page));

  useEffect(() => {
    console.log('characters + currentPage изменился:', characters, currentPage);
    fetchCharacters(userSearch, `${currentPage}`).then((data) => {
      setPages(data.pages);
      setCharacters(data.characters);

      setUserSearchLS(userSearch); // TODO: Replace later
    });
  }, [userSearch, currentPage]);

  useEffect(() => {
    navigate(`/list/${currentPage}`);
  }, [currentPage, navigate]);

  return (
    <>
      <ErrorBoundary>
        <div className="app">
          <h1 className="text-center mt-2">Characters from Rick and Morty</h1>
          <div className="d-flex flex-column align-items-center">
            <SearchGroup userSearch={userSearch} setUserSearch={setUserSearch}></SearchGroup>
            <CharacterCardList characters={characters} />
            <Pagination currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage}></Pagination>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}
