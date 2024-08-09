import { Character } from '@/types';
import CharacterCard from '@/components/CharacterCard';
import { GetServerSideProps } from 'next';
import parseQueryContext from '@/libs/parseQueryContext';
import fetchCharacters from './fetchCharacters';
import Pagination from '@/components/Pagination';
import { useRouter } from 'next/router';
import { useUpdateQuery } from '@/hooks/useUpdateQuery';
import SearchGroup from '@/components/SearchGroup';
import { BottomPanel } from '@/components/BottomPanel';
import RightPanel from '@/components/RightPanel';
import { useState } from 'react';

interface PageProps {
  characters: Character[];
  totalPages: number;
}

export default function Page({ characters, totalPages }: PageProps) {
  const router = useRouter();
  const { currentPage, setCurrentPage, search, setSearch, detailId, setDetailId } = useUpdateQuery(
    parseQueryContext(router.query),
  );

  const selectedCharacterOnPage = characters.find((item) => item.id === detailId);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | undefined>(selectedCharacterOnPage);
  const [isShowRightPanel, setShowRightPanel] = useState(selectedCharacterOnPage !== undefined);

  const setUserSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1); // if change search, start since 1
  };

  if (!selectedCharacterOnPage && detailId) {
    // incorrect value in URL - reset
    setDetailId(undefined);
  }
  if (currentPage !== 1 && !characters.length) {
    // incorrect value in URL - reset
    setCurrentPage(1);
  }

  const closeRightPanel = () => {
    setShowRightPanel(false);
    setSelectedCharacter(undefined);
    setDetailId(undefined);
  };

  const openRightPanel = (chosenCharacter: Character) => {
    setShowRightPanel(true);
    setSelectedCharacter(chosenCharacter);
    setDetailId(chosenCharacter.id);
  };

  return (
    <div>
      <div className='d-flex'>
        <div className='flex-grow-1' onClick={closeRightPanel}>
          <h1 className='text-center mt-2'>Characters from Rick and Morty</h1>

          <SearchGroup userSearch={search} setUserSearch={setUserSearch}></SearchGroup>

          <div className='d-flex flex-column align-items-center'>
            <section className='d-flex flex-wrap justify-content-around'>
              {characters.length > 0 ? (
                characters.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    isDetailCard={false}
                    onCardClick={openRightPanel}
                  />
                ))
              ) : (
                <p>Try searching for something else (Butter Robot, Abradolf Lincler, Rick, Morty)</p>
              )}
            </section>

            <Pagination currentPage={currentPage} pages={totalPages} setCurrentPage={setCurrentPage}></Pagination>
          </div>
        </div>
        {isShowRightPanel && (
          <RightPanel character={selectedCharacter} isShowRightPanel={isShowRightPanel} handleClose={closeRightPanel} />
        )}
      </div>
      <BottomPanel></BottomPanel>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page, search } = parseQueryContext(context.query);

  console.log(`getServerSideProps page=${page}, search=${search}`);
  const data = await fetchCharacters(search, page);

  return {
    props: {
      characters: data.results,
      totalPages: data.info.pages,
    },
  };
};
