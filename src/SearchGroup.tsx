import { ChangeEvent, Component } from 'react';
import { Character } from './types';
import fetchCharacters from './fetchCharacters';

interface SearchGroupState {
  inputValue: string;
  isLoading: boolean;
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
      isLoading: false,
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
    this.setState({ isLoading: true });
    fetchCharacters(this.state.inputValue.trim())
      .then((data) => this.props.updateCharacters(data))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    return (
      <div className="input-group p-3">
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
        <button onClick={this.handleClick} className="btn btn-outline-primary " type="button" id="button-search">
          {this.state.isLoading ? <span className="spinner-grow spinner-grow-sm mx-1" aria-hidden="true"></span> : null}
          <span role="status">Search</span>
        </button>
      </div>
    );
  }
}
