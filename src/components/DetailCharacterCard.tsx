import { Character } from '../types';

export function DetailCharacterCard({ character }: { character: Character | undefined }) {
  // const [searchParams] = useSearchParams();
  // const details = searchParams.get('details');

  console.log('DetailCharacterCard');

  if (!character) {
    return <></>;
  }

  return (
    <div className="card m-2 text-bg-secondary">
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
