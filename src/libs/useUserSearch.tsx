import { useState } from 'react';
import { getUserSearchLS, saveUserSearchLS } from './userSearchLS';

// There is no need in saving the search query to the local storage on unmount.
// https://discord.com/channels/794806036506607647/812644828164521984/1261223984087961610
const useUserSearch = (): [string, (newSearch: string) => void] => {
  const [userSearch, setUserSearch] = useState(getUserSearchLS());

  const updateUserSearch = (newSearch: string) => {
    setUserSearch(newSearch);
    saveUserSearchLS(newSearch);
  };

  return [userSearch, updateUserSearch];
};

export default useUserSearch;
