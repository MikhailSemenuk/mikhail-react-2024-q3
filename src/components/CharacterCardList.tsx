import { useLoaderData } from 'react-router-dom';
import { Character, CharacterPages } from '../types';

interface CharacterCardListProps {
  characters: Character[];
}

function CharacterCardList({ characters }: CharacterCardListProps) {
  return (
    <>
      <section className="d-flex flex-wrap justify-content-around">
        {characters.length > 0 ? (
          characters.map((character) => <CharacterCard key={character.id} character={character} />)
        ) : (
          <p>Try search something else (Butter Robot, Abradolf Lincler, Rick, Morty) </p>
        )}
      </section>
    </>
  );
}

export function CharacterCardListPath() {
  const characters = (useLoaderData() as CharacterPages).characters;
  return (
    <>
      <CharacterCardList characters={characters}></CharacterCardList>
    </>
  );
}

function CharacterCard({ character }: { character: Character }) {
  return (
    <div className="card m-2" style={{ width: '18rem' }}>
      <img src={character.image} className="card-img-top" alt={character.name} />
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Status: {character.status}</li>
        <li className="list-group-item">Gender: {character.gender}</li>
        <li className="list-group-item">Species: {character.species}</li>
      </ul>
    </div>
  );
}

export default CharacterCardList;
