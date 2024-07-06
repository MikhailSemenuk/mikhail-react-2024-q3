import { Character } from './types';

const CharacterCardList = ({ characters }: { characters: Character[] }) => {
  return (
    <div>
      {characters.length > 0 ? (
        characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))
      ) : (
        <p>Try search something else ('Butter Robot', 'Abradolf Lincler', 'Rick', 'Morthy') </p>
      )}
    </div>
  );
};

const CharacterCard = ({ character }: { character: Character }) => {
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
};

export default CharacterCardList;
