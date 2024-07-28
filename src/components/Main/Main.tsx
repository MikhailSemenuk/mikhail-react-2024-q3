import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchGroup from '../SearchGroup/SearchGroup';
import Pagination from '../Pagination/Pagination';
import RightPanel from '../RightPanel/RightPanel';
import { SpinnerLoading } from '../SpinnerLoading/SpinnerLoading';
import { BottomPanel } from '../BottomPanel/BottomPanel';
import CharacterCardList from '../CharacterCardList/CharacterCardList';
import { useCharacters } from '../../hooks/useCharacters';
import { useSearchAndPagination } from '../../hooks/useSearchAndPagination';
import updateURL from '../../libs/updateURL';

export default function Main() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { userSearch, setUserSearch, currentPage, setCurrentPage, detailsURL } = useSearchAndPagination();
  const { characters, pages, isLoading } = useCharacters(userSearch, currentPage);

  const [selectedId, setSelectedId] = useState<number | undefined>(detailsURL);
  const [isShowRightPanel, setShowRightPanel] = useState(detailsURL !== undefined);

  useEffect(() => {
    setShowRightPanel(detailsURL !== undefined);
    setSelectedId(detailsURL);
  }, [detailsURL]);

  const handleSearch = (searchValue: string) => {
    setUserSearch(searchValue);
    setCurrentPage(1);
  };

  const closeRightPanel = () => {
    setShowRightPanel(false);
    setSelectedId(undefined);
    updateURL(searchParams, navigate, undefined);
  };

  const openRightPanel = (id: number) => {
    setShowRightPanel(true);
    setSelectedId(id);
    updateURL(searchParams, navigate, id);
  };

  return (
    <div className='page'>
      <div className='d-flex'>
        <div className='flex-grow-1' onClick={closeRightPanel}>
          <h1 className='text-center mt-2'>Characters from Rick and Morty</h1>
          <div className='d-flex flex-column align-items-center'>
            <SearchGroup userSearch={userSearch} setUserSearch={handleSearch} />
            <SpinnerLoading isLoading={isLoading} />
            {!isLoading && (
              <>
                <CharacterCardList characters={characters} onCardClick={openRightPanel} />
                <Pagination currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage} />
              </>
            )}
          </div>
        </div>
        {isShowRightPanel && (
          <RightPanel selectedId={selectedId} isShowRightPanel={isShowRightPanel} handleClose={closeRightPanel} />
        )}
      </div>
      <BottomPanel />
    </div>
  );
}
