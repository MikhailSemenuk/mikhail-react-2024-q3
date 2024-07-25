import { useEffect, useState } from 'react';
import SearchGroup from './SearchGroup';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import CharacterCardList from './CharacterCardList';
import Pagination from './Pagination';
import useUserSearch from '../hooks/useUserSearch';
import RightPanel from './RightPanel';
import updateURL from '../libs/updateURL';
import { SpinnerLoading } from './SpinnerLoading';
import { BottomPanel } from './BottomPanel';
import { useGetAllCharactersQuery } from '../state/slices/charactersApi';
import { Character } from '../types';

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
  const [currentPage, setCurrentPage] = useState(Number(page));

  const [selectedId, setSelectedId] = useState<number | undefined>(detailsURL);
  const [isShowRightPanel, setShowRightPanel] = useState(detailsURL !== undefined);

  const { data, error, isLoading } = useGetAllCharactersQuery({ search: userSearch, page: `${currentPage}` });
  const characters: Character[] = data?.results ?? [];
  const pages: number = data?.info.pages ?? 0;
  if (error) {
    console.error(error); // TODO: Think here later
  }

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
      setSelectedId(id);
      updateURL(searchParams, navigate, id);
    }
  };

  return (
    <div className='page'>
      <div className='d-flex'>
        <div className='flex-grow-1' onClick={closeRightPanel}>
          <h1 className='text-center mt-2'>Characters from Rick and Morty</h1>
          <div className='d-flex flex-column align-items-center'>
            <SearchGroup userSearch={userSearch} setUserSearch={handleSearch}></SearchGroup>
            <SpinnerLoading isLoading={isLoading}></SpinnerLoading>
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
      <BottomPanel></BottomPanel>
    </div>
  );
}
