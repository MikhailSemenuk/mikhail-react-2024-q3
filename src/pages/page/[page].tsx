import { Character } from '@/types';
import CharacterCard from '@/components/CharacterCard';
import { GetServerSideProps } from 'next';
import parseQueryContext from '@/libs/parseQueryContext';
import fetchCharacters from './fetchCharacters';
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface PageProps {
  characters: Character[];
  totalPages: number;
}

export default function Page({ characters, totalPages }: PageProps) {
  const router = useRouter();

  const { page, search } = parseQueryContext(router.query);
  const pageNumber: number = Number(page);
  const [currentPage, setCurrentPage] = useState<number>(pageNumber);

  useEffect(() => {
    if (currentPage > 0) {
      const queryParams = new URLSearchParams();
      if (search) {
        queryParams.set('search', search);
      }
      queryParams.set('page', currentPage.toString());
      router.push(`?${queryParams.toString()}`, undefined);
    }
  }, [currentPage, search]); // TODO: Think here

  return (
    <div>
      <div className='d-flex'>
        <div className='flex-grow-1'>
          <h1 className='text-center mt-2'>Characters from Rick and Morty</h1>
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
      <div>Bottom panel</div>
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
