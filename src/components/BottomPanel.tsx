import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import classNames from 'classnames';
import { deselectAllCards } from '../state/slices/cardsSlice';

export function BottomPanel() {
  const dispatch = useDispatch();
  const lengthSelectedCards = useSelector((state: RootState) => state.cards.selectedCards.length);

  // TODO: Maybe change color Btn during theme
  // TODO: Check answer is it allowed use npm `classNames`
  const classes = classNames('offcanvas', 'offcanvas-bottom', 'h-auto', {
    show: lengthSelectedCards > 0,
  });

  return (
    <>
      <div className={classes} tabIndex={-1}>
        <div className='d-flex justify-content-around align-items-center'>
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
