import { useEffect, useState } from 'react';
import SearchGroup from './SearchGroup';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import CharacterCardList from './CharacterCardList';
import Pagination from './Pagination';
import fetchCharacters from '../libs/fetchCharacters';
import { Character } from '../types';
import useUserSearch from '../libs/useUserSearch';
import { DetailCharacterCard } from './DetailCharacterCard';
import fetchCharacter from '../libs/fetchCharacter';

export default function LeftSide() {
  // const navigate = useNavigate();

  let { page } = useParams<{ page: string }>();
  const isPageNumber = !isNaN(Number(page));

  const [searchParams] = useSearchParams();
  const detailsURL: string | undefined = searchParams.get('details') ?? undefined;

  console.log('url details = ' + detailsURL);

  if (!isPageNumber) {
    // console.error('should redirect 404'); // TODO: add
    page = '1'; // TODO: temp
  }

  const [userSearch, setUserSearch] = useUserSearch();
  const [pages, setPages] = useState(0);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(Number(page));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [detail, setDetail] = useState(detailsURL);
  const [detailCharacter, setDetailCharacter] = useState<Character | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCharacters(userSearch, `${currentPage}`);
      setPages(data.pages);
      setCharacters(data.characters);
    };
    fetchData();
  }, [userSearch, currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      if (!detail) {
        return;
      }

      const data = await fetchCharacter(detail);
      setDetailCharacter(data);
    };
    fetchData();
  }, [detail]);

  // useEffect(() => {
  //   console.log('сработал naigate');
  //   navigate(`/list/${currentPage}`);
  // }, [currentPage, navigate]);

  const handleSearch = (searchValue: string) => {
    setUserSearch(searchValue);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="page">
        <h1 className="text-center mt-2">Characters from Rick and Morty</h1>
        <div className="d-flex">
          <div className="d-flex flex-column align-items-center w-75">
            <SearchGroup userSearch={userSearch} setUserSearch={handleSearch}></SearchGroup>
            <CharacterCardList characters={characters} />
            <Pagination currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage}></Pagination>
          </div>
          <div>
            <DetailCharacterCard character={detailCharacter}></DetailCharacterCard>
          </div>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
