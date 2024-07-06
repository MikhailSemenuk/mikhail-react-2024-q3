import { ChangeEvent, Component } from 'react';
import { Character } from './types';
import fetchCharacters from './fetchCharacters';

interface SearchGroupState {
  inputValue: string;
}

interface SearchGroupProps {
  updateCharacters: (data: Character[]) => void;
}

export default class SearchGroup extends Component<SearchGroupProps, SearchGroupState> {
  localStorageName = 'searchInputValue';

  constructor(props: SearchGroupProps) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  componentDidMount() {
    const savedInputValue = localStorage.getItem(this.localStorageName);
    if (savedInputValue) {
      this.setState({ inputValue: savedInputValue });
    }
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    this.setState({ inputValue });
    localStorage.setItem(this.localStorageName, inputValue);
  };

  handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  };

  handleClick = () => {
    fetchCharacters(this.state.inputValue.trim()).then((data) => this.props.updateCharacters(data));
  };

  render() {
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-search"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeyPress}
        />
        <button onClick={this.handleClick} className="btn btn-outline-primary" type="button" id="button-search">
          Search
        </button>
      </div>
    );
  }
}
