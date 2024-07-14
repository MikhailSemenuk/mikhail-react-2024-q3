import { useEffect, useState } from 'react';
import SearchGroup from './SearchGroup';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import CharacterCardList from './CharacterCardList';
import Pagination from './Pagination';
import fetchCharacters from '../libs/fetchCharacters';
import { Character } from '../types';
import useUserSearch from '../libs/useUserSearch';
import RightPanel from './RightPanel';

export default function LeftSide() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const detailsURL: number | undefined = Number(searchParams.get('details')) ?? undefined;

  let { page } = useParams<{ page: string }>();
  const isPageNumber = !isNaN(Number(page));

  if (!isPageNumber) {
    // console.error('should redirect 404'); // TODO: add
    page = '1'; // TODO: temp
  }

  const [userSearch, setUserSearch] = useUserSearch();
  const [pages, setPages] = useState(0);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(Number(page));

  const [selectedId, setSelectedId] = useState<number | undefined>(detailsURL);
  const [isShowRightPanel, setShowRightPanel] = useState(detailsURL !== undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCharacters(userSearch, `${currentPage}`);
      setPages(data.pages);
      setCharacters(data.characters);
    };
    fetchData();
  }, [userSearch, currentPage]);

  useEffect(() => {
    console.log('сработал naigate');
    const newPath = `/list/${currentPage}` + location.search;
    navigate(newPath);
  }, [currentPage, navigate]);

  const handleSearch = (searchValue: string) => {
    setUserSearch(searchValue);
    setCurrentPage(1);
  };

  const closeRightPanel = () => {
    console.log('Clicked left side');

    if (isShowRightPanel) {
      console.log('панель открыта, скроем ее и обнулим id right');
      setShowRightPanel(false);
      setSelectedId(undefined);

      // update url
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('details');
      navigate(`${location.pathname}?${newSearchParams.toString()}`);
    } else {
      console.log('панель закрыта - заглушка - ничего не делаем');
    }
  };

  const handleCardClick = (id: number) => {
    console.log(`Clicked card id: ${id}`);

    if (!isShowRightPanel) {
      console.log('панель закрыта, откроем новое значение');
      setShowRightPanel(true);
      setSelectedId(id);

      // update url
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('details', id.toString());
      navigate(`${location.pathname}?${newSearchParams.toString()}`);
    }
  };

  return (
    <>
      <div className="page">
        <div className="d-flex">
          <div onClick={closeRightPanel}>
            <h1 className="text-center mt-2">Characters from Rick and Morty</h1>
            <div className="d-flex flex-column align-items-center">
              <SearchGroup userSearch={userSearch} setUserSearch={handleSearch}></SearchGroup>
              <CharacterCardList characters={characters} onCardClick={handleCardClick} />
              <Pagination currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage}></Pagination>
            </div>
          </div>
          <RightPanel
            selectedId={selectedId}
            isShowRightPanel={isShowRightPanel}
            handleClose={closeRightPanel}
          ></RightPanel>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
