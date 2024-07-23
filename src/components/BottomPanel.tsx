import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import classNames from 'classnames';
import { deselectAllCards } from '../state/slices/cardsSlice';

export function BottomPanel() {
  const dispatch = useDispatch();
  const lengthSelectedCards = useSelector((state: RootState) => state.cards.selectedCards.length);

  // TODO: Change background color during theme
  // TODO: Maybe change color Btn during theme
  const classes = classNames('offcanvas', 'offcanvas-md', 'text-bg-secondary', 'offcanvas-bottom', {
    show: lengthSelectedCards > 0,
  });

  return (
    <>
      <div className={classes} tabIndex={-1}>
        <div className='offcanvas-body small justify-content-around align-items-center'>
          <button className='btn btn-warning m-3' onClick={() => dispatch(deselectAllCards())}>
            Unselect all
          </button>

          <p className='fs-4 my-0'>
            {lengthSelectedCards} item{lengthSelectedCards > 1 ? 's are' : ' is'} selected
          </p>

          <button className='btn btn-primary m-3' onClick={() => console.log('download')}>
            Download
          </button>
        </div>
      </div>
    </>
  );
}
