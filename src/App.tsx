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

interface AppState {
  characters: Character[];
}

class App extends Component<object, AppState> {
  componentDidMount() {
    document.body.setAttribute('data-bs-theme', 'dark'); // TODO: setAttribute forbiden - rewrite it
  }

  constructor(props: object) {
    super(props);
    this.state = {
      characters: [rickSanchez],
    };
  }

  render() {
    return (
      <>
        <h1>Vite + React</h1>
        <SearchGroup />
        <CharacterCardList characters={this.state.characters}/>
      </>
    );
  }
}

const CharacterCardList = ({ characters }: { characters: Character[] }) => {
  return (
    <div>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};

export default App;
