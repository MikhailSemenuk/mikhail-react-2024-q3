import { Component, useEffect } from 'react';
import './App.css';

class SearchGroup extends Component {
  render() {
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-search"
        />
        <button className="btn btn-outline-primary" type="button" id="button-search">
          Search
        </button>
      </div>
    );
  }
}

function App() {

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', 'dark');
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <SearchGroup/>
    </>
  );
}

export default App;
