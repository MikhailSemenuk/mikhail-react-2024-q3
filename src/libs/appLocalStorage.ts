const prefixName = 'mikhail_';
const localStorageNameSearch = 'userSearchLS';
const localStorageNameTheme = 'themeIsDark';

const getUserSearchLS = () => localStorage.getItem(prefixName + localStorageNameSearch) ?? '';
const saveUserSearchLS = (value: string) => localStorage.setItem(prefixName + localStorageNameSearch, value);

const getThemeIsDark = () => {
  const value = localStorage.getItem(prefixName + localStorageNameTheme);
  if (value) {
    return value === 'true';
  } else {
    return true;
  }
};
const saveThemeIsDark = (value: boolean) => localStorage.setItem(prefixName + localStorageNameTheme, String(value));

export { getUserSearchLS, saveUserSearchLS, getThemeIsDark, saveThemeIsDark };
