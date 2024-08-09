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

  const { page, search: initialSearch } = parseQueryContext(router.query);
  const { currentPage, setCurrentPage, search, setSearch } = useUpdateQuery(Number(page), initialSearch);

  const [selectedCharacter, setSelectedCharacter] = useState<Character | undefined>(undefined);
  const [isShowRightPanel, setShowRightPanel] = useState(false); // TODO

  const setUserSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1); // if change search, start since 1
  };

  const closeRightPanel = () => {
    setShowRightPanel(false);
    setSelectedCharacter(undefined);
    // updateURL(searchParams, navigate, undefined);
  };

  const openRightPanel = (chosenCharacter: Character) => {
    setShowRightPanel(true);
    setSelectedCharacter(chosenCharacter);
    // updateURL(searchParams, navigate, id);
  };

  // TODO: close by click on area
  return (
    <div>
      <div className='d-flex'>
        <div className='flex-grow-1'>
          <h1 className='text-center mt-2'>Characters from Rick and Morty</h1>

          <SearchGroup userSearch={search} setUserSearch={setUserSearch}></SearchGroup>

          <div className='d-flex flex-column align-items-center' onClick={closeRightPanel}>
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
