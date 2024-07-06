import { Character } from './types';

const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
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

export default CharacterCard;
