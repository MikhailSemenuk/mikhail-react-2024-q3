// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';

const DangerButton = () => {
  return (
    <button type="button" className="btn btn-danger">
      Danger
    </button>
  );
};

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <DangerButton />
    </>
  );
}

export default App;
