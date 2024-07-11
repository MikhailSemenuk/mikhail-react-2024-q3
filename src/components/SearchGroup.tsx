import react from 'react';
import { setUserSearchLS } from './userSearchLS';

interface SearchGroupProps {
  userSearch: string;
  setUserSearch: (value: string) => void;
}

export default function SearchGroup({ userSearch, setUserSearch }: SearchGroupProps) {
  const [inputValue, setInputValue] = react.useState(userSearch);

  const handleClick = () => {
    setUserSearchLS(inputValue.trim()); // TODO: Think this place
    setUserSearch(inputValue.trim());
  };

  const handleInputChange = (e: react.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <section className="input-group p-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="button-search"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyPress}
      />
      <button onClick={handleClick} className="btn btn-outline-primary" type="button" id="button-search">
        <span role="status">Search</span>
      </button>
    </section>
  );
}
