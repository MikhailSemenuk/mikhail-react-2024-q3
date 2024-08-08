import { GetServerSideProps } from 'next';
import fetchCharacters from './fetchCharacters';
import { Character } from '@/types';
import CharacterCard from '@/components/CharacterCard';
import parseQueryContext from '@/libs/parseQueryContext';

interface PageProps {
  characters: Character[];
  totalPages: number;
}

export default function Page({ characters, totalPages }: PageProps) {
  return (
    <div>
      <section className='d-flex flex-wrap justify-content-around'>
        {characters.length > 0 ? (
          characters.map((character) => <CharacterCard key={character.id} character={character} isDetailCard={false} />)
        ) : (
          <p>Try searching for something else (Butter Robot, Abradolf Lincler, Rick, Morty)</p>
        )}
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page, search } = parseQueryContext(context.query);

  const data = await fetchCharacters(search, page);

  return {
    props: {
      characters: data.results,
      totalPages: data.info.pages,
    },
  };
};
