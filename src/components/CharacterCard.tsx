import { useId } from "react";
import classNames from "classnames";
import { Character } from "@/types";
import Image from "next/image";

interface CharacterCardProps {
  character: Character;
  isDetailCard: boolean;
  onCardClick?: (
    value: number,
    event: React.MouseEvent<HTMLDivElement | HTMLUListElement, MouseEvent>
  ) => void;
  onClose?: () => void;
}

export default function CharacterCard({
  character,
  onCardClick,
  onClose,
  isDetailCard = false,
}: CharacterCardProps) {
  // TODO: Simpefy it
  const checkboxId = useId();
  const darkTheme = true;
  const isChecked = false;

  const onClickCheckbox = () => {
    console.log("click");
  };

  const detailList = [];
  detailList.push(`Status: ${character.status}`);
  detailList.push(`Gender: ${character.gender}`);
  detailList.push(`Species: ${character.species}`);

  if (isDetailCard) {
    detailList.push(`Location: ${character.location.name}`);
    detailList.push(`Origin: ${character.origin.name}`);
  }

  const onClickImgBody = (
    event: React.MouseEvent<HTMLDivElement | HTMLUListElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (onCardClick) {
      onCardClick(character.id, event);
    }
  };

  const onClickFooter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  // const onClickCheckbox = () => {
  //   dispatch(toggleCard(character));
  // };

  const classNameCard = classNames(
    "card",
    "m-2",
    { "width-18rem": !isDetailCard },
    { "text-bg-secondary": isDetailCard && darkTheme },
    { "text-bg-warning": isDetailCard && !darkTheme }
  );

  // TODO: Rewrite img
  return (
    <div className={classNameCard}>
      {isDetailCard && (
        <div className="d-flex flex-row-reverse">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
      )}
      <Image
        src={character.image}
        alt={character.name}
        width={300}
        height={300}
        style={{ width: "100%", height: "auto" }}
      />
      {/* <img
        src={character.image}
        className='card-img-top cursor-pointer'
        alt={character.name}
        onClick={(event) => onClickImgBody(event)}
      /> */}
      <div
        className="card-body cursor-pointer"
        onClick={(event) => onClickImgBody(event)}
      >
        <h5 className="card-title">{character.name}</h5>
      </div>
      <ul
        className="list-group list-group-flush"
        onClick={(event) => onClickImgBody(event)}
      >
        {detailList.map((value, index) => (
          <li key={index} className="list-group-item">
            {value}
          </li>
        ))}
      </ul>
      <div className="card-footer" onClick={(event) => onClickFooter(event)}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            checked={isChecked}
            onChange={onClickCheckbox}
            id={checkboxId}
          ></input>
          <label className="form-check-label" htmlFor={checkboxId}>
            Add to card
          </label>
        </div>
      </div>
    </div>
  );
}
