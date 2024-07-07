import { Component } from 'react';
import SearchGroup from './SearchGroup';
import './App.css';
import { Character } from './types';
import CharacterCardList from './CharacterCardList';
import BtnThrowError from './BtnThrowError';

interface AppState {
  characters: Character[];
  isLoading: boolean;
}

class App extends Component<object, AppState> {
  componentDidMount() {
    document.body.setAttribute('data-bs-theme', 'dark'); // TODO: setAttribute forbiden - rewrite it
  }

  updateCharacters = (data: Character[], isLoading = false) => {
    this.setState({ characters: data });
    this.setState({ isLoading: isLoading });
  };

  constructor(props: object) {
    super(props);
    this.state = {
      characters: [],
      isLoading: false,
    };
  }

  render() {
    return (
      <>
        <h1 className="text-center mt-2">Characters from 'Rick and Morty'</h1>
        <SearchGroup updateCharacters={this.updateCharacters} />
        <CharacterCardList characters={this.state.characters} isLoading={this.state.isLoading} />
        <BtnThrowError />
      </>
    );
  }
}

export default App;
