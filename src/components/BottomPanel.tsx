import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import classNames from 'classnames';
import { deselectAllCards } from '../state/slices/cardsSlice';
import { useTheme } from '../hooks/useTheme';

export function BottomPanel() {
  const dispatch = useDispatch();
  const { darkTheme } = useTheme();
  const lengthSelectedCards = useSelector((state: RootState) => state.cards.selectedCards.length);

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
            onClick={() => console.log('download')}
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
}
