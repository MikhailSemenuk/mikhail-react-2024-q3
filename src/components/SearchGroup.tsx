import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Character } from '../types';
import fetchCharacters from '../fetchCharacters';

interface SearchGroupProps {
  updateCharacters: (data: Character[], isLoading?: boolean) => void;
}

export default function SearchGroup({ updateCharacters }: SearchGroupProps) {
  const localStorageName = 'searchInputValue';
  const getInputLS = () => localStorage.getItem(localStorageName) ?? '';

  const [inputValue, setInputValue] = useState(getInputLS);

  const handleClick = useCallback(() => {
    const setInputLS = (value: string) => localStorage.setItem(localStorageName, value);

    setInputLS(inputValue);
    updateCharacters([], true);
    fetchCharacters(inputValue.trim()).then((data) => updateCharacters(data));
  }, [inputValue, updateCharacters]);

  useEffect(() => {
    handleClick();
  }, [handleClick]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

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
