import { Component } from 'react';
import SearchGroup from './SearchGroup';
import './App.css';

class App extends Component {
  componentDidMount() {
    document.body.setAttribute('data-bs-theme', 'dark'); // TODO: setAttribute forbiden - rewrite it
  }

  render() {
    return (
      <>
        <h1>Vite + React</h1>
        <SearchGroup />
      </>
    );
  }
}

export default App;
