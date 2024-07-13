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
  console.log('loaderData ', loaderData);
  const { page } = useParams<{ page: string }>();
  const isPageNumber = !isNaN(Number(page));

  const [userSearch, setUserSearch] = useState(getUserSearchLS());
  const [pages, setPages] = useState(loaderData.pages);
  const [characters, setCharacters] = useState(loaderData.characters);
  const [currentPage, setCurrentPage] = useState(Number(page));

  if (!isPageNumber) {
    console.log('should redirect 404');
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCharacters(userSearch, `${currentPage}`);
      setPages(data.pages);
      setCharacters(data.characters);

      setUserSearchLS(userSearch); // TODO: Replace later
    };
    fetchData();
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
