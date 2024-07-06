import { ChangeEvent, Component } from 'react';
import { Character } from './types';

interface SearchGroupState {
  inputValue: string;
}

export default class SearchGroup extends Component<unknown, SearchGroupState> {
  localStorageName = 'searchInputValue';

  constructor(props: unknown) {
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

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    this.setState({ inputValue });
    localStorage.setItem(this.localStorageName, inputValue);
  };

  handleClick = () => {
    console.log(`search ${this.state.inputValue}`);
    fetchData(this.state.inputValue.trim()).then((data) => console.log(data));
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
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick} className="btn btn-outline-primary" type="button" id="button-search">
          Search
        </button>
      </div>
    );
  }
}



async function fetchData(characterName: string, page = 1): Promise<Character[]> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${encodeURIComponent(characterName)}`,
  );
  if (!response.ok && response.status === 404) {
    return [];
  } else if (!response.ok) {
    throw new Error(`Network response was not ok (status ${response.status})`);
  }
  const data = await response.json();
  return data.results;
}
