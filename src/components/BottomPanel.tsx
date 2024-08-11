'use client';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useCharacterContext } from './CharacterContext';
import { downloadAsCSV } from '@/libs/downloadAsCSV';
import { useTheme } from '@/hooks/useTheme';

export function BottomPanel() {
  const { selectedCards, deselectAllCards } = useCharacterContext();
  const { darkTheme } = useTheme();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const lengthSelectedCards = selectedCards.length;

  const classes = classNames('offcanvas', 'offcanvas-bottom', 'h-auto', {
    show: lengthSelectedCards > 0,
  });

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      <div className={classes} tabIndex={-1}>
        <div className='d-flex justify-content-around align-items-center'>
          <button
            className={classNames('btn', 'm-3', darkTheme ? 'btn-outline-warning' : 'btn-warning')}
            onClick={deselectAllCards}
          >
            Unselect all
          </button>

          <p className='fs-4 my-0'>
            {lengthSelectedCards} item{lengthSelectedCards > 1 ? 's are' : ' is'} selected
          </p>

          <button
            className={classNames('btn', 'm-3', darkTheme ? 'btn-outline-primary' : 'btn-primary')}
            onClick={() => downloadAsCSV(selectedCards)}
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
}
