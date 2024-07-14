import { useEffect, useState } from 'react';
import SearchGroup from './SearchGroup';
import { useNavigate, useParams } from 'react-router-dom';
import CharacterCardList from './CharacterCardList';
import Pagination from './Pagination';
import fetchCharacters from '../libs/fetchCharacters';
import { getUserSearchLS, setUserSearchLS } from '../libs/userSearchLS';
import { Character } from '../types';

export default function LeftSide() {
  const navigate = useNavigate();

  const { page } = useParams<{ page: string }>();
  const isPageNumber = !isNaN(Number(page));

  const [userSearch, setUserSearch] = useState(getUserSearchLS());
  const [pages, setPages] = useState(0);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(Number(page));

  if (!isPageNumber) {
    console.error('should redirect 404'); // TODO: add
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
      <div className="page">
        <h1 className="text-center mt-2">Characters from Rick and Morty</h1>
        <div className="d-flex flex-column align-items-center">
          <SearchGroup userSearch={userSearch} setUserSearch={handleSearch}></SearchGroup>
          <CharacterCardList characters={characters} />
          <Pagination currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage}></Pagination>
        </div>
      </div>
    </>
  );
}
