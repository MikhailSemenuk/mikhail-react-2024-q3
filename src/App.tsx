import { Component } from 'react';
import SearchGroup from './SearchGroup';
import './App.css';
import CharacterCard from './CharacterCard';
import { Character } from './types';

const rickSanchez: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  location: {
    name: 'Earth (C-137)',
    url: '',
  },
};

class App extends Component {
  componentDidMount() {
    document.body.setAttribute('data-bs-theme', 'dark'); // TODO: setAttribute forbiden - rewrite it
  }

  render() {
    return (
      <>
        <h1>Vite + React</h1>
        <SearchGroup />
        <CharacterCard character={rickSanchez} />
      </>
    );
  }
}

export default App;
