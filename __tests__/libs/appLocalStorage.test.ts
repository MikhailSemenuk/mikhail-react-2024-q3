import { getUserSearchLS, saveUserSearchLS, getThemeIsDark, saveThemeIsDark, getNameLS } from '@/libs/appLocalStorage';

describe('appLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getNameLS', () => {
    it('should return sting', () => {
      const result = getNameLS('search');
      expect(result).toBe('mikhail_userSearchLS');
    });
    it('should return sting', () => {
      const result = getNameLS('theme');
      expect(result).toBe('mikhail_themeIsDark');
    });
    it('should return an empty string for invalid type', () => {
      const result = getNameLS('invalid' as 'search' | 'theme');
      expect(result).toBe('');
    });
  });

  describe('getUserSearchLS', () => {
    it('should return an empty string if there is no user search in localStorage', () => {
      const result = getUserSearchLS();
      expect(result).toBe('');
    });

    it('should return the user search value from localStorage', () => {
      localStorage.setItem(getNameLS('search'), 'test search');
      const result = getUserSearchLS();
      expect(result).toBe('test search');
    });
  });

  describe('saveUserSearchLS', () => {
    it('should save the user search value to localStorage', () => {
      saveUserSearchLS('new search');
      const result = localStorage.getItem(getNameLS('search'));
      expect(result).toBe('new search');
    });
  });

  describe('getThemeIsDark', () => {
    it('should return true if there is no theme setting in localStorage', () => {
      const result = getThemeIsDark();
      expect(result).toBe(true);
    });

    it('should return true if the theme setting in localStorage is "true"', () => {
      localStorage.setItem(getNameLS('theme'), 'true');
      const result = getThemeIsDark();
      expect(result).toBe(true);
    });

    it('should return false if the theme setting in localStorage is "false"', () => {
      localStorage.setItem(getNameLS('theme'), 'false');
      const result = getThemeIsDark();
      expect(result).toBe(false);
    });
  });

  describe('saveThemeIsDark', () => {
    it('should save the theme setting as "true" in localStorage', () => {
      saveThemeIsDark(true);
      const result = localStorage.getItem(getNameLS('theme'));
      expect(result).toBe('true');
    });

    it('should save the theme setting as "false" in localStorage', () => {
      saveThemeIsDark(false);
      const result = localStorage.getItem(getNameLS('theme'));
      expect(result).toBe('false');
    });
  });
});
