import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  onCardClick: (value: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function CharacterCard({ character, onCardClick }: CharacterCardProps) {
  const detailList = [];
  detailList.push(`Status: ${character.status}`);
  detailList.push(`Gender: ${character.gender}`);
  detailList.push(`Species: ${character.species}`);

  return (
    <div
      className='card m-2 cursor-pointer'
      style={{ width: '18rem' }}
      onClick={(event) => {
        event.stopPropagation();
        onCardClick(character.id, event);
      }}
    >
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
