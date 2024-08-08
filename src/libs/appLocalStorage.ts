import isServer from "./isServer";

const prefixName = "mikhail_";
const localStorageNameSearch = "userSearchLS";
const localStorageNameTheme = "themeIsDark";
const defaultThemeDark = true;

const getNameLS = (type: "search" | "theme") => {
  if (type === "search") {
    return `${prefixName}${localStorageNameSearch}`;
  } else if (type === "theme") {
    return `${prefixName}${localStorageNameTheme}`;
  }
  return "";
};

const getUserSearchLS = () => localStorage.getItem(getNameLS("search")) ?? "";
const saveUserSearchLS = (value: string) =>
  localStorage.setItem(getNameLS("search"), value);

const getThemeIsDark = () => {
  if (isServer()) {
    return defaultThemeDark;
  }

  const value = localStorage.getItem(getNameLS("theme"));
  if (value) {
    return value === "true";
  } else {
    return true;
  }
};

const saveThemeIsDark = (value: boolean) =>
  localStorage.setItem(getNameLS("theme"), String(value));

export {
  getUserSearchLS,
  saveUserSearchLS,
  getThemeIsDark,
  saveThemeIsDark,
  getNameLS,
};
