import { Character } from '../types';

export function DetailCharacterCard({ character, onClose }: { character: Character | undefined; onClose: () => void }) {
  console.log('DetailCharacterCard');

  if (!character) {
    return <></>;
  }

  return (
    <div className="card m-1 text-bg-secondary">
      <div className="d-flex flex-row-reverse">
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      </div>
      <img src={character.image} className="card-img-top" alt={character.name} />
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Status: {character.status}</li>
        <li className="list-group-item">Gender: {character.gender}</li>
        <li className="list-group-item">Species: {character.species}</li>
        <li className="list-group-item">Location: {character.location.name}</li>
        <li className="list-group-item">Origin: {character.origin.name}</li>
      </ul>
    </div>
  );
}
