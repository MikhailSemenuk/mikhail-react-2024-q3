import classNames from 'classnames';
import { FormItem } from '../types';

interface CharacterCardProps {
  formItem: FormItem;
  isLastForm: boolean;
}

export default function CharacterCard({ formItem, isLastForm }: CharacterCardProps) {
  const detailList: string[] = [];

  Object.entries(formItem).forEach(([key, value]) => {
    if (key !== 'file' && key !== 'fileBase64') {
      detailList.push(`${key}: ${value}`);
    }
  });

  const classNameCard = classNames('card', 'my-3', 'mx-1', { border: isLastForm, 'border-white': isLastForm });

  const imageSrc = formItem.fileBase64 ? `data:image/png;base64,${formItem.fileBase64}` : '';

  return (
    <div className={classNameCard}>
      {imageSrc && <img src={imageSrc} className='card-img-top cursor-pointer' alt={formItem.name} />}
      <div className='card-body cursor-pointer'>
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
