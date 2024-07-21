import { Character } from '../types';

export function DetailCharacterCard({ character, onClose }: { character: Character | undefined; onClose: () => void }) {
  if (!character) {
    return null;
  }

  const detailList = [];
  detailList.push(`Status: ${character.status}`);
  detailList.push(`Gender: ${character.gender}`);
  detailList.push(`Species: ${character.species}`);
  detailList.push(`Location: ${character.location.name}`);
  detailList.push(`Origin: ${character.origin.name}`);

  return (
    <div className='card m-1 text-bg-secondary'>
      <div className='d-flex flex-row-reverse'>
        <button type='button' className='btn-close' aria-label='Close' onClick={onClose}></button>
      </div>
      <img src={character.image} className='card-img-top' alt={character.name} />
      <div className='card-body'>
        <h5 className='card-title'>{character.name}</h5>
      </div>
      <ul className='list-group list-group-flush'>
        {detailList.map((value, index) => (
          <li key={index} className='list-group-item'>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
