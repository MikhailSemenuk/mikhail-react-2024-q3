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

interface PageProps {
  characters: Character[];
  totalPages: number;
}

export default function Page({ characters, totalPages }: PageProps) {
  const router = useRouter();

  const { page, search: initialSearch } = parseQueryContext(router.query);
  const { currentPage, setCurrentPage, search, setSearch } = useUpdateQuery(Number(page), initialSearch);

  const setUserSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1); // if change search, start since 1
  };

  return (
    <div>
      <div className='d-flex'>
        <div className='flex-grow-1'>
          <h1 className='text-center mt-2'>Characters from Rick and Morty</h1>

          <SearchGroup userSearch={search} setUserSearch={setUserSearch}></SearchGroup>

          <div className='d-flex flex-column align-items-center'>
            <section className='d-flex flex-wrap justify-content-around'>
              {characters.length > 0 ? (
                characters.map((character) => (
                  <CharacterCard key={character.id} character={character} isDetailCard={false} />
                ))
              ) : (
                <p>Try searching for something else (Butter Robot, Abradolf Lincler, Rick, Morty)</p>
              )}
            </section>

            <Pagination currentPage={currentPage} pages={totalPages} setCurrentPage={setCurrentPage}></Pagination>
          </div>
        </div>
        <div>Right panel</div>
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
