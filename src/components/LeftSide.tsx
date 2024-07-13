import { useEffect, useState } from 'react';
import SearchGroup from './SearchGroup';
import ErrorBoundary from './ErrorBoundary';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { CharacterPages } from '../types';
import CharacterCardList from './CharacterCardList';
import Pagination from './Pagination';
import fetchCharacters from '../libs/fetchCharacters';
import { getUserSearchLS, setUserSearchLS } from '../libs/userSearchLS';

export default function LeftSide() {
  const navigate = useNavigate();

  const loaderData = useLoaderData() as CharacterPages;
  const { page } = useParams<{ page: string }>();
  const pageNumber = Number(page);
  if (!pageNumber) {
    navigate('/404');
  }

  const [userSearch, setUserSearch] = useState(getUserSearchLS());
  const [pages, setPages] = useState(loaderData.pages);
  const [characters, setCharacters] = useState(loaderData.characters);
  const [currentPage, setCurrentPage] = useState(pageNumber);

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

  const handleSearch = (searchValue: string) => {
    setUserSearch(searchValue);
    setCurrentPage(1);
  };

  return (
    <>
      <ErrorBoundary>
        <div className="page">
          <h1 className="text-center mt-2">Characters from Rick and Morty</h1>
          <div className="d-flex flex-column align-items-center">
            <SearchGroup userSearch={userSearch} setUserSearch={handleSearch}></SearchGroup>
            <CharacterCardList characters={characters} />
            <Pagination currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage}></Pagination>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}
