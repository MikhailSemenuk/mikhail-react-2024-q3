import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  onCardClick: (value: number) => void;
}

export default function CharacterCard({ character, onCardClick }: CharacterCardProps) {
  return (
    <div className="card m-2 cursor-pointer" style={{ width: '18rem' }} onClick={() => onCardClick(character.id)}>
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
