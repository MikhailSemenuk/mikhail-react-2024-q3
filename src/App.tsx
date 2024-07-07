import { Component } from 'react';
import SearchGroup from './SearchGroup';
import './App.css';
import { Character } from './types';
import CharacterCardList from './CharacterCardList';
import BtnThrowError from './BtnThrowError';
import ErrorBoundary from './ErrorBoundary';

interface AppState {
  characters: Character[];
  isLoading: boolean;
}

class App extends Component<object, AppState> {
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
        <ErrorBoundary>
          <h1 className="text-center mt-2">Characters from Rick and Morty</h1>
          <SearchGroup updateCharacters={this.updateCharacters} />
          <CharacterCardList characters={this.state.characters} isLoading={this.state.isLoading} />
          <BtnThrowError />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
