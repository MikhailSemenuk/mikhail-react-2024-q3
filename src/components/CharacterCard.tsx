'use client';
import { useEffect, useId, useState } from 'react';
import classNames from 'classnames';
import { Character, PageSearchDetailURL } from '@/types';
import Image from 'next/image';
import { useCharacterContext } from './CharacterContext';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'next/navigation';
import { changePagesURL } from '@/libs/changePagesURL';

interface CharacterCardProps {
  character: Character;
  isDetailCard: boolean;
  urlData: PageSearchDetailURL;
  onClose?: () => void;
}

export default function CharacterCard({ character, onClose, isDetailCard = false, urlData }: CharacterCardProps) {
  const { isCardCheckedId, toggleCard } = useCharacterContext();
  const [isChecked, setIsChecked] = useState(isCardCheckedId(character.id));
  const checkboxId = useId();
  const { darkTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setIsChecked(isCardCheckedId(character.id));
  }, [character.id, isCardCheckedId]);

  const onClickCheckbox = () => {
    toggleCard(character);
  };

  const detailList = [];
  detailList.push(`Status: ${character.status}`);
  detailList.push(`Gender: ${character.gender}`);
  detailList.push(`Species: ${character.species}`);

  if (isDetailCard) {
    detailList.push(`Location: ${character.location.name}`);
    detailList.push(`Origin: ${character.origin.name}`);
  }

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation(); // TODO: Maybe delete
    const urlDataUpdate = { ...urlData };
    urlDataUpdate.detailId = character.id;
    changePagesURL(router, urlDataUpdate);
  };

  const onClickFooter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

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
          <button type='button' className='btn-close' aria-label='Close' onClick={onClose} />
        </div>
      )}
      <Image
        src={character.image}
        className={isDetailCard ? '' : 'cursor-pointer'}
        alt={character.name}
        onClick={handleClick}
        width={300}
        height={300}
        style={{ width: '100%', height: 'auto' }}
      />
      <div className='card-body cursor-pointer' onClick={(event) => handleClick(event)}>
        <h5 className='card-title'>{character.name}</h5>
      </div>
      <ul className='list-group list-group-flush' onClick={(event) => handleClick(event)}>
        {detailList.map((value, index) => (
          <li key={index} className={classNameList}>
            {value}
          </li>
        ))}
      </ul>
      <div className='card-footer' onClick={(event) => onClickFooter(event)}>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value=''
            checked={isChecked}
            onChange={onClickCheckbox}
            id={checkboxId}
          />
          <label className='form-check-label' htmlFor={checkboxId}>
            Add to card
          </label>
        </div>
      </div>
    </div>
  );
}
