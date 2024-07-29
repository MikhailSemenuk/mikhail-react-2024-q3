import { useState } from 'react';
import { getUserSearchLS, saveUserSearchLS } from '../libs/appLocalStorage';

const useUserSearch = (): [string, (newSearch: string) => void] => {
  const [userSearch, setUserSearch] = useState(getUserSearchLS());

  const updateUserSearch = (newSearch: string) => {
    setUserSearch(newSearch);
    saveUserSearchLS(newSearch);
  };

  return [userSearch, updateUserSearch];
};

export default useUserSearch;
