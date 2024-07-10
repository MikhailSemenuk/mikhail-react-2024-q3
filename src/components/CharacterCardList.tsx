import { Character } from '../types';

interface CharacterCardListProps {
  characters: Character[];
  isLoading: boolean;
}

function CharacterCardList({ characters, isLoading }: CharacterCardListProps) {
  return (
    <>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-around my-3">
          <strong>Loading...</strong>
          <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
        </div>
      ) : null}

      <section className="d-flex flex-wrap justify-content-around">
        {characters.length > 0 || isLoading ? (
          characters.map((character) => <CharacterCard key={character.id} character={character} />)
        ) : (
          <p>Try search something else (Butter Robot, Abradolf Lincler, Rick, Morty) </p>
        )}
      </section>
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
