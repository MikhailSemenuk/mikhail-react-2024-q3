import { decrement, increment } from '../state/counter/counterSlice';
import { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';

export function StorePanel() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      counter {count}
      <button className='btn btn-primary m-3' onClick={() => dispatch(increment())}>
        increment
      </button>
      <button className='btn btn-warning m-3' onClick={() => dispatch(decrement())}>
        decrement
      </button>
    </div>
  );
}
