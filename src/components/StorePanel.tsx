import { useEffect, useState } from 'react';
import store from './store';

export function StorePanel() {
  const [counter, setCounter] = useState(store.getState().counter);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCounter(store.getState().counter);
      console.log('update subscribe');
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      counter {counter}
      <button className='btn btn-primary m-3' onClick={() => store.dispatch({ type: 'increment' })}>
        increment
      </button>
      <button className='btn btn-warning m-3' onClick={() => store.dispatch({ type: 'decrement' })}>
        decrement
      </button>
    </div>
  );
}
