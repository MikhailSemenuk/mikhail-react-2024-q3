import { ChangeEvent, Component } from 'react';

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
        <button className="btn btn-outline-primary" type="button" id="button-search">
          Search
        </button>
      </div>
    );
  }
}