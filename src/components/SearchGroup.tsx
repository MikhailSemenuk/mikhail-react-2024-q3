'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { PageSearchDetailURL } from '@/types';
import { changePagesURL } from '@/libs/changePagesURL';

interface SearchGroupProps {
  urlData: PageSearchDetailURL;
}

export default function SearchGroup({ urlData }: SearchGroupProps) {
  const [inputValue, setInputValue] = React.useState(urlData.search);
  const router = useRouter();

  const handleClick = () => {
    const urlDataUpdate = { ...urlData };
    urlDataUpdate.search = inputValue.trim();
    changePagesURL(router, urlDataUpdate);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
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
        <span role='status'>Search</span>
      </button>
    </section>
  );
}
