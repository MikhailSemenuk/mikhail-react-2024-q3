import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import classNames from 'classnames';
import { deselectAllCards } from '../state/slices/cardsSlice';
import { useTheme } from '../hooks/useTheme';
import { Character } from '../types';
import { convertToCSV } from '../libs/convertToCSV';

export function BottomPanel() {
  const dispatch = useDispatch();
  const { darkTheme } = useTheme();

  const selectedCards = useSelector((state: RootState) => state.cards.selectedCards);
  const lengthSelectedCards = selectedCards.length;

  const handleDownload = (favoritesData: Character[]) => {
    const csv = convertToCSV(favoritesData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // I am not manipulate with DOM, because I am not attach link in DOM.
    const link = document.createElement('a');
    link.href = url;
    link.download = `characters_${favoritesData.length}.csv`;
    link.click();
  };

  const classes = classNames('offcanvas', 'offcanvas-bottom', 'h-auto', {
    show: lengthSelectedCards > 0,
  });

  return (
    <>
      <div className={classes} tabIndex={-1}>
        <div className='d-flex justify-content-around align-items-center'>
          <button
            className={classNames('btn', 'm-3', darkTheme ? 'btn-outline-warning' : 'btn-warning')}
            onClick={() => dispatch(deselectAllCards())}
          >
            Unselect all
          </button>

          <p className='fs-4 my-0'>
            {lengthSelectedCards} item{lengthSelectedCards > 1 ? 's are' : ' is'} selected
          </p>

          <button
            className={classNames('btn', 'm-3', darkTheme ? 'btn-outline-primary' : 'btn-primary')}
            onClick={() => handleDownload(selectedCards)}
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
}
