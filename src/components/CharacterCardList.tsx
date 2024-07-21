import { Character } from '../types';
import CharacterCard from './CharacterCard';

interface CharacterCardListProps {
  characters: Character[];
  onCardClick: (value: number) => void;
}

export default function CharacterCardList({ characters, onCardClick }: CharacterCardListProps) {
  return (
    <section className='d-flex flex-wrap justify-content-around'>
      {characters.length > 0 ? (
        characters.map((character) => (
          <CharacterCard key={character.id} character={character} onCardClick={onCardClick} />
        ))
      ) : (
        <p>Try search something else (Butter Robot, Abradolf Lincler, Rick, Morty) </p>
      )}
    </section>
  );
}
