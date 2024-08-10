import classNames from 'classnames';
import { Character } from '@/types';
import Image from 'next/image';

interface CharacterCardProps {
  character: Character;
  isDetailCard: boolean;
  onClose?: () => void;
}

// TODO: During transfer - delete later

export default function CharacterCardSimple({ character, onClose, isDetailCard = false }: CharacterCardProps) {
  const darkTheme = true;

  const detailList = [];
  detailList.push(`Status: ${character.status}`);
  detailList.push(`Gender: ${character.gender}`);
  detailList.push(`Species: ${character.species}`);

  if (isDetailCard) {
    detailList.push(`Location: ${character.location.name}`);
    detailList.push(`Origin: ${character.origin.name}`);
  }

  const classNameCard = classNames(
    'card',
    'm-2',
    { 'width-18rem': !isDetailCard },
    { 'text-bg-secondary': isDetailCard && darkTheme },
    { 'text-bg-warning': isDetailCard && !darkTheme },
  );

  const classNameList = classNames('list-group-item', { 'cursor-pointer': !isDetailCard });

  return (
    <div className={classNameCard}>
      {isDetailCard && (
        <div className='d-flex flex-row-reverse'>
          <button type='button' className='btn-close' aria-label='Close' onClick={onClose}></button>
        </div>
      )}
      <Image
        src={character.image}
        className={isDetailCard ? '' : 'cursor-pointer'}
        alt={character.name}
        width={300}
        height={300}
        style={{ width: '100%', height: 'auto' }}
      />
      <div className='card-body cursor-pointer'>
        <h5 className='card-title'>{character.name}</h5>
      </div>
      <ul className='list-group list-group-flush'>
        {detailList.map((value, index) => (
          <li key={index} className={classNameList}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
