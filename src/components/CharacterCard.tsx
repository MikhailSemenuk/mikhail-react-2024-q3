import { useId } from 'react';
import { Character } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCard } from '../state/slices/cardsSlice';
import { RootState } from '../state/store';

// TODO: Similar code with DetailCharacterCard, update it

interface CharacterCardProps {
  character: Character;
  onCardClick: (value: number, event: React.MouseEvent<HTMLDivElement | HTMLUListElement, MouseEvent>) => void;
}

export default function CharacterCard({ character, onCardClick }: CharacterCardProps) {
  const checkboxId = useId();
  const dispatch = useDispatch();
  const isChecked = useSelector((state: RootState) => state.cards.selectedCards.includes(character.id));

  const detailList = [];
  detailList.push(`Status: ${character.status}`);
  detailList.push(`Gender: ${character.gender}`);
  detailList.push(`Species: ${character.species}`);

  const onClickImgBody = (event: React.MouseEvent<HTMLDivElement | HTMLUListElement, MouseEvent>) => {
    event.stopPropagation();
    onCardClick(character.id, event);
  };

  const onClickFooter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  const onClickCheckbox = () => {
    dispatch(toggleCard(character.id));
  };

  return (
    <div className='card m-2' style={{ width: '18rem' }}>
      <img
        src={character.image}
        className='card-img-top cursor-pointer'
        alt={character.name}
        onClick={(event) => onClickImgBody(event)}
      />
      <div className='card-body cursor-pointer' onClick={(event) => onClickImgBody(event)}>
        <h5 className='card-title'>{character.name}</h5>
      </div>
      <ul className='list-group list-group-flush' onClick={(event) => onClickImgBody(event)}>
        {detailList.map((value, index) => (
          <li key={index} className='list-group-item'>
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
          ></input>
          <label className='form-check-label' htmlFor={checkboxId}>
            Add to card
          </label>
        </div>
      </div>
    </div>
  );
}
