import React from 'react';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';

interface SearchGroupProps {
  userSearch: string;
  setUserSearch: (value: string) => void;
}

export default function SearchGroup({ userSearch, setUserSearch }: SearchGroupProps) {
  const [inputValue, setInputValue] = React.useState(userSearch);

  const handleClick = () => {
    setUserSearch(inputValue.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <section className='input-group p-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search'
            aria-label='Search'
            aria-describedby='button-search'
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyPress}
          />
          <button onClick={handleClick} className='btn btn-outline-primary' type='button' id='button-search'>
            <span role='status'>{`Search ${theme.darkTheme ? '🌙' : '☀️'}`}</span>
          </button>
        </section>
      )}
    </ThemeContext.Consumer>
  );
}
