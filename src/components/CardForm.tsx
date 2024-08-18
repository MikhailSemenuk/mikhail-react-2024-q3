import classNames from 'classnames';
import { FormItem } from '../types';

interface CharacterCardProps {
  formItem: FormItem;
  isLastForm: boolean;
}

export default function CharacterCard({ formItem, isLastForm }: CharacterCardProps) {
  const detailList: string[] = [];

  Object.entries(formItem).forEach(([key, value]) => {
    if (key !== 'files' && key !== 'fileBase64' && key !== 'repeatPassword') {
      detailList.push(`${key}: ${value}`);
    }
  });

  const classNameCard = classNames('card', 'my-4', 'mx-1', 'w-75', { border: isLastForm, 'border-white': isLastForm });

  const imageSrc = formItem.fileBase64 ? `data:image/png;base64,${formItem.fileBase64}` : '';

  return (
    <div className={classNameCard}>
      {imageSrc && <img src={imageSrc} className='card-img-top' alt={formItem.name} />}
      <div className='card-body'>
        <h5 className='card-title'>{formItem.name}</h5>
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
