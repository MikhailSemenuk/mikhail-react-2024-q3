const localStorageName = 'userSearchLS';
const getUserSearchLS = () => localStorage.getItem(localStorageName) ?? '';
const setUserSearchLS = (value: string) => localStorage.setItem(localStorageName, value);

export { getUserSearchLS, setUserSearchLS };
