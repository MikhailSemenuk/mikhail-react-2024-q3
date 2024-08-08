import { Character } from '@/types';
import CharacterCard from '@/components/CharacterCard';

interface PageProps {
  characters: Character[];
  totalPages: number;
}

export default function Page({ characters, totalPages }: PageProps) {
  console.log(totalPages); // TODO: add later
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
