import { Component } from 'react';
import SearchGroup from './SearchGroup';
import './App.css';
import { Character } from './types';
import CharacterCardList from './CharacterCardList';

interface AppState {
  characters: Character[];
}

class App extends Component<object, AppState> {
  componentDidMount() {
    document.body.setAttribute('data-bs-theme', 'dark'); // TODO: setAttribute forbiden - rewrite it
  }

  updateCharacters = (data: Character[]) => {
    this.setState({ characters: data });
  };

  constructor(props: object) {
    super(props);
    this.state = {
      characters: [],
    };
  }

  render() {
    return (
      <>
        <h1 className='text-center mt-2'>Characters from 'Rick and Morty'</h1>
        <SearchGroup updateCharacters={this.updateCharacters} />
        <CharacterCardList characters={this.state.characters}/>
      </>
    );
  }
}



export default App;
