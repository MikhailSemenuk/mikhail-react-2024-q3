import { useEffect, useState } from 'react';
import SearchGroup from './SearchGroup';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import CharacterCardList from './CharacterCardList';
import Pagination from './Pagination';
import fetchCharacters from '../libs/fetchCharacters';
import { Character } from '../types';
import useUserSearch from '../libs/useUserSearch';
import RightPanel from './RightPanel';
import updateURL from '../libs/updateURL';
import SpinerLoading from './SpinerLoading';

export default function Main() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  let detailsURL: number | undefined = Number(searchParams.get('details')) ?? undefined;
  if (detailsURL === 0) {
    detailsURL = undefined;
  }
  const isDetailsNumber = !Number.isNaN(detailsURL);

  const { page } = useParams<{ page: string }>();
  const isPageNumber = !isNaN(Number(page));

  const [userSearch, setUserSearch] = useUserSearch();
  const [pages, setPages] = useState(0);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(Number(page));

  const [isLoading, setIsLoading] = useState(false);

  const [selectedId, setSelectedId] = useState<number | undefined>(detailsURL);
  const [isShowRightPanel, setShowRightPanel] = useState(detailsURL !== undefined);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchCharacters(userSearch, `${currentPage}`);
      setPages(data.pages);
      setCharacters(data.characters);
      setIsLoading(false);
    };
    fetchData();
  }, [userSearch, currentPage]);

  useEffect(() => {
    const newPath = `/list/${currentPage}` + location.search;
    navigate(newPath);
  }, [currentPage, navigate]);

  useEffect(() => {
    if (!isPageNumber || !isDetailsNumber) {
      navigate('/404', { replace: true });
    }
  }, [isPageNumber, isDetailsNumber, navigate]);

  const handleSearch = (searchValue: string) => {
    setUserSearch(searchValue);
    setCurrentPage(1);
  };

  const closeRightPanel = () => {
    if (isShowRightPanel) {
      setShowRightPanel(false);
      setSelectedId(undefined);
      updateURL(searchParams, navigate, undefined);
    }
  };

  const openRightPanel = (id: number) => {
    if (!isShowRightPanel) {
      setShowRightPanel(true);
      setSelectedId(id);
      updateURL(searchParams, navigate, id);
    } else {
      console.log('уже открыта карточка');
      setSelectedId(id);
      updateURL(searchParams, navigate, id);
    }
  };

  return (
    <div className="page">
      <div className="d-flex">
        <div className="flex-grow-1" onClick={closeRightPanel}>
          <h1 className="text-center mt-2">Characters from Rick and Morty</h1>
          <div className="d-flex flex-column align-items-center">
            <SearchGroup userSearch={userSearch} setUserSearch={handleSearch}></SearchGroup>
            <SpinerLoading isLoading={isLoading}></SpinerLoading>
            {!isLoading && (
              <>
                <CharacterCardList characters={characters} onCardClick={openRightPanel} />
                <Pagination currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage}></Pagination>
              </>
            )}
          </div>
        </div>
        <RightPanel
          selectedId={selectedId}
          isShowRightPanel={isShowRightPanel}
          handleClose={closeRightPanel}
        ></RightPanel>
      </div>
    </div>
  );
}
