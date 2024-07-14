const localStorageName = 'userSearchLS';
const getUserSearchLS = () => localStorage.getItem(localStorageName) ?? '';
const saveUserSearchLS = (value: string) => localStorage.setItem(localStorageName, value);

export { getUserSearchLS, saveUserSearchLS };
